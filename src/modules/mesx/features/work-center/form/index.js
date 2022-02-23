import React, { useEffect, useState } from 'react'

import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Button, Grid, Tab } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import useWorkCenter from '~/modules/mesx/redux/hooks/useWorkCenter'
import { ROUTE } from '~/modules/mesx/routes/config'

import { searchProducingSteps } from '../../../redux/actions/product-step'
import { useCommonManagement } from '../../../redux/hooks/useCommonManagement'
import BreakTimeTable from './break-time'
import { WorkCenterSchema } from './schema'
import ShiftTable from './work-center-shifts'

const WorkCenterForm = () => {
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const dispatch = useDispatch()
  const producingStep = useSelector((state) => state.producingStep)
  const { t } = useTranslation(['mesx'])
  const [tabValue, setTabValue] = useState('1')
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

  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      actions.getWorkCenterDetailsById(id)
    }
    commonManagementActions.getUsers()
    commonManagementActions.getFactories()
    dispatch(searchProducingSteps())

    return () => {
      actions.resetWorkCenterDetailState()
    }
  }, [mode])

  const initialValues = {
    code: wcDetails?.code || '',
    name: wcDetails?.name || '',
    decription: wcDetails?.decription || '',
    members: wcDetails?.members?.map((e, index) => e.id) || [],
    factoryId: wcDetails?.factoryId || '',
    leaderId: wcDetails?.leader?.id || '',
    oeeTarget: wcDetails?.oeeIndex || '',
    workCapacity: wcDetails?.productivityIndex || '',
    producingStepId: wcDetails?.producingStep?.id || '',
    shifts: wcDetails?.workCenterShifts?.map((e, index) => ({
      id: index,
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
        name: null,
        startAt: null,
        endAt: null,
        pricePerHour: '',
        priceUnit: '',
        breakTimes: [
          {
            id: 0,
            name: t('workCenter.shiftPreparationTime'),
            from: null,
            to: null,
          },
        ],
      },
    ],
    breakTimes: [{ id: new Date().getTime() }],
  }
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
          <Box mt={2} display="flex" justifyContent="flex-end">
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
          </Box>
        )
      case MODAL_MODE.UPDATE:
        return (
          <Box mt={2} display="flex" justifyContent="flex-end">
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
          </Box>
        )
      default:
    }
  }

  const backToList = () => {
    history.push(ROUTE.WORK_CENTER.LIST.PATH)
  }

  const onSubmit = (values) => {
    const param = {
      code: values.code,
      name: values.name,
      factoryId: values.factoryId,
      leaderId: values.leaderId,
      description: values.description,
      workingCapacity: Number(values.workCapacity),
      oeeTarget: Number(values.oeeTarget),
      producingStepId: values.producingStepId,
      workCenterShifts: values.shifts,
      members: values.members,
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createWorkCenter(param, () => backToList())
    } else if (mode === MODAL_MODE.UPDATE) {
      const {
        code,
        name,
        description,
        members,
        leaderId,
        factoryId,
        oeeTarget,
        workCapacity,
      } = values
      const paramUpdate = {
        code,
        name,
        description,
        members,
        factoryId,
        oeeTarget,
        leaderId,
        workCapacity,
        workCenterShifts: values?.shifts,
      }
      actions.updateWorkCenter(paramUpdate, () => backToList())
    }
  }

  const handleChangeTabValue = (event, value) => {
    setTabValue(value)
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
        {({ resetForm, values }) => (
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
                      label={t('workCenter.code')}
                      name="code"
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
                      options={userList}
                      label={t('workCenter.member')}
                      name="members"
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => opt?.fullName || opt?.username}
                      multiple
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      label={t('workCenter.factoryName')}
                      name="factoryId"
                      options={factoryList?.items}
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => opt?.name}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      options={userList}
                      label={t('workCenter.leader')}
                      name="leaderId"
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => opt?.fullName || opt?.username}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      options={producingStep?.list}
                      label={t('workCenter.producingStep')}
                      name="producingStepId"
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
                  <Grid item xs={12}>
                    <TabContext value={tabValue}>
                      <Box>
                        <TabList onChange={handleChangeTabValue}>
                          <Tab label={t('workCenter.detailInfo')} value="1" />
                          <Tab label={t('workCenter.timeSetup')} value="2" />
                        </TabList>
                      </Box>
                      <TabPanel value="1">
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
                      <TabPanel value="2">
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
                        <FieldArray
                          name="breakTimes"
                          render={(arrayHelpers) => (
                            <BreakTimeTable
                              shifts={values.shifts || []}
                              mode={mode}
                              breakTimes={values.breakTimes || []}
                              arrayHelpers={arrayHelpers}
                            />
                          )}
                        />
                      </TabPanel>
                    </TabContext>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box>{renderActionButtons(resetForm)}</Box>
          </Form>
        )}
      </Formik>
    </Page>
  )
}
export default WorkCenterForm
