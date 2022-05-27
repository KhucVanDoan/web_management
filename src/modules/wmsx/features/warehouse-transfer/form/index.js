import React, { useEffect } from 'react'

import { Box, createFilterOptions, FormControlLabel, Grid } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useRouteMatch, useParams } from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import useDefineFactory from '~/modules/database/redux/hooks/useDefineFactory'
import useDefineWarehouse from '~/modules/wmsx/redux/hooks/useDefineWarehouse'
import useWarehouseTransfer from '~/modules/wmsx/redux/hooks/useWarehouseTransfer'
import { ROUTE } from '~/modules/wmsx/routes/config'

import ItemSettingTable from './items-setting-table'
import warehouseTranferSchema from './schema'
const DEFAULT_ITEM = {
  id: new Date().getTime(),
  itemId: null,
  itemName: '',
  itemType: '',
  lotNumber: '',
  mfg: '',
  packageId: '',
  planQuantity: 1,
  unitType: '',
}
const WarehouseTransferForm = () => {
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { t } = useTranslation(['wmsx'])
  const MODE_MAP = {
    [ROUTE.WAREHOUSE_TRANSFERS.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.WAREHOUSE_TRANSFERS.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const {
    data: { warehouseTransferDetails, isLoading },
    actions,
  } = useWarehouseTransfer()

  const {
    data: { factoryList },
    actions: definedFactoryActions,
  } = useDefineFactory()

  const {
    data: { warehouseList },
    actions: defineWarehouseActions,
  } = useDefineWarehouse()

  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      actions.getWarehouseTransferDetailsById(id)
    }
    return () => actions.resetWarehouseTransfer()
  }, [mode])

  useEffect(() => {
    definedFactoryActions.searchFactories({ isGetAll: 1 })
    defineWarehouseActions.searchWarehouses({ isGetAll: 1 })
  }, [])

  const initialValues = {
    code: warehouseTransferDetails?.code || '',
    name: warehouseTransferDetails?.name || '',
    isSameWarehouse:
      warehouseTransferDetails?.isSameWarehouse === 1 ? true : false || false,
    destinationFactoryName:
      warehouseTransferDetails?.destinationFactory?.id || '',
    sourceFactoryName: warehouseTransferDetails?.sourceFactory?.id || '',
    destinationWarehouseName:
      warehouseTransferDetails?.destinationWarehouse?.id || '',
    sourceWarehouseName: warehouseTransferDetails?.sourceWarehouse?.id || '',
    estimationDay: warehouseTransferDetails?.transferOn || '',
    description: warehouseTransferDetails?.description || '',
    items: warehouseTransferDetails?.warehouseTransferDetailLots?.map(
      (item) => ({
        itemId: item?.itemId,
        lotNumber: item?.lotNumber,
        itemName: item?.item?.name,
        itemType: item?.item?.itemType?.name,
        mfg: item?.mfg,
        packageId: item?.packageId,
        planQuantity: +item?.planQuantity,
        unitType: item?.item?.itemUnit?.name,
      }),
    ) || [{ ...DEFAULT_ITEM }],
  }
  const onSubmit = (values) => {
    const params = {
      code: values?.code,
      destinationWarehouseId: +values?.sourceWarehouseName,
      isSameWarehouse: values?.isSameWarehouse ? 1 : 0,
      name: values?.name,
      sourceWarehouseId: +values?.destinationWarehouseName,
      transferOn: values?.estimationDay,
      type: 1,
      description: values?.description?.trim(),
      items: values?.items?.map((item) => ({
        itemId: item.itemId,
        quantity: +item.planQuantity,
        lotNumber: item.lotNumber,
        packageId: +item.packageId || null,
        mfg: item.mfg,
      })),
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createWarehouseTransfer(params, backToList)
    } else {
      params.id = +id
      params.createdByUserId = warehouseTransferDetails?.createdByUserId
      actions.updateWarehouseTransfer(params, backToList)
    }
  }
  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'orderManagement',
      },
      {
        route: ROUTE.WAREHOUSE_TRANSFERS.LIST.PATH,
        title: ROUTE.WAREHOUSE_TRANSFERS.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.WAREHOUSE_TRANSFERS.CREATE.PATH,
          title: ROUTE.WAREHOUSE_TRANSFERS.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.WAREHOUSE_TRANSFERS.EDIT.PATH,
          title: ROUTE.WAREHOUSE_TRANSFERS.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
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
  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.WAREHOUSE_TRANSFERS.CREATE.TITLE

      case MODAL_MODE.UPDATE:
        return ROUTE.WAREHOUSE_TRANSFERS.EDIT.TITLE
      default:
    }
  }
  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_TRANSFERS.LIST.PATH)
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
        validationSchema={warehouseTranferSchema(t)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset, setFieldValue, values }) => {
          const destinationWarehouseName = warehouseList?.filter(
            (item) => item?.factoryId === values?.destinationFactoryName,
          )
          const sourceWarehouseName = warehouseList?.filter(
            (item) => item?.factoryId === values?.sourceFactoryName,
          )
          return (
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
                        label={t('warehouseTransfer.code')}
                        name="code"
                        placeholder={t('warehouseTransfer.code')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
                        }}
                        allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                        disabled={isUpdate}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('warehouseTransfer.name')}
                        name="name"
                        placeholder={t('warehouseTransfer.name')}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Field.Checkbox
                            onChange={(checked) => {
                              if (!checked) {
                                setFieldValue('sourceFactoryName', {})
                                setFieldValue('sourceWarehouseName', {})
                              } else {
                                setFieldValue(
                                  'sourceFactoryName',
                                  values?.destinationFactoryName,
                                )
                                setFieldValue(
                                  'sourceWarehouseName',
                                  values?.destinationWarehouseName,
                                )
                              }
                            }}
                            name="isSameWarehouse"
                          />
                        }
                        label={t('warehouseTransfer.isSameWarehouse')}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}></Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        label={t('warehouseTransfer.destinationFactoryName')}
                        name="destinationFactoryName"
                        placeholder={t(
                          'warehouseTransfer.destinationFactoryName',
                        )}
                        options={factoryList}
                        getOptionLabel={(opt) => opt?.name}
                        filterOptions={createFilterOptions({
                          stringify: (opt) => `${opt?.code}|${opt?.name}`,
                        })}
                        getOptionValue={(opt) => opt?.id}
                        onChange={(val) => {
                          if (values?.isSameWarehouse) {
                            setFieldValue('sourceFactoryName', val)
                          }
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        label={t('warehouseTransfer.sourceFactoryName')}
                        name="sourceFactoryName"
                        placeholder={t('warehouseTransfer.sourceFactoryName')}
                        disabled={values?.isSameWarehouse}
                        options={factoryList}
                        getOptionLabel={(opt) => opt?.name}
                        filterOptions={createFilterOptions({
                          stringify: (opt) => `${opt?.code}|${opt?.name}`,
                        })}
                        getOptionValue={(opt) => opt?.id}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        label={t('warehouseTransfer.destinationWarehouseName')}
                        name="destinationWarehouseName"
                        placeholder={t(
                          'warehouseTransfer.destinationWarehouseName',
                        )}
                        options={destinationWarehouseName}
                        getOptionLabel={(opt) => opt?.name}
                        filterOptions={createFilterOptions({
                          stringify: (opt) => `${opt?.code}|${opt?.name}`,
                        })}
                        getOptionValue={(opt) => opt?.id}
                        onChange={(val) => {
                          if (values?.isSameWarehouse) {
                            setFieldValue('sourceWarehouseName', val)
                          }
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        label={t('warehouseTransfer.sourceWarehouseName')}
                        name="sourceWarehouseName"
                        placeholder={t('warehouseTransfer.sourceWarehouseName')}
                        options={sourceWarehouseName}
                        disabled={values?.isSameWarehouse}
                        getOptionLabel={(opt) => opt?.name}
                        filterOptions={createFilterOptions({
                          stringify: (opt) => `${opt?.code}|${opt?.name}`,
                        })}
                        getOptionValue={(opt) => opt?.id}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.DatePicker
                        label={t('warehouseTransfer.estimationDay')}
                        name="estimationDay"
                        placeholder={t('warehouseTransfer.estimationDay')}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field.TextField
                        name="description"
                        label={t('warehouseTransfer.descriptionInput')}
                        placeholder={t('warehouseTransfer.descriptionInput')}
                        multiline
                        rows={3}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Box sx={{ mt: 3 }}>
                <FieldArray
                  name="items"
                  render={(arrayHelpers) => (
                    <ItemSettingTable
                      items={values?.items}
                      mode={mode}
                      sourceWarehouseId={values?.sourceWarehouseName}
                      arrayHelpers={arrayHelpers}
                      setFieldValue={setFieldValue}
                      values={values}
                    />
                  )}
                />
              </Box>
              {renderActionBar(handleReset)}
            </Form>
          )
        }}
      </Formik>
    </Page>
  )
}

export default WarehouseTransferForm
