import React, { useEffect } from 'react'

import { createFilterOptions, Grid } from '@mui/material'
import { Formik, Form } from 'formik'
import { isEmpty, orderBy } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useRouteMatch, useParams } from 'react-router-dom'

import {
  MODAL_MODE,
  DATE_FORMAT_3,
  TEXTFIELD_REQUIRED_LENGTH,
  TEXTFIELD_ALLOW,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import { useDefineMasterPlan } from '~/modules/mesx/redux/hooks/useDefineMasterPlan'
import useSaleOrder from '~/modules/mesx/redux/hooks/useSaleOrder'
import { ROUTE } from '~/modules/mesx/routes/config'
import { formatDateTimeUtc } from '~/utils'

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
  const {
    data: { saleOrderDetailList },
    actions: actionSaleOrder,
  } = useSaleOrder()

  const MODE_MAP = {
    [ROUTE.MASTER_PLAN.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.MASTER_PLAN.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

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

  useEffect(() => {
    return () => actionSaleOrder.resetSaleOrderState()
  }, [saleOrderDetailList])

  const getMasterPlanDetail = () => {
    if (isUpdate) {
      actions.getMasterPlanDetailsById(id)
    }
  }

  const handleSubmit = (values) => {
    const convertValues = {
      name: values.name,
      code: values.code,
      factoryId: values.factoryId,
      description: values.description,
      dateFrom: values?.planDate
        ? formatDateTimeUtc(values?.planDate[0], DATE_FORMAT_3)
        : '',
      dateTo: values?.planDate
        ? formatDateTimeUtc(values?.planDate[1], DATE_FORMAT_3)
        : '',
      saleOrders: values.soId.map((id) => ({ id })),
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createMasterPlan(convertValues, (id) => {
        history.push(
          ROUTE.MASTER_PLAN.AUTO_MODERATION.PATH.replace(':id', `${id}`),
        )
      })
    } else if (isUpdate) {
      actions.updateMasterPlan({ ...convertValues, id: Number(id) }, () => {
        history.push(
          ROUTE.MASTER_PLAN.AUTO_MODERATION.PATH.replace(':id', `${id}`),
        )
      })
    }

    return
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
      default:
    }
  }

  const initialValues =
    isUpdate && !isEmpty(masterPlanDetails)
      ? {
          ...masterPlanDetails,
          planDate: [masterPlanDetails.dateFrom, masterPlanDetails.dateTo],
          soId: masterPlanDetails.saleOrderSchedules?.map(
            (saleOrderSchedule) => saleOrderSchedule.saleOrderId,
          ),
          factoryId:
            masterPlanDetails?.factory?.id || masterPlanDetails?.factoryId,
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

  const handleChangeSoId = (id, setFieldValue) => {
    actionSaleOrder.getSaleOrderDetailsByIds({ ids: id.join(',') }, (data) => {
      const dateFrom = orderBy(data, ['orderedAt'], ['asc'])[0]?.orderedAt
      const dateTo = orderBy(data, ['deadline'], ['asc'])[0]?.deadline
      setFieldValue('planDate', [dateFrom, dateTo])
    })
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
        {({ resetForm, values, setFieldValue }) => (
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
                      label={t('defineMasterPlan.code')}
                      name="code"
                      placeholder={t('defineMasterPlan.code')}
                      disabled={isUpdate}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      label={t('defineMasterPlan.saleOrder')}
                      name="soId"
                      placeholder={t('defineMasterPlan.saleOrder')}
                      required
                      options={soList}
                      getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
                      filterOptions={createFilterOptions({
                        stringify: (opt) => `${opt?.code}|${opt?.name}`,
                      })}
                      getOptionValue={(option) => option?.id}
                      multiple
                      onChange={(id) => {
                        handleChangeSoId(id, setFieldValue)
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('defineMasterPlan.planName')}
                      placeholder={t('defineMasterPlan.planName')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="factoryId"
                      label={t('defineMasterPlan.moFactory')}
                      placeholder={t('defineMasterPlan.moFactory')}
                      required
                      options={factoryList?.items || []}
                      getOptionLabel={(option) => option?.name || ''}
                      filterOptions={createFilterOptions({
                        stringify: (opt) => `${opt?.code}|${opt?.name}`,
                      })}
                      getOptionValue={(option) => option?.id}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.DateRangePicker
                      name="planDate"
                      label={t('defineMasterPlan.planDate')}
                      placeholder={t('defineMasterPlan.planDate')}
                    />
                  </Grid>
                  <Grid item xs={12}>
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
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <DetailTab
              soId={values.soId}
              planDate={values.planDate}
              isDetail={true}
              isUpdate={isUpdate}
            />

            {renderActionBar(resetForm)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default DefineMasterPlanForm
