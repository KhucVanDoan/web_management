import React, { useEffect, useMemo, useState } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { Formik, Form, FieldArray } from 'formik'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  INVENTORY_CALENDAR_STATUS_OPTIONS,
  INVENTORY_TYPE,
  INVENTORY_TYPE_OPTIONS,
} from '~/modules/wmsx/constants'
import useInventoryCalendar from '~/modules/wmsx/redux/hooks/useInventoryCalendar'
import { searchWarehousesApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouses'
import { ROUTE } from '~/modules/wmsx/routes/config'

import ItemsSettingTable from './items-setting-table'
import { inventoryCalendarSchema } from './schema'

const InventoryCalendarForm = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const params = useParams()
  const routeMatch = useRouteMatch()

  const [isPartial, setIsPartial] = useState(false)

  const DEFAULT_ITEM = {
    id: new Date().getTime(),
    warehouseName: '',
    warehouseSectorName: null,
    warehouseShelfName: null,
    warehousePalletName: null,
    itemId: null,
    itemName: '',
  }

  const {
    data: { isLoading, inventoryCalendarDetails },
    actions,
  } = useInventoryCalendar()

  const initialValues = useMemo(
    () => ({
      code: inventoryCalendarDetails?.code || '',
      name: inventoryCalendarDetails?.name || '',
      type: inventoryCalendarDetails?.type,
      warehouses: inventoryCalendarDetails?.warehouses?.[0] || null,
      executionDay: inventoryCalendarDetails?.executionDay || null,
      description: inventoryCalendarDetails?.description || '',
      items:
        inventoryCalendarDetails.type === INVENTORY_TYPE.PARTIAL_INVENTORY
          ? inventoryCalendarDetails?.items?.map((i, index) => ({
              id: index,
              itemId: i.item,
              warehouseSectorName: i.warehouseSector?.id,
              warehouseShelfName: i.warehouseShelf?.id,
              warehousePalletName: i.warehouseShelfFloor?.id,
            }))
          : [{ ...DEFAULT_ITEM }],
    }),
    [inventoryCalendarDetails],
  )

  const MODE_MAP = {
    [ROUTE.INVENTORY_CALENDAR.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.INVENTORY_CALENDAR.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'orderManagement',
      },
      {
        route: ROUTE.INVENTORY_CALENDAR.LIST.PATH,
        title: ROUTE.INVENTORY_CALENDAR.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.INVENTORY_CALENDAR.CREATE.PATH,
          title: ROUTE.INVENTORY_CALENDAR.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.INVENTORY_CALENDAR.EDIT.PATH,
          title: ROUTE.INVENTORY_CALENDAR.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      const id = params?.id
      actions.getInventoryCalendarDetailsById(id)
    }
    return () => {
      if (isUpdate) actions.resetInventoryCalendarDetailsState()
    }
  }, [params?.id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.INVENTORY_CALENDAR.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.INVENTORY_CALENDAR.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.INVENTORY_CALENDAR.LIST.PATH)
  }

  const onSubmit = (values) => {
    const id = Number(params?.id)

    const convertValues = {
      ...values,
      id,
      warehouseId: values?.warehouses?.id,
      items:
        values?.type === INVENTORY_TYPE.PARTIAL_INVENTORY
          ? values.items?.map((item) => ({
              id: item?.itemId?.id || item?.itemId?.itemId,
              sectorId: item?.warehouseSectorName,
              shelfId: item?.warehouseShelfName,
              floorId: item?.warehousePalletName,
            }))
          : [],
    }

    if (mode === MODAL_MODE.CREATE) {
      actions.createInventoryCalendar(convertValues, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updateInventoryCalendar(convertValues, backToList)
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
      <Formik
        initialValues={initialValues}
        validationSchema={inventoryCalendarSchema(t, isPartial)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset, values, setFieldValue }) => {
          setIsPartial(values?.type === INVENTORY_TYPE.PARTIAL_INVENTORY)
          return (
            <Form>
              <Grid container justifyContent="center">
                <Grid item xl={11} xs={12}>
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
                              {t('inventoryCalendar.status')}
                            </Typography>
                          }
                          value={
                            <Status
                              options={INVENTORY_CALENDAR_STATUS_OPTIONS}
                              value={inventoryCalendarDetails?.status}
                            />
                          }
                        />
                      </Grid>
                    )}
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        label={t('inventoryCalendar.code')}
                        name="code"
                        placeholder={t('inventoryCalendar.code')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_12.MAX,
                        }}
                        allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                        disabled={isUpdate}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="name"
                        label={t('inventoryCalendar.name')}
                        placeholder={t('inventoryCalendar.name')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="type"
                        label={t('inventoryCalendar.inventoryType')}
                        placeholder={t('inventoryCalendar.inventoryType')}
                        options={INVENTORY_TYPE_OPTIONS}
                        getOptionValue={(opt) => opt?.id}
                        getOptionLabel={(opt) => t(opt?.text)}
                        onChange={() =>
                          setFieldValue('items', [{ ...DEFAULT_ITEM }])
                        }
                        required
                        disableClearable
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.DatePicker
                        name="executionDay"
                        label={t('inventoryCalendar.executionDay')}
                        placeholder={t('inventoryCalendar.executionDay')}
                        minDate={
                          isUpdate
                            ? new Date(inventoryCalendarDetails?.executionDay)
                            : new Date()
                        }
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="warehouses"
                        label={t('inventoryCalendar.warehouses')}
                        placeholder={t('inventoryCalendar.warehouses')}
                        options={inventoryCalendarDetails?.warehouses}
                        asyncRequest={(s) =>
                          searchWarehousesApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => opt?.name}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field.TextField
                        name="description"
                        label={t('inventoryCalendar.description')}
                        placeholder={t('inventoryCalendar.description')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        multiline
                        rows={3}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {isPartial && (
                <Box sx={{ mt: 3 }}>
                  <FieldArray
                    name="items"
                    render={(arrayHelpers) => (
                      <ItemsSettingTable
                        items={values?.items || []}
                        mode={mode}
                        arrayHelpers={arrayHelpers}
                        values={values}
                        setFieldValue={setFieldValue}
                      />
                    )}
                  />
                </Box>
              )}
              {renderActionBar(handleReset)}
            </Form>
          )
        }}
      </Formik>
    </Page>
  )
}

export default InventoryCalendarForm
