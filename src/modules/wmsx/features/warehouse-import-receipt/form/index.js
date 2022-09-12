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
import useConstructionManagement from '~/modules/wmsx/redux/hooks/useConstructionManagement'
import { ROUTE } from '~/modules/wmsx/routes/config'

import ItemsSettingTable from './items-setting-table'
import { formSchema } from './schema'

const DEFAULT_ITEMS = {
  id: 1,
  itemId: '',
  unit: '',
}
function WarehouseImportReceiptForm() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const params = useParams()
  const routeMatch = useRouteMatch()

  const {
    data: { isLoading, constructionDetails },
    actions,
  } = useConstructionManagement()

  const MODE_MAP = {
    [ROUTE.WAREHOUSE_IMPORT_RECEIPT.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.WAREHOUSE_IMPORT_RECEIPT.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = useMemo(
    () => ({
      code: constructionDetails?.code || '',
      name: constructionDetails?.name || '',
      description: constructionDetails?.description || '',
      items: [{ ...DEFAULT_ITEMS }],
    }),
    [constructionDetails],
  )

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'receiptCommandManagement',
      },
      {
        route: ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.PATH,
        title: ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.WAREHOUSE_IMPORT_RECEIPT.CREATE.PATH,
          title: ROUTE.WAREHOUSE_IMPORT_RECEIPT.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.WAREHOUSE_IMPORT_RECEIPT.EDIT.PATH,
          title: ROUTE.WAREHOUSE_IMPORT_RECEIPT.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    if (isUpdate) {
      const id = params?.id
      actions.getConstructionDetailsById(id)
    }
    return () => {
      actions.resetConstructionDetailsState()
    }
  }, [params?.id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.WAREHOUSE_IMPORT_RECEIPT.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.WAREHOUSE_IMPORT_RECEIPT.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.PATH)
  }

  const onSubmit = (values) => {
    if (mode === MODAL_MODE.CREATE) {
      actions.createConstruction(values, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      const id = Number(params?.id)
      const paramUpdate = {
        ...values,
        id,
      }
      actions.updateConstruction(paramUpdate, backToList)
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
            validationSchema={formSchema(t)}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ handleReset, values, setFieldValue }) => (
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
                            {t('constructionManagement.status')}
                          </Typography>
                        }
                        value={
                          <Status
                            options={ACTIVE_STATUS_OPTIONS}
                            value={constructionDetails?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.DatePicker
                      name="createdAt"
                      label={t('warehouseImportReceipt.createdAt')}
                      placeholder={t('warehouseImportReceipt.createdAt')}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}></Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="shipper"
                      label={t('warehouseImportReceipt.shipper')}
                      placeholder={t('warehouseImportReceipt.shipper')}
                      asyncRequest={() => {}}
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="unit"
                      label={t('warehouseImportReceipt.unit')}
                      placeholder={t('warehouseImportReceipt.unit')}
                      asyncRequest={() => {}}
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="expenditureType"
                      label={t('warehouseImportReceipt.expenditureType')}
                      placeholder={t('warehouseImportReceipt.expenditureType')}
                      asyncRequest={() => {}}
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="warehouse"
                      label={t('warehouseImportReceipt.warehouse')}
                      placeholder={t('warehouseImportReceipt.warehouse')}
                      asyncRequest={() => {}}
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="reason"
                      label={t('warehouseImportReceipt.reason')}
                      placeholder={t('warehouseImportReceipt.reason')}
                      asyncRequest={() => {}}
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="source"
                      label={t('warehouseImportReceipt.source')}
                      placeholder={t('warehouseImportReceipt.source')}
                      asyncRequest={() => {}}
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="project"
                      label={t('warehouseImportReceipt.project')}
                      placeholder={t('warehouseImportReceipt.project')}
                      asyncRequest={() => {}}
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="task"
                      label={t('warehouseImportReceipt.task')}
                      placeholder={t('warehouseImportReceipt.task')}
                      asyncRequest={() => {}}
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="receiptNo"
                      label={t('warehouseImportReceipt.receiptNo')}
                      placeholder={t('warehouseImportReceipt.receiptNo')}
                      asyncRequest={() => {}}
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="suggestExport"
                      label={t('warehouseImportReceipt.suggestExport')}
                      placeholder={t('warehouseImportReceipt.suggestExport')}
                      asyncRequest={() => {}}
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="explain"
                      label={t('warehouseImportReceipt.explain')}
                      placeholder={t('warehouseImportReceipt.explain')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      multiline
                      rows={3}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="contractNo"
                      label={t('warehouseImportReceipt.contractNo')}
                      placeholder={t('warehouseImportReceipt.contractNo')}
                      disabled
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 3 }}>
                  <FieldArray
                    name="items"
                    render={(arrayHelpers) => (
                      <ItemsSettingTable
                        items={values?.items || []}
                        mode={mode}
                        arrayHelpers={arrayHelpers}
                        setFieldValue={setFieldValue}
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

export default WarehouseImportReceiptForm
