import React, { useEffect, useMemo } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { ACTIVE_STATUS } from '~/modules/wmsx/constants'
import useInventoryAdjust from '~/modules/wmsx/redux/hooks/useInventoryAdjust'
import { searchWarehouseApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouse'
import { searchInventoryCalendarsApi } from '~/modules/wmsx/redux/sagas/inventory-calendar/search-inventory-calendars'
import { searchApi } from '~/modules/wmsx/redux/sagas/reason-management/search'
import { searchReceiptDepartmentApi } from '~/modules/wmsx/redux/sagas/receipt-department-management/search-receipt-department'
import { searchSourceManagementApi } from '~/modules/wmsx/redux/sagas/source-management/search'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams } from '~/utils'

import ItemSettingTable from './item-setting-table'
import InventoryyAdjustSchema from './schema'

const DEFAULT_ITEM = {
  ids: new Date().getTime(),
  itemCode: '',
  itemName: '',
  itemType: '',
  lotNumber: '',
  mfg: '',
  packageId: '',
  planExportedQuantity: '',
  unitType: '',
}
const InventoryAdjustForm = () => {
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { t } = useTranslation(['wmsx'])
  const MODE_MAP = {
    [ROUTE.INVENTORY_ADJUST.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.INVENTORY_ADJUST.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const {
    data: { inventoryAdjustDetails, isLoading },
    actions,
  } = useInventoryAdjust()

  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      actions.getInventoryAdjustDetailsById(id)
    }
    return () => actions.resetInventoryAdjust()
  }, [mode])
  const initialValues = useMemo(
    () => ({
      code: inventoryAdjustDetails?.code || '',
      name: inventoryAdjustDetails?.name || '',
      type: inventoryAdjustDetails?.type || '',
      reasonId: inventoryAdjustDetails?.reason || '',
      sourceId: inventoryAdjustDetails?.source || '',
      explanation: inventoryAdjustDetails?.explanation || '',
      items: inventoryAdjustDetails?.warehouseTransferDetailLots?.map(
        (item) => ({
          itemCode: {
            itemId: item?.itemId,
            id: item?.itemId,
            ...item?.item,
          },
          lotNumber: item?.lotNumber,
          itemName: item?.item?.name,
          locator: { ...item?.locator, locatorId: item?.locatorId },
          itemType: item?.item?.itemType?.name,
          transferQuantity: +item?.planQuantity,
        }),
      ) || [{ ...DEFAULT_ITEM }],
    }),
    [inventoryAdjustDetails],
  )
  const onSubmit = (values) => {
    const params = {
      // code: values?.code,
      destinationWarehouseId: +values?.destinationWarehouseId?.id,
      name: values?.name,
      bussinessTypeId: values?.businessTypeId?.id,
      sourceWarehouseId: +values?.sourceWarehouseId?.id,
      createdAt: values?.createdAt.toISOString(),
      sourceId: values?.sourceId?.id,
      reasonId: values?.reasonId?.id,
      type: +values?.type,
      receiver: values?.deliver,
      explanation: values?.explanation || null,
      items: JSON.stringify(
        values?.items?.map((item) => ({
          itemId: item?.itemCode?.id,
          locatorId: +item?.locator?.locatorId || null,
          quantity: +item.transferQuantity,
          lotNumber: item?.lotNumber || null,
          debitAcc: '1519',
          creditAcc: item?.creditAccount,
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
        {({ handleReset, values }) => {
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
                              options={[]}
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
                        options={[]}
                        getOptionLabel={(opt) => opt?.name}
                        getOptionValue={(opt) => opt?.id}
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
                              status: 1,
                            }),
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => opt?.name}
                        getOptionSubLabel={(opt) => opt?.code}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        required
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
                              status: 1,
                            }),
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => opt?.name}
                        getOptionSubLabel={(opt) => opt?.code}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.DatePicker
                        name="licenseDate"
                        label={t('inventoryAdjust.licenseDate')}
                        placeholder={t('inventoryAdjust.licenseDate')}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="licenseNumber"
                        label={t('inventoryAdjust.licenseNumber')}
                        placeholder={t('inventoryAdjust.licenseNumber')}
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
