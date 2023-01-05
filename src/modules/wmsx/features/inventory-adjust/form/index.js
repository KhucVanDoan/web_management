import React, { useEffect, useMemo, useState } from 'react'

import FileUploadIcon from '@mui/icons-material/FileUpload'
import { Box, FormLabel, Grid, Typography } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  ACTIVE_STATUS,
  INVENTORY_ADJUST_STATUS_OPTIONS,
  INVENTORY_ADJUST_TYPE,
  INVENTORY_ADJUST_TYPE_OPTIONS,
} from '~/modules/wmsx/constants'
import useInventoryAdjust from '~/modules/wmsx/redux/hooks/useInventoryAdjust'
import { searchWarehouseApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouse'
import { searchInventoryCalendarsApi } from '~/modules/wmsx/redux/sagas/inventory-calendar/search-inventory-calendars'
import { searchApi } from '~/modules/wmsx/redux/sagas/reason-management/search'
import { searchReceiptDepartmentApi } from '~/modules/wmsx/redux/sagas/receipt-department-management/search-receipt-department'
import { getSourceManagementApi } from '~/modules/wmsx/redux/sagas/source-management/get-detail'
import { searchSourceManagementApi } from '~/modules/wmsx/redux/sagas/source-management/search'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { useClasses } from '~/themes'
import { convertFilterParams } from '~/utils'

import ItemSettingTable from './item-setting-table'
import InventoryyAdjustSchema from './schema'
import style from './style'

const DEFAULT_ITEM = {
  id: new Date().getTime(),
  itemId: '',
  itemName: '',
  unitName: '',
  locator: '',
  lotNumber: '',
  quantity: '',
  price: '',
  amount: '',
  debitAccount: '',
  creditAccount: '',
}
const InventoryAdjustForm = () => {
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { t } = useTranslation(['wmsx'])
  const [debitAccount, setDebitAccount] = useState('')
  const MODE_MAP = {
    [ROUTE.INVENTORY_ADJUST.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.INVENTORY_ADJUST.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const classes = useClasses(style)
  const {
    data: { inventoryAdjustDetails, isLoading },
    actions,
  } = useInventoryAdjust()
  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      actions.getInventoryAdjustDetailsById(id, async (data) => {
        const res = await getSourceManagementApi(data?.source?.id)
        if (res?.statusCode === 200) {
          setDebitAccount(
            [
              res?.data?.accountant,
              res?.data?.produceTypeCode,
              res?.data?.productCode,
              res?.data?.factorialCode,
            ].join('.'),
          )
        }
      })
    }

    return () => actions.resetInventoryAdjust()
  }, [mode, id])
  const initialValues = useMemo(
    () => ({
      code: inventoryAdjustDetails?.code || '',
      name: inventoryAdjustDetails?.name || '',
      type: isUpdate ? inventoryAdjustDetails?.type : '',
      departmentReceiptId: inventoryAdjustDetails?.departmentReceipt || '',
      warehouse: inventoryAdjustDetails?.warehouse || '',
      inventoryCalendar: inventoryAdjustDetails?.inventory || '',
      receiptDate: inventoryAdjustDetails?.receiptDate
        ? new Date(inventoryAdjustDetails?.receiptDate)
        : '',
      receiptNumber: inventoryAdjustDetails?.receiptNumber || '',
      reasonId: inventoryAdjustDetails?.reason || '',
      sourceId: inventoryAdjustDetails?.source || '',
      explanation: inventoryAdjustDetails?.explanation || '',
      attachment: inventoryAdjustDetails?.attachment || '',
      items: inventoryAdjustDetails?.items?.map((item) => ({
        itemCode: {
          ...item?.item,
          itemUnit: { name: item?.item?.unitName },
          locations: [
            {
              ...item?.locator,
              locatorId: item?.locator?.id,
              quantityExported: item?.exportQuantity,
              lots: [
                item?.lotNumber
                  ? {
                      lotNumber: item?.lotNumber,
                      quantityExported: item?.planQuantity,
                    }
                  : null,
              ],
            },
          ],
        },
        lotNumber: item?.lotNumber
          ? {
              lotNumber: item?.lotNumber,
              quantityExported: item?.exportQuantity,
            }
          : null,
        itemName: item?.item?.name,
        unit: item?.item?.unitName,
        locator: { ...item?.locator, locatorId: item?.locator?.id },
        quantity: item?.quantity,
        price: item?.price,
        amount: item?.amount,
        debitAccount: item?.debitAccount,
        creditAccount: item?.creditAccount,
      })) || [{ ...DEFAULT_ITEM }],
    }),
    [inventoryAdjustDetails],
  )
  const onSubmit = (values) => {
    const params = {
      code: values?.code,
      name: values?.name,
      warehouseId: values?.warehouse?.id,
      departmentReceiptId: values?.departmentReceiptId?.id || '',
      inventoryId: values?.inventoryCalendar?.id || '',
      receiptDate: values?.receiptDate
        ? values?.receiptDate?.toISOString()
        : null,
      receiptNumber: values?.receiptNumber || '',
      sourceId: values?.sourceId?.id,
      reasonId: values?.reasonId?.id,
      type: +values?.type,
      attachment: JSON.stringify(
        (values?.attachment || [])?.map((item) => item),
      ),
      explanation: values?.explanation || null,
      items: JSON.stringify(
        values?.items?.map((item) => ({
          itemId: item?.itemCode?.id,
          locatorId: +item?.locator?.locatorId || null,
          quantity: +item.quantity,
          lotNumber: item?.lotNumber?.lotNumber || item?.lotNumber || null,
          amount: item?.amount,
          price: item?.price,
          debitAccount:
            values?.type === INVENTORY_ADJUST_TYPE.WAREHOUSE_IMPORT
              ? item?.debitAccount
              : debitAccount,
          creditAccount:
            values?.type === INVENTORY_ADJUST_TYPE.WAREHOUSE_IMPORT
              ? debitAccount
              : item?.creditAccount,
        })),
      ),
    }
    if (isUpdate) {
      actions.updateInventoryAdjust({ ...params, id: id }, backToList)
    } else {
      actions.createInventoryAdjust(params, backToList)
    }
  }

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'orderManagement',
      },
      {
        route: ROUTE.INVENTORY_ADJUST.LIST.PATH,
        title: ROUTE.INVENTORY_ADJUST.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.INVENTORY_ADJUST.CREATE.PATH,
          title: ROUTE.INVENTORY_ADJUST.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.INVENTORY_ADJUST.EDIT.PATH,
          title: ROUTE.INVENTORY_ADJUST.EDIT.TITLE,
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
    }
  }
  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.INVENTORY_ADJUST.CREATE.TITLE

      case MODAL_MODE.UPDATE:
        return ROUTE.INVENTORY_ADJUST.EDIT.TITLE
      default:
    }
  }
  const backToList = () => {
    history.push(ROUTE.INVENTORY_ADJUST.LIST.PATH)
  }
  // const handleChangeWarehouse = (val, values) => {

  //   if (values?.type === INVENTORY_ADJUST_TYPE.WAREHOUSE_EXPORT) {
  //     if (!isEmpty(val)) {
  //       warehouseTransferAction.getListItemWarehouseStock(val?.id)
  //     }
  //   }
  // }
  const handleChangeType = (val, values, setFieldValue) => {
    setFieldValue('items', [{ ...DEFAULT_ITEM }])
    // if (val === INVENTORY_ADJUST_TYPE.WAREHOUSE_EXPORT) {
    //   if (!isEmpty(values?.warehouse)) {
    //     warehouseTransferAction.getListItemWarehouseStock(values?.warehouse?.id)
    //   }
    // }
  }
  const handleChangeSource = async (val) => {
    if (val) {
      const res = await getSourceManagementApi(val?.id)
      if (res?.statusCode === 200) {
        setDebitAccount(
          [
            res?.data?.accountant,
            res?.data?.produceTypeCode,
            res?.data?.productCode,
            res?.data?.factorialCode,
          ].join('.'),
        )
      }
    }
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
        validationSchema={InventoryyAdjustSchema(t)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset, values, setFieldValue }) => {
          return (
            <Form>
              <Grid container justifyContent="center">
                <Grid item xl={11} xs={12}>
                  <Grid
                    container
                    columnSpacing={{ xl: 8, xs: 4 }}
                    rowSpacing={4 / 3}
                  >
                    {isUpdate && (
                      <Grid item xs={12}>
                        <LV
                          label={
                            <Typography>
                              {t('inventoryAdjust.status')}
                            </Typography>
                          }
                          value={
                            <Status
                              options={INVENTORY_ADJUST_STATUS_OPTIONS}
                              value={inventoryAdjustDetails?.status}
                            />
                          }
                        />
                      </Grid>
                    )}
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('inventoryAdjust.code')}
                        name="code"
                        placeholder={t('inventoryAdjust.code')}
                        allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
                        }}
                        disabled={isUpdate}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('inventoryAdjust.name')}
                        name="name"
                        placeholder={t('inventoryAdjust.name')}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="type"
                        label={t('inventoryAdjust.type')}
                        placeholder={t('inventoryAdjust.type')}
                        options={INVENTORY_ADJUST_TYPE_OPTIONS}
                        getOptionLabel={(opt) => t(`${opt?.text}`)}
                        getOptionValue={(opt) => opt?.id}
                        onChange={(val) =>
                          handleChangeType(val, values, setFieldValue)
                        }
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="warehouse"
                        label={t('inventoryAdjust.warehouse')}
                        placeholder={t('inventoryAdjust.warehouse')}
                        asyncRequest={(s) =>
                          searchWarehouseApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: convertFilterParams({
                              status: ACTIVE_STATUS.ACTIVE,
                            }),
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => opt?.code}
                        getOptionSubLabel={(opt) => opt?.name}
                        onChange={() =>
                          setFieldValue('items', [{ ...DEFAULT_ITEM }])
                        }
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="departmentReceiptId"
                        label={t('inventoryAdjust.departmentReceipts')}
                        placeholder={t('inventoryAdjust.departmentReceipts')}
                        asyncRequest={(s) =>
                          searchReceiptDepartmentApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: convertFilterParams({
                              status: ACTIVE_STATUS.ACTIVE,
                            }),
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => opt?.code}
                        getOptionSubLabel={(opt) => opt?.name}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="inventoryCalendar"
                        label={t('inventoryAdjust.inventoryCalendar')}
                        placeholder={t('inventoryAdjust.inventoryCalendar')}
                        asyncRequest={(s) =>
                          searchInventoryCalendarsApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: convertFilterParams({
                              status: ACTIVE_STATUS.ACTIVE,
                              warehouseId: values?.warehouse?.id,
                            }),
                          })
                        }
                        asyncRequestDesp={values?.warehouse}
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => opt?.code}
                        getOptionSubLabel={(opt) => opt?.name}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.DatePicker
                        name="receiptDate"
                        label={t('inventoryAdjust.licenseDate')}
                        placeholder={t('inventoryAdjust.licenseDate')}
                        maxDate={new Date()}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="receiptNumber"
                        label={t('inventoryAdjust.licenseNumber')}
                        placeholder={t('inventoryAdjust.licenseNumber')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_20.MAX,
                        }}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="sourceId"
                        label={t('inventoryAdjust.source')}
                        placeholder={t('inventoryAdjust.source')}
                        asyncRequest={(s) =>
                          searchSourceManagementApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: convertFilterParams({
                              status: ACTIVE_STATUS.ACTIVE,
                            }),
                          })
                        }
                        onChange={(val) => handleChangeSource(val)}
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => opt?.code}
                        getOptionSubLabel={(opt) => opt?.name}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="reasonId"
                        label={t('inventoryAdjust.reason')}
                        placeholder={t('inventoryAdjust.reason')}
                        asyncRequest={(s) =>
                          searchApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: convertFilterParams({
                              status: ACTIVE_STATUS.ACTIVE,
                            }),
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => opt?.code}
                        getOptionSubLabel={(opt) => opt?.name}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={
                          <Box sx={{ mt: 8 / 12 }}>
                            <FormLabel>
                              <Typography color={'text.main'} component="span">
                                {t('inventoryAdjust.attachment')}
                              </Typography>
                            </FormLabel>
                          </Box>
                        }
                      >
                        {(values?.attachment ||
                          inventoryAdjustDetails?.attachment) && (
                          <label htmlFor="select-file">
                            <Typography
                              className={classes.uploadText}
                              sx={{ mt: 8 / 12, mb: 1 }}
                            >
                              {isUpdate &&
                                inventoryAdjustDetails?.attachment?.map((i) => {
                                  return (
                                    <>
                                      <a
                                        key={i?.id}
                                        href={i?.fileUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        {i?.fileNameRaw}
                                      </a>
                                      <br />
                                    </>
                                  )
                                })}
                              {(values?.attachment || [])
                                ?.map((i) => i?.name)
                                ?.join('\r\n')}
                            </Typography>
                          </label>
                        )}
                        <Button
                          variant="contained"
                          component="label"
                          sx={{ backgroundColor: '#fff' }}
                        >
                          <FileUploadIcon color="primary" />
                          <input
                            hidden
                            id="select-file"
                            multiple
                            type="file"
                            accept="image/gif, image/jpeg, image/png, application/pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            onChange={(e) => {
                              setFieldValue(
                                'attachment',
                                Object.values(e.target.files),
                              )
                            }}
                          />
                        </Button>
                      </LV>
                    </Grid>

                    <Grid item xs={12}>
                      <Field.TextField
                        name="explanation"
                        label={t('inventoryAdjust.explanation')}
                        placeholder={t('inventoryAdjust.explanation')}
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
                          items={values?.items}
                          mode={mode}
                          arrayHelpers={arrayHelpers}
                          values={values}
                          setFieldValue={setFieldValue}
                          debitAccount={debitAccount}
                        />
                      )}
                    />
                  </Box>
                </Grid>
              </Grid>
              {renderActionBar(handleReset)}
            </Form>
          )
        }}
      </Formik>
    </Page>
  )
}

export default InventoryAdjustForm
