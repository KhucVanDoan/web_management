import React, { useState, useEffect } from 'react'

import { Grid, Box } from '@mui/material'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useParams, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { useDefineMasterPlan } from '~/modules/mesx/redux/hooks/useDefineMasterPlan'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import { ROUTE } from '~/modules/mesx/routes/config'
import { redirectRouter } from '~/utils'

import ItemsSettingTable from './items-setting-table'
import { validationSchema } from './schema'

const MOForm = () => {
  const { t } = useTranslation(['mesx'])
  const { id } = useParams()
  const { path } = useRouteMatch()
  const [mode, setMode] = useState(MODAL_MODE.CREATE)
  const [saleOrders, setSaleOrders] = useState([])
  const [saleOrder, setSaleOrder] = useState({})
  const [isSubmitForm] = useState(false)
  const MODE_MAP = {
    [ROUTE.MO.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.MO.DETAIL.PATH]: MODAL_MODE.DETAIL,
    [ROUTE.MO.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const isUpdate = mode === MODAL_MODE.UPDATE
  const initialValues = {
    code: '',
    name: '',
    moPlan: null,
    description: '',
    itemIds: [],
    masterPlanId: '',
  }

  const {
    data: { masterPlanList },
    actions: masterPlanActions,
  } = useDefineMasterPlan()
  const {
    data: { isLoading },
    actions,
  } = useMo()

  useEffect(() => {
    setMode(MODE_MAP[path?.replace(id, ':id')])
    masterPlanActions.searchMasterPlans()
  }, [])

  const backToList = () => {
    redirectRouter(ROUTE.MO.LIST.PATH)
  }

  const renderActionButtons = ({ resetForm }) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={backToList} color="grayF4" sx={{ mr: 4 / 3 }}>
              {t('common.back')}
            </Button>
            <Button
              onClick={resetForm}
              variant="outlined"
              color="subText"
              sx={{ mr: 4 / 3 }}
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
              {t('common.back')}
            </Button>
            <Button
              onClick={resetForm}
              variant="outlined"
              color="subText"
              sx={{ mr: 4 / 3 }}
            >
              {t('common.cancel')}
            </Button>
            <Button type="submit">{t('common.save')}</Button>
          </Box>
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
        route: ROUTE.MO.LIST.PATH,
        title: ROUTE.MO.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.MO.CREATE.PATH,
          title: ROUTE.MO.CREATE.TITLE,
        })
        break
      case MODAL_MODE.DETAIL:
        breadcrumb.push({
          route: ROUTE.MO.DETAIL.PATH + `/${id}`,
          title: ROUTE.MO.DETAIL.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.MO.EDIT.PATH + `/${id}`,
          title: ROUTE.MO.EDIT.TITLE,
        })
        break
      default:
    }
    return breadcrumb
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.MO.CREATE.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.MO.DETAIL.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.MO.EDIT.TITLE
      default:
    }
  }

  const handleChangePlan = (value, setFieldValue) => {
    masterPlanActions.getMasterPlanDetailsById(value, (response) => {
      setSaleOrders(response.saleOrderSchedules)
      setFieldValue('moPlan', [response.dateFrom, response.dateTo])
      setFieldValue('moFactory', response.factory?.name)
    })
  }

  const handleChangeSaleOrder = (value) => {
    const saleOrder = saleOrders.find((so) => so.saleOrderId === value)
    setSaleOrder(saleOrder)
  }

  const handleSubmit = (values) => {
    const payload = {
      ...values,
      planFrom: values?.moPlan ? values?.moPlan[0] : '',
      planTo: values?.moPlan ? values?.moPlan[1] : '',
    }

    actions.createMO(payload, () => {
      backToList()
    })
  }

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t(`menu.${getTitle()}`)}
      isLoading={isLoading}
      onBack={backToList}
    >
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ resetForm, setFieldValue }) => (
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
                      label={t('Mo.moCode')}
                      placeholder={t('Mo.moCode')}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="masterPlanId"
                      label={t('Mo.planName')}
                      placeholder={t('Mo.planName')}
                      options={masterPlanList || []}
                      getOptionLabel={(option) => option?.name || ''}
                      getOptionValue={(option) => option?.id}
                      required
                      onChange={(value) => handleChangePlan(value, setFieldValue)}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('Mo.moName')}
                      placeholder={t('Mo.moName')}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="moFactory"
                      label={t('Mo.moFactory')}
                      placeholder={t('Mo.moFactory')}
                      disabled={true}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.DateRangePicker
                      name="moPlan"
                      label={t('Mo.moPlan')}
                      placeholder={t('definePlanBasis.moPlan')}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="saleOrderId"
                      label={t('saleOrder.name')}
                      placeholder={t('saleOrder.name')}
                      options={saleOrders || []}
                      getOptionLabel={(option) => option?.saleOrderName || ''}
                      getOptionValue={(option) => option?.saleOrderId}
                      required
                      onChange={handleChangeSaleOrder}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('Mo.descriptionInput')}
                      placeholder={t('Mo.descriptionInput')}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>

                {/* <Tabs
                  list={[
                    t('Mo.itemDetails'),
                    t('defineBOM.BOMStructure'),
                    t('defineBOM.BOMStructureOperation'),
                  ]}
                >
                  <ItemsSettingTable
                    saleOrder={saleOrder}
                    isSubmitForm={isSubmitForm}
                    updateSelectedItems={(itemIds) =>
                      setFieldValue('itemIds', itemIds)
                    }
                  />
                </Tabs> */}
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              <ItemsSettingTable
                saleOrder={saleOrder}
                isSubmitForm={isSubmitForm}
                updateSelectedItems={(itemIds) =>
                  setFieldValue('itemIds', itemIds)
                }
              />
            </Box>
            <Box>{renderActionButtons({ resetForm })}</Box>
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default MOForm
