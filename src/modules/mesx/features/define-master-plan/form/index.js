import React, { useEffect } from 'react'

import { Button, Grid, Box } from '@mui/material'
import { Formik, Form } from 'formik'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useRouteMatch, useParams } from 'react-router-dom'

import { MODAL_MODE, } from '~/common/constants'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import { useDefineMasterPlan } from '~/modules/mesx/redux/hooks/useDefineMasterPlan'
import { ROUTE } from '~/modules/mesx/routes/config'

import DetailTab from './detail-tab'
import { validationSchema } from './schema'

const DefineMasterPlanForm = () => {
  const { t } = useTranslation(['mesx'])
  const { id } = useParams()
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const {
    data: { isLoading, masterPlanDetails },
    actions
  } = useDefineMasterPlan()
  const {
    data: { soList, factoryList },
    actions: commonManagementActions,
  } = useCommonManagement()
  
  const MODE_MAP = {
    [ROUTE.MASTER_PLAN.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.MASTER_PLAN.DETAIL.PATH]: MODAL_MODE.DETAIL,
    [ROUTE.MASTER_PLAN.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const isDetail = mode === MODAL_MODE.DETAIL

  useEffect(() => {
    commonManagementActions.getSaleOrders()
    commonManagementActions.getFactories()
  }, [])

  useEffect(() => {
    getMasterPlanDetail()
  }, [mode])

  const getMasterPlanDetail = () => {
    if (isUpdate || isDetail) {
      actions.getMasterPlanDetailsById({ masterPlanId: id })
    }
  }

  const handleSubmit = (values) => {
    const convertValues = {
      ...values,
      dateFrom: values?.planDate ? values?.planDate[0] : '',
      dateTo: values?.planDate ? values?.planDate[1] : '',
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createMasterPlan(convertValues, backToList)
    }
  }

  const backToList = () => {
    history.push(ROUTE.MASTER_PLAN.LIST.PATH)
  }

  const renderActionButtons = (resetForm) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <>
            <Button color="grayF4" onClick={backToList}>
              {t('common.close')}
            </Button>
            <Button variant="outlined" color="subText" onClick={resetForm}>
              {t('common.cancel')}
            </Button>
            <Button type="submit">{t('common.create')}</Button>
          </>
        )
      case MODAL_MODE.UPDATE:
        return (
          <>
            <Button color="grayF4" onClick={backToList}>
              {t('common.close')}
            </Button>
            <Button variant="outlined" color="subText" onClick={resetForm}>
              {t('common.cancel')}
            </Button>
            <Button type="submit">{t('common.save')}</Button>
          </>
        )
      case MODAL_MODE.DETAIL:
        return (
          <Button color="grayF4" onClick={backToList}>
            {t('common.close')}
          </Button>
        )
      default:
        break
    }
  }

  const renderBreadcrumb = () => {
    const breadcrumb = [
      {
        title: 'plan',
      },
      {
        route: ROUTE.MASTER_PLAN.LIST.PATH,
        title: ROUTE.MASTER_PLAN.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.MASTER_PLAN.CREATE.PATH,
          title: ROUTE.MASTER_PLAN.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.MASTER_PLAN.EDIT.PATH,
          title: ROUTE.MASTER_PLAN.EDIT.TITLE,
        })
        break
      case MODAL_MODE.DETAIL:
        breadcrumb.push({
          route: ROUTE.MASTER_PLAN.DETAIL.PATH,
          title: ROUTE.MASTER_PLAN.DETAIL.TITLE,
        })
        break
      default:
    }
    return breadcrumb
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.MASTER_PLAN.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.MASTER_PLAN.EDIT.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.MASTER_PLAN.DETAIL.TITLE
      default:
    }
  }

  const handleChangeSaleOrder = (value, setFieldValue) => {
    const saleOderDeadline = soList.find(so => so.id === value)?.deadline;
    setFieldValue('planDate', [null, saleOderDeadline])
  }

  const initialValues = isEmpty(masterPlanDetails)
    ? {
        code: '',
        name: '',
        soId: null,
        factoryId: null,
        description: '',
        planDate: null,
        dateFromSo: new Date().toISOString(),
        dateCompletion: 0
      }
    : {
        ...masterPlanDetails,
        planDate: [masterPlanDetails.dateFrom, masterPlanDetails.planTo]
      }

  return (
    <Page
      breadcrumbs={renderBreadcrumb()}
      title={t(`menu.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema(t)}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ resetForm, values, setFieldValue }) => (
              <Form>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('defineMasterPlan.code')}
                      name="code"
                      placeholder={t('defineMasterPlan.code')}
                      disabled={isUpdate || isDetail}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      label={t('defineMasterPlan.saleOrder')}
                      name="soId"
                      placeholder={t('defineMasterPlan.saleOrder')}
                      disabled={isUpdate || isDetail}
                      required
                      options={soList}
                      getOptionLabel={(option) => option?.name || ''}
                      getOptionValue={(option) => option?.id}
                      onChange={(id) => handleChangeSaleOrder(id, setFieldValue)}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('defineMasterPlan.planName')}
                      placeholder={t('defineMasterPlan.planName')}
                      readonly={isDetail}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="factoryId"
                      label={t('defineMasterPlan.moFactory')}
                      placeholder={t('defineMasterPlan.moFactory')}
                      disabled={isUpdate || isDetail}
                      required
                      options={factoryList?.items || []}
                      getOptionLabel={(option) => option?.name || ''}
                      getOptionValue={(option) => option?.id}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.DateRangePicker
                      name="planDate"
                      label={t('defineMasterPlan.planDate')}
                      placeholder={t('defineMasterPlan.planDate')}
                      readonly={isDetail}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('defineMasterPlan.descriptionInput')}
                      placeholder={t('defineMasterPlan.descriptionInput')}
                      readonly={isDetail}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
                <Grid>
                  <DetailTab soId={values.soId} planDate={values.planDate} />
                </Grid>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mt: 2,
                    '& button + button': {
                      ml: 4 / 3,
                    },
                  }}
                >
                  {renderActionButtons(resetForm)}
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefineMasterPlanForm
