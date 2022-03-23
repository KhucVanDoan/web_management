import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { Formik, Form } from 'formik'
import { isEmpty, isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useRouteMatch, useParams } from 'react-router-dom'

import {
  MODAL_MODE,
  DATE_FORMAT_3,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { MASTER_PLAN_STATUS_OPTIONS } from '~/modules/mesx/constants'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import { useDefineMasterPlan } from '~/modules/mesx/redux/hooks/useDefineMasterPlan'
import { ROUTE } from '~/modules/mesx/routes/config'
import { redirectRouter, formatDateTimeUtc } from '~/utils'

import DetailTab from './detail-tab'
import { validationSchema } from './schema'

const DefineMasterPlanForm = () => {
  const { t } = useTranslation(['mesx'])
  const { id } = useParams()
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const {
    data: { isLoading, masterPlanDetails },
    actions,
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
    commonManagementActions.getSaleOrders({ isGetAll: 1 })
    commonManagementActions.getFactories()

    return () => {
      actions.resetMasterPlanDetails()
    }
  }, [])

  useEffect(() => {
    getMasterPlanDetail()
  }, [mode])

  const getMasterPlanDetail = () => {
    if (isUpdate || isDetail) {
      actions.getMasterPlanDetailsById(id)
    }
  }

  const handleSubmit = (values) => {
    const convertValues = {
      ...values,
      dateCompletion: +values.dateCompletion,
      dateFrom: values?.planDate
        ? formatDateTimeUtc(values?.planDate[0], DATE_FORMAT_3)
        : '',
      dateTo: values?.planDate
        ? formatDateTimeUtc(values?.planDate[1], DATE_FORMAT_3)
        : '',
      dateFromSo: new Date().toISOString(),
      saleOrders: values.soId.map((id) => ({ id })),
    }
    delete convertValues.soId
    if (mode === MODAL_MODE.CREATE) {
      actions.createMasterPlan(convertValues, (id) => {
        redirectToModeration(id)
      })
    }
    if (mode === MODAL_MODE.UPDATE) {
      redirectToModeration(id)
    }
    return
  }

  const redirectToModeration = (id) => {
    redirectRouter(ROUTE.MASTER_PLAN.AUTO_MODERATION.PATH, { id })
  }

  const backToList = () => {
    history.push(ROUTE.MASTER_PLAN.LIST.PATH)
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
      case MODAL_MODE.DETAIL:
        return <ActionBar onBack={backToList} />
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

  const initialValues =
    (isUpdate || isDetail) && !isEmpty(masterPlanDetails)
      ? {
          ...masterPlanDetails,
          planDate: [masterPlanDetails.dateFrom, masterPlanDetails.dateTo],
          soId: masterPlanDetails.saleOrderSchedules?.map(
            (saleOrderSchedule) => saleOrderSchedule.id,
          ),
          factoryId: masterPlanDetails?.factory?.id,
        }
      : {
          code: '',
          name: '',
          soId: null,
          factoryId: null,
          description: '',
          planDate: null,
          dateFromSo: null,
          dateCompletion: 0,
        }

  return (
    <Page
      breadcrumbs={renderBreadcrumb()}
      title={t(`menu.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={isUpdate ? null : validationSchema(t)}
        onSubmit={handleSubmit}
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
                  {isDetail && !isNil(masterPlanDetails?.status) && (
                    <Grid item xs={12}>
                      <LabelValue
                        label={t('defineBOM.status')}
                        value={
                          <Status
                            options={MASTER_PLAN_STATUS_OPTIONS}
                            value={masterPlanDetails?.status}
                          />
                        }
                      />
                    </Grid>
                  )}

                  <Grid item lg={6} xs={12}>
                    {isDetail ? (
                      <LabelValue
                        label={t('defineMasterPlan.code')}
                        value={masterPlanDetails?.code}
                      />
                    ) : (
                      <Field.TextField
                        label={t('defineMasterPlan.code')}
                        name="code"
                        placeholder={t('defineMasterPlan.code')}
                        disabled={isUpdate}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_20.MAX,
                        }}
                        required
                      />
                    )}
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    {isDetail ? (
                      <LabelValue
                        label={t('defineMasterPlan.saleOrderName')}
                        value={masterPlanDetails.saleOrderSchedules
                          ?.map(
                            (saleOrderSchedule) =>
                              saleOrderSchedule.saleOrderName,
                          )
                          .join(', ')}
                      />
                    ) : (
                      <Field.Autocomplete
                        label={t('defineMasterPlan.saleOrder')}
                        name="soId"
                        placeholder={t('defineMasterPlan.saleOrder')}
                        disabled={isUpdate}
                        required
                        options={soList}
                        getOptionLabel={(option) => option?.name || ''}
                        getOptionValue={(option) => option?.id}
                        multiple
                      />
                    )}
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    {isDetail ? (
                      <LabelValue
                        label={t('defineMasterPlan.planName')}
                        value={masterPlanDetails?.name}
                      />
                    ) : (
                      <Field.TextField
                        name="name"
                        label={t('defineMasterPlan.planName')}
                        placeholder={t('defineMasterPlan.planName')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                        }}
                        required
                      />
                    )}
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    {isDetail ? (
                      <LabelValue
                        label={t('defineMasterPlan.moFactory')}
                        value={masterPlanDetails?.factory?.name}
                      />
                    ) : (
                      <Field.Autocomplete
                        name="factoryId"
                        label={t('defineMasterPlan.moFactory')}
                        placeholder={t('defineMasterPlan.moFactory')}
                        disabled={isUpdate}
                        required
                        options={factoryList?.items || []}
                        getOptionLabel={(option) => option?.name || ''}
                        getOptionValue={(option) => option?.id}
                      />
                    )}
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    {isDetail ? (
                      <LabelValue label={t('defineMasterPlan.planDate')}>
                        {formatDateTimeUtc(masterPlanDetails?.dateFrom)} -{' '}
                        {formatDateTimeUtc(masterPlanDetails?.dateTo)}
                      </LabelValue>
                    ) : (
                      <Field.DateRangePicker
                        name="planDate"
                        label={t('defineMasterPlan.planDate')}
                        placeholder={t('defineMasterPlan.planDate')}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    {isDetail ? (
                      <TextField
                        name="description"
                        label={t('defineMasterPlan.descriptionInput')}
                        multiline
                        value={masterPlanDetails?.description}
                        rows={3}
                        readOnly
                        sx={{
                          'label.MuiFormLabel-root': {
                            color: (theme) => theme.palette.subText.main,
                          },
                        }}
                      />
                    ) : (
                      <Field.TextField
                        name="description"
                        label={t('defineMasterPlan.descriptionInput')}
                        placeholder={t('defineMasterPlan.descriptionInput')}
                        multiline
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        rows={3}
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <DetailTab
              soId={values.soId}
              planDate={values.planDate}
              isDetail={true}
            />

            {renderActionBar(resetForm)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default DefineMasterPlanForm
