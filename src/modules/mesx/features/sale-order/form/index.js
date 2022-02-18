import React, { useState, useEffect } from 'react'

import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Formik, Form, FieldArray } from 'formik'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useRouteMatch, useParams } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { useAppStore } from '~/modules/auth/redux/hooks/useAppStore'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import { useDefineBOQ } from '~/modules/mesx/redux/hooks/useDefineBOQ'
import useSaleOrder from '~/modules/mesx/redux/hooks/useSaleOrder'
import { ROUTE } from '~/modules/mesx/routes/config'

import ItemsSettingTable from './items-setting-table'
import { saleOrderSchema } from './schema'

function SaleOrderForm() {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const {
    data: { customerList },
    actions: actionCommon,
  } = useCommonManagement()
  const {
    data: { boqList },
    actions: defineBoqAction,
  } = useDefineBOQ()
  const {
    data: { saleOrderDetails: saleOrder, isLoading },
    actions: saleOrderAction,
  } = useSaleOrder()
  const {
    appStore: { companies },
  } = useAppStore()

  const DEFAULT_ITEM = {
    id: new Date().getTime(),
    itemId: null,
    quantity: 1,
  }

  const [mode, setMode] = useState(MODAL_MODE.CREATE)

  const MODE_MAP = {
    [ROUTE.SALE_ORDER.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.SALE_ORDER.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  useEffect(() => {
    setMode(MODE_MAP[routeMatch.path])
    refreshData()
    return () => saleOrderAction.resetSaleOrderState()
  }, [mode])

  const refreshData = () => {
    const params = {
      isGetAll: 1,
    }
    defineBoqAction.searchBOQ(params)
    actionCommon.getCustomers()
    if (mode === MODAL_MODE.UPDATE) {
      saleOrderAction.getSaleOrderDetailsById(id)
    }
  }

  const backToList = () => {
    history.push(ROUTE.SALE_ORDER.LIST.PATH)
  }

  const handleSubmit = (values) => {
    const convertValues = {
      ...values,
      items: values?.items?.map((item) => ({
        id: item?.itemId,
        quantity: Number(item?.quantity),
      })),
    }
    if (mode === MODAL_MODE.CREATE) {
      saleOrderAction.createSaleOrder(convertValues, backToList)
    } else {
      saleOrderAction.updateSaleOrder({ ...convertValues, id: +id }, backToList)
    }
  }

  const renderActionButtons = (handleReset) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <>
            <Button color="grayEE" onClick={backToList}>
              {t('common.close')}
            </Button>
            <Button variant="outlined" color="subText" onClick={handleReset}>
              {t('common.cancel')}
            </Button>
            <Button type="submit">{t('common.create')}</Button>
          </>
        )
      case MODAL_MODE.UPDATE:
        return (
          <>
            <Button color="grayEE" onClick={backToList}>
              {t('common.close')}
            </Button>
            <Button variant="outlined" color="subText" onClick={handleReset}>
              {t('common.cancel')}
            </Button>
            <Button type="submit">{t('common.save')}</Button>
          </>
        )
      default:
        break
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: 'database',
      },
      {
        route: ROUTE.SALE_ORDER.LIST.PATH,
        title: ROUTE.SALE_ORDER.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.SALE_ORDER.CREATE.PATH,
          title: ROUTE.SALE_ORDER.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.SALE_ORDER.EDIT.PATH,
          title: ROUTE.SALE_ORDER.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumb
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.SALE_ORDER.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.SALE_ORDER.EDIT.TITLE
      default:
    }
  }

  const initialValues = isEmpty(saleOrder)
    ? {
        code: '',
        name: '',
        description: '',
        companyId: '',
        customerId: '',
        boqId: '',
        orderedAt: null,
        deadline: null,
        items: [{ ...DEFAULT_ITEM }],
      }
    : {
        ...saleOrder,
        items: saleOrder?.saleOrderDetails?.map((e, index) => ({
          id: e?.id,
          itemId: e?.itemId,
          quantity: e?.quantity,
        })),
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
        validationSchema={saleOrderSchema(t)}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleReset, values }) => (
          <Form>
            <Grid container justifyContent={'center'}>
              <Grid item xl={11} sx={12}>
                <Grid
                  container
                  columnSpacing={{ xl: 8, xs: 4 }}
                  rowSpacing={4 / 3}
                  sx={{ marginBottom: '24px' }}
                >
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('saleOrder.code')}
                      name="code"
                      placeholder={t('saleOrder.code')}
                      disabled={mode === MODAL_MODE.UPDATE}
                      labelWidth={180}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('saleOrder.name')}
                      name="name"
                      placeholder={t('saleOrder.name')}
                      labelWidth={180}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.DatePicker
                      name="orderedAt"
                      label={t('saleOrder.orderedAt')}
                      placeholder={t('saleOrder.orderedAt')}
                      labelWidth={180}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      options={boqList}
                      label={t('saleOrder.boqCode')}
                      name="boqId"
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => opt?.code || opt?.name}
                      labelWidth={180}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant="h4" mt={1}>
                      {t('saleOrder.vendor.title')}
                    </Typography>
                    <Box mt={4 / 3}>
                      <Field.Autocomplete
                        options={companies}
                        label={t('saleOrder.vendor.name')}
                        name="companyId"
                        getOptionValue={(opt) => opt?.id}
                        getOptionLabel={(opt) => opt?.name || opt?.code}
                        labelWidth={180}
                        required
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant="h4" mt={1}>
                      {t('saleOrder.customer.title')}
                    </Typography>
                    <Box mt={4 / 3}>
                      <Field.Autocomplete
                        name="customerId"
                        options={customerList}
                        label={t('saleOrder.customer.name')}
                        getOptionValue={(opt) => opt?.id}
                        getOptionLabel={(opt) => opt?.name || opt?.code}
                        labelWidth={180}
                        required
                      />
                    </Box>
                    <Box mt={4 / 3}>
                      <Field.DatePicker
                        name="deadline"
                        label={t('saleOrder.deadline')}
                        placeholder={t('saleOrder.deadline')}
                        labelWidth={180}
                        required
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('saleOrder.description')}
                      placeholder={t('saleOrder.description')}
                      multiline
                      rows={3}
                      labelWidth={180}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Box sx={{ mt: 2 }}>
              <FieldArray
                name="items"
                render={(arrayHelpers) => (
                  <ItemsSettingTable
                    items={values?.items || []}
                    mode={mode}
                    arrayHelpers={arrayHelpers}
                  />
                )}
              />
            </Box>
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
              {renderActionButtons(handleReset)}
            </Box>
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default SaleOrderForm
