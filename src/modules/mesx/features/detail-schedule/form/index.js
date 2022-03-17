import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { useDetailSchedule } from '~/modules/mesx/redux/hooks/useDetailSchedule'
import { useWorkOrder } from '~/modules/mesx/redux/hooks/useWorkOrder'
import { ROUTE } from '~/modules/mesx/routes/config'

import ItemSettingTable from '../form/items-setting-table'

const DetailScheduleForm = () => {
  const { t } = useTranslation(['mesx'])
  const { id } = useParams()
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const {
    data: { isLoading, detailScheduleDetails },
    actions,
  } = useDetailSchedule()
  const {
    data: { workOrderDetails },
    actions: workOder,
  } = useWorkOrder()
  const MODE_MAP = {
    [ROUTE.DETAIL_SCHEDULE.DETAIL.PATH]: MODAL_MODE.DETAIL,
    [ROUTE.DETAIL_SCHEDULE.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  useEffect(() => {
    refreshData()
  }, [mode])

  const refreshData = () => {
    getDetailSchedule()
  }

  const getDetailSchedule = () => {
    if (isUpdate) {
      actions.getDetailScheduleDetailsById(id)
      workOder.getWorkOrderDetailsById(id)
    }
  }

  const backToList = () => {
    history.push(ROUTE.DETAIL_SCHEDULE.LIST.PATH)
  }

  const initialValues = {
    code: detailScheduleDetails?.id || '',
    woCode: workOrderDetails?.code || '',
    moCode: workOrderDetails?.mo?.code || '',
    itemName: workOrderDetails?.moDetail?.itemName || '',
    producingSteps: workOrderDetails?.producingStep?.name || '',
    subItemName: workOrderDetails?.bom?.itemName || '',
    workPlan: [workOrderDetails?.planFrom, workOrderDetails?.planTo] || [],
    description: detailScheduleDetails?.description || '',
    plan: detailScheduleDetails?.workOrderScheduleDetails || [],
    woQuantity: detailScheduleDetails?.quantity || '',
  }

  const renderActionBar = (resetForm) => {
    switch (mode) {
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

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: 'plan',
      },
      {
        route: ROUTE.DETAIL_SCHEDULE.LIST.PATH,
        title: ROUTE.DETAIL_SCHEDULE.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.DETAIL_SCHEDULE.EDIT.PATH + `/${id}`,
          title: ROUTE.DETAIL_SCHEDULE.EDIT.TITLE,
        })
        break
      default:
    }
    return breadcrumb
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.DETAIL_SCHEDULE.CREATE.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.DETAIL_SCHEDULE.DETAIL.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DETAIL_SCHEDULE.EDIT.TITLE
      default:
    }
  }

  const handleSubmit = (values) => {
    const params = {
      code: values?.code,
      planFrom: workOrderDetails?.planFrom,
      planTo: workOrderDetails?.planTo,
      workOrderId: detailScheduleDetails?.workOrder?.id,
      description: values.description,
      scheduleDetails: values?.plan?.map((i) => ({
        workCenterId: i.workCenter.id,
        quantity: i.quantity,
        moderationQuantity: i.moderationQuantity,
      })),
    }
    if (mode === MODAL_MODE.UPDATE) {
      params.id = id
      actions.updateDetailSchedule(params, backToList())
    }
  }

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t('menu.' + getTitle())}
      loading={isLoading}
      onBack={backToList}
    >
      <Formik
        initialValues={initialValues}
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
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="code"
                      label={t('detailSchedule.code')}
                      placeholder={t('detailSchedule.code')}
                      inputProps={{ maxLength: 4 }}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="woCode"
                      label={t('detailSchedule.woCode')}
                      placeholder={t('detailSchedule.woCode')}
                      inputProps={{ maxLength: 4 }}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="moCode"
                      label={t('detailSchedule.moCode')}
                      placeholder={t('detailSchedule.moCode')}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="itemName"
                      label={t('detailSchedule.itemName')}
                      placeholder={t('detailSchedule.itemName')}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="producingSteps"
                      label={t('detailSchedule.producingSteps')}
                      placeholder={t('detailSchedule.producingSteps')}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="subItemName"
                      label={t('detailSchedule.subItemName')}
                      placeholder={t('detailSchedule.subItemName')}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.DateRangePicker
                      name="workPlan"
                      label={t('detailSchedule.workPlan')}
                      placeholder={t('detailSchedule.workPlan')}
                      disabled
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('detailSchedule.descriptionInput')}
                      placeholder={t('detailSchedule.descriptionInput')}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <ItemSettingTable
                mode={mode}
                plans={values.plan}
                woQuantity={values.woQuantity}
              />
            </Box>

            {renderActionBar(resetForm)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}
export default DetailScheduleForm
