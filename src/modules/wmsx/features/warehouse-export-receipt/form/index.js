import React, { useEffect, useMemo } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { Formik, Form, FieldArray } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useWarehouseExportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseExportReceipt'
import { ROUTE } from '~/modules/wmsx/routes/config'

import ItemSettingTable from './item-setting-table'
import { defineSchema } from './schema'

const DEFAULT_ITEM = [
  {
    id: '',
    suppliesCode: '',
    suppliesName: '',
    unit: '',
    lotNumber: '',
    quantityRequest: '',
    quantityExport: '',
    planExportedQuantity: '',
    unitPriceRefer: '',
    totalMoney: '',
    debitAccount: '',
    creditAccount: '',
  },
]
function WarehouseExportReceiptForm() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()

  const {
    data: { isLoading, warehouseExportReceiptDetails },
    actions,
  } = useWarehouseExportReceipt()

  const MODE_MAP = {
    [ROUTE.WAREHOUSE_EXPORT_RECEIPT.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.WAREHOUSE_EXPORT_RECEIPT.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = useMemo(
    () => ({
      items: DEFAULT_ITEM,
    }),
    [warehouseExportReceiptDetails],
  )

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'receiptCommandManagement',
      },
      {
        route: ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.PATH,
        title: ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.WAREHOUSE_EXPORT_RECEIPT.CREATE.PATH,
          title: ROUTE.WAREHOUSE_EXPORT_RECEIPT.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.WAREHOUSE_EXPORT_RECEIPT.EDIT.PATH,
          title: ROUTE.WAREHOUSE_EXPORT_RECEIPT.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    if (isUpdate) {
      actions.getWarehouseExportReceiptDetailsById(id)
    }
    return () => {
      actions.resetWarehouseExportReceiptState()
    }
  }, [id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.WAREHOUSE_EXPORT_RECEIPT.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.WAREHOUSE_EXPORT_RECEIPT.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.PATH)
  }

  const onSubmit = (values) => {
    const parmas = {
      code: values?.code,
      name: values?.name,
      parentBussiness: Number(values?.parentBusiness),
      description: values?.description || null,
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createWarehouseExportReceipt(parmas, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      const paramUpdate = {
        ...parmas,
        id: +id,
      }
      actions.updateWarehouseExportReceipt(paramUpdate, backToList)
    }
  }

  const renderActionBar = (handleReset) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
            mode={MODAL_MODE.CREATE}
          />
        )
      case MODAL_MODE.UPDATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
            mode={MODAL_MODE.UPDATE}
          />
        )
      default:
        break
    }
  }
  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t('menu.' + getTitle())}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={defineSchema(t)}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ handleReset, values }) => (
              <Form>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  {isUpdate && (
                    <Grid item xs={12}>
                      <LV
                        label={
                          <Typography>
                            {t('warehouseExportReceipt.status')}
                          </Typography>
                        }
                        value={
                          <Status
                            options={ACTIVE_STATUS_OPTIONS}
                            value={warehouseExportReceiptDetails?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.DatePicker
                      name="createdAt"
                      label={t('warehouseExportReceipt.createdAt')}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="proposalPaperExportSupplies"
                      label={t(
                        'warehouseExportReceipt.proposalPaperExportSupplies',
                      )}
                      placeholder={t(
                        'warehouseExportReceipt.proposalPaperExportSupplies',
                      )}
                      options={[]}
                      getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
                      getOptionValue={(opt) => opt?.id?.toString()}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="nameOfReceiver"
                      label={t('warehouseExportReceipt.nameOfReceiver')}
                      placeholder={t('warehouseExportReceipt.nameOfReceiver')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="departmentReception"
                      label={t('warehouseExportReceipt.departmentReception')}
                      placeholder={t(
                        'warehouseExportReceipt.departmentReception',
                      )}
                      options={[]}
                      getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
                      getOptionValue={(opt) => opt?.id?.toString()}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="typeBusiness"
                      label={t('warehouseExportReceipt.typeBusiness')}
                      placeholder={t('warehouseExportReceipt.typeBusiness')}
                      options={[]}
                      getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
                      getOptionValue={(opt) => opt?.id?.toString()}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="suorceAccountant"
                      label={t('warehouseExportReceipt.suorceAccountant')}
                      placeholder={t('warehouseExportReceipt.suorceAccountant')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="exportInWarehouse"
                      label={t('warehouseExportReceipt.exportInWarehouse')}
                      placeholder={t(
                        'warehouseExportReceipt.exportInWarehouse',
                      )}
                      options={[]}
                      getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
                      getOptionValue={(opt) => opt?.id?.toString()}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="warehouseExportReason"
                      label={t('warehouseExportReceipt.warehouseExportReason')}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="warehouseExportReceipt"
                      label={t('warehouseExportReceipt.warehouseExportReceipt')}
                      disabled
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="number"
                      label={t('warehouseExportReceipt.number')}
                      disabled
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="category"
                      label={t('warehouseExportReceipt.category')}
                      placeholder={t('warehouseExportReceipt.category')}
                      options={[]}
                      getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
                      getOptionValue={(opt) => opt?.id?.toString()}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="construction"
                      label={t('warehouseExportReceipt.construction')}
                      placeholder={t('warehouseExportReceipt.construction')}
                      options={[]}
                      getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
                      getOptionValue={(opt) => opt?.id?.toString()}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="explain"
                      label={t('warehouseExportReceipt.explain')}
                      placeholder={t(
                        'warehouseExportReceipt.placeholderExplain',
                      )}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 3 }}>
                  <FieldArray
                    name="items"
                    render={(arrayHelpers) => (
                      <ItemSettingTable
                        items={values?.items || []}
                        arrayHelpers={arrayHelpers}
                        mode={mode}
                      />
                    )}
                  />
                </Box>
                {renderActionBar(handleReset)}
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default WarehouseExportReceiptForm
