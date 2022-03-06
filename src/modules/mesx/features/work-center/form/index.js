import React, { useEffect, useMemo } from 'react'

import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Button, Grid, Tab } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { groupBy } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import useProducingStep from '~/modules/mesx/redux/hooks/useProducingStep'
import useWorkCenter from '~/modules/mesx/redux/hooks/useWorkCenter'
import { ROUTE } from '~/modules/mesx/routes/config'

import BreakTimeTable from './break-time'
import { WorkCenterSchema } from './schema'
import ShiftTable from './work-center-shifts'
const WorkCenterForm = () => {
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { t } = useTranslation(['mesx'])
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

  const {
    data: { factoryList, userList },
    actions: commonManagementActions,
  } = useCommonManagement()

  const {
    data: { list: producingStepList },
    actions: producingStepActions,
  } = useProducingStep()

  useEffect(() => {
    if (isUpdate) {
      actions.getWorkCenterDetailsById(id)
    }
    commonManagementActions.getUsers({ isGetAll: 1 })
    commonManagementActions.getFactories()
    producingStepActions.searchProducingSteps({ isGetAll: 1 })

    return () => actions.resetWorkCenterDetailState()
  }, [mode])

  const initialValues = useMemo(
    () => ({
      code: wcDetails?.code || '',
      name: wcDetails?.name || '',
      description: wcDetails?.description || '',
      members: wcDetails?.members?.map((e) => e.id) || [],
      factoryId: wcDetails?.factoryId || '',
      leaderId: wcDetails?.leader?.id || '',
      oeeTarget: wcDetails?.oeeIndex || '',
      workCapacity: wcDetails?.productivityIndex || '',
      producingStepId: wcDetails?.producingStep?.id || '',
      tabValue: '1',
      shifts: wcDetails?.workCenterShifts?.map((e) => ({
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
      })) || [
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
      ],
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
        : [
            {
              id: `breakTimes-${new Date().getTime()}`,
              breakTimeName: t('workCenter.shiftPreparationTime'),
              shifts: [
                {
                  from: '',
                  to: '',
                },
              ],
            },
          ],
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

  const renderActionButtons = (resetForm) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <>
            <Button onClick={backToList} color="grayF4" sx={{ mr: 4 / 3 }}>
              {t('common.close')}
            </Button>
            <Button
              variant="outlined"
              color="subText"
              sx={{ mr: 4 / 3 }}
              onClick={resetForm}
            >
              {t('common.cancel')}
            </Button>
            <Button type="submit">{t('common.create')}</Button>
          </>
        )
      case MODAL_MODE.UPDATE:
        return (
          <>
            <Button onClick={backToList} color="grayF4" sx={{ mr: 4 / 3 }}>
              {t('common.close')}
            </Button>
            <Button
              variant="outlined"
              color="subText"
              sx={{ mr: 4 / 3 }}
              onClick={resetForm}
            >
              {t('common.cancel')}
            </Button>
            <Button type="submit">{t('common.save')}</Button>
          </>
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

  const onSubmit = (values) => {
    const params = {
      code: values.code,
      name: values.name,
      factoryId: values.factoryId,
      leaderId: values.leaderId,
      description: values.description,
      performance: 0,
      workingCapacity: +values.workCapacity,
      oeeTarget: +values.oeeTarget,
      cost: 0,
      preProductionTime: '',
      postProductionTime: '',
      workingHours: '',
      members: values.members?.map((member) => ({ id: member })),
      producingStepId: values.producingStepId,
      workCenterShifts: values?.shifts?.map((shift) => ({
        startAt: formatTime(shift.startAt),
        endAt: formatTime(shift.endAt),
        name: shift.shiftName,
        pricePerHour: +shift.pricePerHour,
        priceUnit: shift.priceUnit,
        relaxTimes: values.breakTimes?.map((breakTime) => {
          const shiftRelax = breakTime?.shifts?.find(
            (itemShift) => itemShift.shiftId === shift.id,
          )

          if (shiftRelax) {
            return {
              name: breakTime.breakTimeName,
              endAt: formatTime(shiftRelax.to),
              startAt: formatTime(shiftRelax.from),
            }
          }
          return null
        }),
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
        {({ resetForm, values, setFieldValue }) => {
          const leaderOptions =
            userList?.filter((leader) =>
              values.members.some((member) => leader.id === member),
            ) || []
          return (
            <Form>
              <Grid container justifyContent="center">
                <Grid item xl={11} xs={12}>
                  <Grid
                    container
                    rowSpacing={4 / 3}
                    columnSpacing={{ xl: 8, xs: 4 }}
                  >
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="code"
                        label={t('workCenter.code')}
                        placeholder={t('workCenter.code')}
                        disabled={isUpdate}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="name"
                        label={t('workCenter.name')}
                        placeholder={t('workCenter.name')}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="members"
                        label={t('workCenter.member')}
                        options={userList}
                        getOptionValue={(opt) => opt?.id}
                        getOptionLabel={(opt) => opt?.fullName || opt?.username}
                        multiple
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="factoryId"
                        label={t('workCenter.factoryName')}
                        placeholder={t('workCenter.factoryName')}
                        options={factoryList?.items}
                        getOptionValue={(opt) => opt?.id}
                        getOptionLabel={(opt) => opt?.name}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="leaderId"
                        label={t('workCenter.leader')}
                        placeholder={t('workCenter.leader')}
                        options={leaderOptions}
                        getOptionValue={(opt) => opt?.id}
                        getOptionLabel={(opt) => opt?.fullName || opt?.username}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="producingStepId"
                        label={t('workCenter.producingStep')}
                        placeholder={t('workCenter.producingStep')}
                        options={producingStepList}
                        getOptionValue={(opt) => opt?.id}
                        getOptionLabel={(opt) => opt?.name}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field.TextField
                        name="description"
                        label={t('workCenter.description')}
                        placeholder={t('workCenter.description')}
                        multiline
                        rows={3}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Box sx={{ mt: 3 }}>
                <TabContext value={values.tabValue}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                      onChange={(_, val) => setFieldValue('tabValue', val)}
                    >
                      <Tab label={t('workCenter.detailInfo')} value="1" />
                      <Tab label={t('workCenter.timeSetup')} value="2" />
                    </TabList>
                  </Box>
                  <TabPanel value="1" sx={{ px: 0 }}>
                    <Grid
                      container
                      columnSpacing={{ xl: 8, xs: 4 }}
                      rowSpacing={4 / 3}
                    >
                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          label={t('workCenter.oeeGoal')}
                          placeholder={t('workCenter.oeeGoal')}
                          name="oeeTarget"
                        />
                      </Grid>

                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          label={t('workCenter.workCapacity')}
                          name="workCapacity"
                          placeholder={t('workCenter.workCapacity')}
                        />
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel value="2" sx={{ px: 0 }}>
                    <FieldArray
                      name="shifts"
                      render={(arrayHelpers) => (
                        <ShiftTable
                          shifts={values.shifts || []}
                          mode={mode}
                          arrayHelpers={arrayHelpers}
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
                          />
                        )}
                      />
                    </Box>
                  </TabPanel>
                </TabContext>
              </Box>
              <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
                {renderActionButtons(resetForm)}
              </Box>
            </Form>
          )
        }}
      </Formik>
    </Page>
  )
}
export default WorkCenterForm
