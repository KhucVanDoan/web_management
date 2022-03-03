import React, { useEffect } from 'react'

import { Button, Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { withStyles } from '@mui/styles'
import { Form, Formik } from 'formik'
import { useTranslation, withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { getItems, getUsers } from '~/modules/mesx/redux/actions/common'
import { getFactories } from '~/modules/mesx/redux/actions/factory'
import {
  confirmRequestBuyMaterialById,
  getRequestBuyMaterialDetailsById,
  rejectRequestBuyMaterialById,
  updateRequestBuyMaterial,
} from '~/modules/mesx/redux/actions/request-by-materials'
import { searchSaleOrders } from '~/modules/mesx/redux/actions/sale-order'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import useRequestBuyMaterial from '~/modules/mesx/redux/hooks/useRequestBuyMaterial'
import { ROUTE } from '~/modules/mesx/routes/config'

import validationSchema from './schema'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.REQUEST_BUY_MATERIAL.LIST.PATH,
    title: ROUTE.REQUEST_BUY_MATERIAL.LIST.TITLE,
  },
  {
    title: ROUTE.REQUEST_BUY_MATERIAL.EDIT.TITLE,
    route: ROUTE.REQUEST_BUY_MATERIAL.EDIT.PATH,
  },
]
function RequestBuyMaterialForm() {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, requestBuyMaterialDetails },
    actions,
  } = useRequestBuyMaterial()

  const {
    data: { itemList },
    actions: commonActions,
  } = useCommonManagement()

  const getItemObject = (id) => {
    return itemList?.find((item) => item?.id === id)
  }

  useEffect(() => {
    actions.getRequestBuyMaterialDetailsById(id)
    commonActions.getItems({})
    return () => {
      actions.resetRequestBuyMaterialState()
      commonActions.resetItems()
    }
  }, [])

  const getColumns = () => [
    {
      field: 'id',
      headerName: '#',
      width: 80,
      align: 'center',
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'code',
      headerName: t('requestBuyMaterial.item.code'),
      width: 180,
      align: 'center',
    },
    {
      field: 'name',
      headerName: t('requestBuyMaterial.item.name'),
      width: 180,
      align: 'center',
    },
    {
      field: 'unitType',
      headerName: t('requestBuyMaterial.item.type'),
      width: 180,
      align: 'center',
      renderCell: (params, index) => {
        const { id } = params.row
        return <>{getItemObject(id)?.itemType?.name || ''}</>
      },
    },
    {
      field: 'quantity',
      headerName: t('requestBuyMaterial.item.quantity'),
      width: 180,
      align: 'center',
    },
    {
      field: 'itemUnit',
      headerName: t('requestBuyMaterial.item.unitType'),
      width: 180,
      align: 'center',
      renderCell: (params, index) => {
        const { id } = params.row
        return <>{getItemObject(id)?.itemUnit?.name || ''}</>
      },
    },
  ]

  const backToList = () => {
    history.push(ROUTE.REQUEST_BUY_MATERIAL.LIST.PATH)
  }

  const initialValues = {
    code: requestBuyMaterialDetails?.code || '',
    name: requestBuyMaterialDetails?.name || '',
    description: requestBuyMaterialDetails?.description || '',
    planCode: requestBuyMaterialDetails?.manufacturingOrder?.code || '',
    planName: requestBuyMaterialDetails?.manufacturingOrder?.name || '',
    plan:
      [
        requestBuyMaterialDetails?.manufacturingOrder?.planFrom,
        requestBuyMaterialDetails?.manufacturingOrder?.planTo,
      ] || null,
    factory: requestBuyMaterialDetails?.factory?.name || '',
    soName: requestBuyMaterialDetails?.saleOrder?.name || '',
    deadline:
      [
        requestBuyMaterialDetails?.planFrom,
        requestBuyMaterialDetails?.planTo,
      ] || null,
  }

  const handleSubmit = (values) => {
    const params = {
      id: Number(id),
      name: values?.name,
      code: values?.code,
      manufacturingOrderId: Number(
        requestBuyMaterialDetails?.manufacturingOrder?.id,
      ),
      planFrom: values?.plan ? values?.deadline[0] : '',
      planTo: values?.plan ? values?.deadline[1] : '',
      description: values?.description,
    }
    actions.updateRequestBuyMaterial(params, backToList)
  }

  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('menu.requestBuyMaterialEdit')}
        loading={isLoading}
        onBack={backToList}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema(t)}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ handleReset }) => (
            <Form>
              <Grid container justifyContent="center">
                <Grid item xl={11} xs={12}>
                  <Grid
                    container
                    columnSpacing={{ xl: 8, xs: 4 }}
                    rowSpacing={4 / 3}
                  >
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('requestBuyMaterial.requestCode')}
                        name="code"
                        placeholder={t('requestBuyMaterial.requestCode')}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('requestBuyMaterial.requestName')}
                        name="name"
                        placeholder={t('requestBuyMaterial.requestName')}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('requestBuyMaterial.planCode')}
                        name="planCode"
                        placeholder={t('requestBuyMaterial.planCode')}
                        required
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('requestBuyMaterial.planName')}
                        name="planName"
                        placeholder={t('requestBuyMaterial.planName')}
                        required
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.DateRangePicker
                        label={t('requestBuyMaterial.plan')}
                        name="plan"
                        placeholder={t('requestBuyMaterial.plan')}
                        required
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('requestBuyMaterial.factory')}
                        name="factory"
                        placeholder={t('requestBuyMaterial.factory')}
                        required
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.DateRangePicker
                        label={t('requestBuyMaterial.deadline')}
                        name="deadline"
                        placeholder={t('requestBuyMaterial.deadline')}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('requestBuyMaterial.soName')}
                        name="soName"
                        placeholder={t('requestBuyMaterial.soName')}
                        required
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field.TextField
                        label={t('requestBuyMaterial.descriptionInput')}
                        name="description"
                        placeholder={t('requestBuyMaterial.descriptionInput')}
                        multiline
                        rows={3}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Typography variant="h4">
                    {t('requestBuyMaterial.itemsDetails')}
                  </Typography>
                </Box>
                <DataTable
                  rows={requestBuyMaterialDetails?.itemDetails}
                  columns={getColumns()}
                  total={requestBuyMaterialDetails?.itemDetails?.length}
                  hideSetting
                  hideFooter
                  striped={false}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  mt: 3,
                  '& button + button': {
                    ml: 4 / 3,
                  },
                }}
              >
                <Button color="grayEE" onClick={backToList}>
                  {t('common.close')}
                </Button>
                <Button
                  variant="outlined"
                  color="subText"
                  onClick={handleReset}
                >
                  {t('common.cancel')}
                </Button>
                <Button type="submit">{t('common.save')}</Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Page>
    </>
  )
}

const mapStateToProps = (state) => ({
  requestBuyMaterial: state.requestBuyMaterial,
  userList: state.commonManagement.userList,
  saleOrderList: state.saleOrder.saleOrderList,
  factoriesList: state.defineFactory.factoriesList,
})

const mapDispatchToProps = {
  confirmRequestBuyMaterialById,
  getRequestBuyMaterialDetailsById,
  rejectRequestBuyMaterialById,
  updateRequestBuyMaterial,
  getItems,
  getUsers,
  getFactories,
  searchSaleOrders,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles()(RequestBuyMaterialForm)),
)
