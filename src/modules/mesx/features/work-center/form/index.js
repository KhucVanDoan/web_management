import React, { useEffect, useMemo } from 'react'

import { Box, Grid, InputAdornment, Typography } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { groupBy } from 'lodash'
import { useTranslation } from 'react-i18next'
import {
  useHistory,
  useParams,
  useRouteMatch,
  useLocation,
} from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_REQUIRED_LENGTH,
  TEXTFIELD_ALLOW,
  ASYNC_SEARCH_LIMIT,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import Tabs from '~/components/Tabs'
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'
import {
  PRODUCING_STEP_STATUS,
  WORK_CENTER_STATUS,
  WORK_CENTER_STATUS_OPTIONS,
} from '~/modules/mesx/constants'
import useWorkCenter from '~/modules/mesx/redux/hooks/useWorkCenter'
import { getDetailFactoryCalendarApi } from '~/modules/mesx/redux/sagas/calendar'
import { searchProducingStepsApi } from '~/modules/mesx/redux/sagas/producing-steps/search'
import { searchUsersApi } from '~/modules/mesx/redux/sagas/user-management/search-users'
import { ROUTE } from '~/modules/mesx/routes/config'
import { convertFilterParams } from '~/utils'
import qs from '~/utils/qs'

import BreakTimeTable from './break-time'
import { WorkCenterSchema } from './schema'
import ShiftTable from './work-center-shifts'

const WorkCenterForm = () => {
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { t } = useTranslation(['mesx'])
  const location = useLocation()
  const { cloneId } = qs.parse(location.search)
  const MODE_MAP = {
    [ROUTE.WORK_CENTER.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.WORK_CENTER.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const {
    data: { isLoading, wcDetails },
    actions,
  } = useWorkCenter()

  useEffect(() => {
    if (isUpdate) {
      actions.getWorkCenterDetailsById(id)
    }
    if (cloneId) {
      actions.getWorkCenterDetailsById(cloneId)
    }

    return () => actions.resetWorkCenterDetailState()
  }, [mode])
  const defaultShifts = [
    {
      id: new Date().getTime(),
      shiftName: '',
      startAt: '06:00',
      endAt: '23:59',
      pricePerHour: '',
      priceUnit: '',
      breakTimes: [
        {
          id: 0,
          name: t('workCenter.shiftPreparationTime'),
          from: '',
          to: '',
        },
      ],
    },
  ]
  const defaultBreakTime = [
    {
      id: new Date().getTime(),
      breakTimeName: t('workCenter.shiftPreparationTime'),
      shifts: [
        {
          from: '',
          to: '',
        },
      ],
    },
  ]

  const initialValues = useMemo(
    () => ({
      code: isUpdate ? wcDetails?.code : '',
      name: wcDetails?.name || '',
      description: wcDetails?.description || '',
      members: wcDetails?.members || [],
      factoryId: wcDetails?.factory || {},
      leaderId: wcDetails?.leaderId || '',
      oeeTarget: wcDetails?.oeeIndex || '',
      workCapacity: wcDetails?.productivityIndex || '',
      producingStepId: wcDetails?.producingStep || '',
      shifts:
        wcDetails?.workCenterShifts?.map((e) => ({
          id: e.id,
          shiftName: e.name,
          pricePerHour: e.pricePerHour,
          priceUnit: e.priceUnit,
          startAt: e.startAt,
          endAt: e.endAt,
          breakTimes: wcDetails?.workCenterShiftRelaxTimes
            .filter((b) => b.workCenterShiftId === e.id)
            .map((a, ind) => ({
              id: ind,
              name: a.name,
              from: a.startAt,
              to: a.endAt,
            })),
        })) || defaultShifts,
      breakTimes: wcDetails?.workCenterShiftRelaxTimes
        ? Object.values(
            groupBy(wcDetails?.workCenterShiftRelaxTimes, 'name'),
          )?.map((item) => {
            if (item && item.length) {
              return {
                id: item.id,
                breakTimeName: item[0]?.name,
                shifts: item.map((shift) => ({
                  shiftName: wcDetails?.workCenterShifts.find(
                    (wcShift) => wcShift.id === shift.workCenterShiftId,
                  )?.name,
                  shiftId: shift.workCenterShiftId,
                  from: shift.startAt,
                  to: shift.endAt,
                })),
              }
            }
            return null
          })
        : defaultBreakTime,
    }),
    [wcDetails],
  )

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: 'database',
      },
      {
        route: ROUTE.WORK_CENTER.LIST.PATH,
        title: ROUTE.WORK_CENTER.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.WORK_CENTER.CREATE.PATH,
          title: ROUTE.WORK_CENTER.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.WORK_CENTER.EDIT.PATH,
          title: ROUTE.WORK_CENTER.EDIT.TITLE,
        })
        break
      default:
    }
    return breadcrumb
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.WORK_CENTER.CREATE.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.WORK_CENTER.DETAIL.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.WORK_CENTER.EDIT.TITLE
      default:
    }
  }

  const renderActionBar = (resetForm) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={resetForm}
            mode={MODAL_MODE.CREATE}
          />
        )
      case MODAL_MODE.UPDATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={resetForm}
            mode={MODAL_MODE.UPDATE}
          />
        )
      default:
    }
  }

  const backToList = () => {
    history.push(ROUTE.WORK_CENTER.LIST.PATH)
  }

  const formatTime = (data = '') => {
    if (data) {
      const times = data.split(':')
      return `${times[0]}:${times[1]}`
    }
  }

  const handleChange = async (id, setFieldValue) => {
    if (!id) {
      setFieldValue('shifts', defaultShifts)
      setFieldValue('breakTimes', defaultBreakTime)
      return
    }
    const params = {
      from: new Date(),
      to: new Date(),
      factoryId: id,
    }
    const response = await getDetailFactoryCalendarApi(params)
    if (response?.statusCode === 200 && response?.data !== []) {
      setField(setFieldValue, response?.data?.[0])
    }
    if (response?.data?.length === 0) {
      setFieldValue('shifts', defaultShifts)
      setFieldValue('breakTimes', defaultBreakTime)
    }
  }
  const setField = (setFieldValue, detail) => {
    const valueShifts = detail?.shifts?.map((i) => ({
      id: i?.id,
      shiftName: i?.title,
      pricePerHour: '',
      startAt: i?.from,
      endAt: i?.to,
      breakTimes: i?.relaxes?.map((t, ind) => ({
        id: ind,
        name: t?.title,
        from: t?.from,
        to: t?.to,
      })),
    }))
    const valueBreakTime = detail?.shifts?.map((s) => {
      return {
        breakTimeName: s?.title,
        shifts: (s?.relaxes || []).map((r) => ({
          shiftName: r?.title,
          shiftId: r?.id,
          from: r?.from,
          to: r?.to,
        })),
      }
    })

    setFieldValue('shifts', valueShifts)
    setFieldValue('breakTimes', valueBreakTime)
  }

  const onSubmit = (values) => {
    const params = {
      code: values.code,
      name: values.name,
      factoryId: values.factoryId?.id,
      leaderId: values.leaderId,
      description: values.description,
      performance: 0,
      workingCapacity: +values.workCapacity,
      oeeTarget: +values.oeeTarget,
      cost: 0,
      preProductionTime: '',
      postProductionTime: '',
      workingHours: '',
      members: values.members?.map((member) => ({ id: member?.id })),
      producingStepId: values.producingStepId?.id,
      workCenterShifts: values?.shifts?.map((shift) => ({
        startAt: formatTime(shift.startAt),
        endAt: formatTime(shift.endAt),
        name: shift.shiftName,
        pricePerHour: +shift.pricePerHour,
        priceUnit: shift.priceUnit,
        relaxTimes: values.breakTimes
          ?.map((breakTime) => {
            const shiftRelax = breakTime?.shifts?.find(
              (itemShift) => itemShift.shiftId === shift.id,
            )
            if (shiftRelax && shiftRelax.to !== shiftRelax.from) {
              return {
                name: breakTime.breakTimeName,
                endAt: formatTime(shiftRelax.to),
                startAt: formatTime(shiftRelax.from),
              }
            }
            return null
          })
          .filter((e) => e !== null),
      })),
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createWorkCenter(params, () => backToList())
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updateWorkCenter({ ...params, id: +id }, () => backToList())
    }
  }

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t(`menu.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={WorkCenterSchema(t)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue, resetForm }) => {
          return (
            <Form>
              <Grid container justifyContent="center">
                <Grid item xl={11} xs={12}>
                  <Grid
                    container
                    rowSpacing={4 / 3}
                    columnSpacing={{ xl: 8, xs: 4 }}
                  >
                    {isUpdate && (
                      <Grid item xs={12}>
                        <LV
                          label={
                            <Typography>{t('producingStep.status')}</Typography>
                          }
                          value={
                            <Status
                              options={WORK_CENTER_STATUS_OPTIONS}
                              value={wcDetails?.status}
                            />
                          }
                        />
                      </Grid>
                    )}
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="code"
                        label={t('workCenter.code')}
                        ss
                        placeholder={t('workCenter.code')}
                        disabled={
                          !cloneId &&
                          (isUpdate ||
                            wcDetails?.status ===
                              WORK_CENTER_STATUS.IN_PROGRESS)
                        }
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                        }}
                        allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                        required
                        {...(cloneId ? { autoFocus: true } : {})}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="name"
                        label={t('workCenter.name')}
                        placeholder={t('workCenter.name')}
                        disabled={
                          !cloneId &&
                          wcDetails?.status === WORK_CENTER_STATUS.IN_PROGRESS
                        }
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="members"
                        label={t('workCenter.member')}
                        asyncRequest={(s) =>
                          searchUsersApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => opt?.fullName || opt?.username}
                        getOptionSubLabel={(opt) => opt?.code}
                        onChange={(val) => {
                          if (
                            val.filter((v) => v?.id === values?.leaderId)
                              .length === 0
                          ) {
                            setFieldValue('leaderId', '')
                          }
                        }}
                        multiple
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="factoryId"
                        label={t('workCenter.factoryName')}
                        placeholder={t('workCenter.factoryName')}
                        disabled={
                          !cloneId &&
                          wcDetails?.status === WORK_CENTER_STATUS.IN_PROGRESS
                        }
                        asyncRequest={(s) =>
                          searchFactoriesApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        required
                        onChange={(val) => handleChange(val?.id, setFieldValue)}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="leaderId"
                        label={t('workCenter.leader')}
                        placeholder={t('workCenter.leader')}
                        options={values?.members || []}
                        getOptionValue={(opt) => opt?.id}
                        getOptionLabel={(opt) => opt?.fullName || opt?.username}
                        getOptionSubLabel={(opt) => opt?.code}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="producingStepId"
                        label={t('workCenter.producingStep')}
                        placeholder={t('workCenter.producingStep')}
                        disabled={
                          !cloneId &&
                          wcDetails?.status === WORK_CENTER_STATUS.IN_PROGRESS
                        }
                        asyncRequest={(s) =>
                          searchProducingStepsApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: convertFilterParams({
                              status: PRODUCING_STEP_STATUS.CONFIRMED,
                            }),
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => opt?.name}
                        getOptionSubLabel={(opt) => opt?.code}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field.TextField
                        name="description"
                        label={t('workCenter.description')}
                        placeholder={t('workCenter.description')}
                        multiline
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        rows={3}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Tabs
                list={[
                  {
                    label: t('workCenter.detailInfo'),
                    required: true,
                  },
                  {
                    label: t('workCenter.timeSetup'),
                    required: true,
                  },
                ]}
                sx={{ mt: 3 }}
              >
                {/* Tab 1 */}
                <Box>
                  <Grid
                    container
                    columnSpacing={{ xl: 8, xs: 4 }}
                    rowSpacing={4 / 3}
                  >
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        label={t('workCenter.oeeGoal')}
                        placeholder={t('workCenter.oeeGoal')}
                        disabled={
                          !cloneId &&
                          wcDetails?.status === WORK_CENTER_STATUS.IN_PROGRESS
                        }
                        name="oeeTarget"
                        numberProps={{
                          decimalScale: 3,
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              sx={{ ml: 0, pr: 1 }}
                            >
                              {t('workCenter.percent')}
                            </InputAdornment>
                          ),
                        }}
                        required
                      />
                    </Grid>

                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        label={t('workCenter.workCapacity')}
                        name="workCapacity"
                        placeholder={t('workCenter.workCapacity')}
                        disabled={
                          !cloneId &&
                          wcDetails?.status === WORK_CENTER_STATUS.IN_PROGRESS
                        }
                        type="number"
                        numberProps={{
                          decimalScale: 3,
                        }}
                        required
                      />
                    </Grid>
                  </Grid>
                </Box>

                {/* Tab 2 */}
                <Box>
                  <FieldArray
                    name="shifts"
                    render={(arrayHelpers) => (
                      <ShiftTable
                        shifts={values.shifts || []}
                        mode={mode}
                        arrayHelpers={arrayHelpers}
                        status={wcDetails?.status}
                      />
                    )}
                  />
                  <Box sx={{ mt: 3 }}>
                    <FieldArray
                      name="breakTimes"
                      render={(arrayHelpers) => (
                        <BreakTimeTable
                          shifts={values.shifts || []}
                          mode={mode}
                          breakTimes={values.breakTimes || []}
                          arrayHelpers={arrayHelpers}
                          setFieldValue={setFieldValue}
                          status={wcDetails?.status}
                        />
                      )}
                    />
                  </Box>
                </Box>
              </Tabs>

              {renderActionBar(resetForm)}
            </Form>
          )
        }}
      </Formik>
    </Page>
  )
}
export default WorkCenterForm
