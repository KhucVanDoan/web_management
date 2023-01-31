import React, { useEffect, useMemo, useState } from 'react'

import FileUploadIcon from '@mui/icons-material/FileUpload'
import {
  Box,
  FormControlLabel,
  FormHelperText,
  Grid,
  Radio,
  Typography,
} from '@mui/material'
import { sub, subDays, endOfDay, startOfDay, startOfToday } from 'date-fns'
import { Formik, Form, FieldArray } from 'formik'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  FILE_TYPE,
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
import { searchUsersApi } from '~/modules/mesx/redux/sagas/user-management/search-users'
import {
  ACTIVE_STATUS,
  CHECK_POINT_DATA_TYPE,
  INVENTORY_CALENDAR_STATUS_OPTIONS,
  INVENTORY_TYPE,
  INVENTORY_TYPE_OPTIONS,
} from '~/modules/wmsx/constants'
import useInventoryCalendar from '~/modules/wmsx/redux/hooks/useInventoryCalendar'
import { searchWarehouseApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouse'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { useClasses } from '~/themes'
import { convertFilterParams, isSameDate } from '~/utils'

import ItemsSettingTable from './items-setting-table'
import { defineSchema } from './schema'
import style from './style'
const InventoryCalendarForm = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const [inventoryType, setInventoryType] = useState(null)
  const [dataSnapshot, setDataSnapshot] = useState(null)
  const classes = useClasses(style)
  const MODE_MAP = {
    [ROUTE.INVENTORY_CALENDAR.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.INVENTORY_CALENDAR.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const {
    data: { isLoading, inventoryCalendarDetails, itemUpdate },
    actions,
  } = useInventoryCalendar()
  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      actions.getInventoryCalendarDetailsById(id)
    }
    return () => {
      actions.resetInventoryCalendarDetailsState()
    }
  }, [id, mode])
  useEffect(() => {
    if (isUpdate && !isEmpty(inventoryCalendarDetails)) {
      actions.getItem(inventoryCalendarDetails?.id)
    }
  }, [inventoryCalendarDetails])
  const initialValues = useMemo(
    () => ({
      code: inventoryCalendarDetails?.code || '',
      name: inventoryCalendarDetails?.name || '',
      type: inventoryCalendarDetails?.type,
      warehouses:
        inventoryCalendarDetails?.warehouses?.map((item) => item) || [],
      executionDay: inventoryCalendarDetails?.executeFrom
        ? [
            new Date(inventoryCalendarDetails?.executeFrom),
            new Date(inventoryCalendarDetails?.executeTo),
          ]
        : '',
      checkPointDataAttachment:
        inventoryCalendarDetails?.checkPointDataAttachment || null,
      closingDay: inventoryCalendarDetails?.checkPointDate
        ? new Date(inventoryCalendarDetails?.checkPointDate)
        : new Date(),
      impersonators:
        inventoryCalendarDetails?.impersonators?.length > 0
          ? inventoryCalendarDetails?.impersonators
          : [],
      description: inventoryCalendarDetails?.description || '',
      switchMode:
        inventoryCalendarDetails?.checkPointDataType ||
        CHECK_POINT_DATA_TYPE.EXTERNAL_SNAPSHOT,
      items:
        inventoryCalendarDetails.type === INVENTORY_TYPE.UNEXPECTED
          ? itemUpdate?.map((i, index) => ({
              id: index,
              itemCode: {
                ...i,
                itemUnit: i?.item?.itemUnit,
                id: i?.itemId,
                name: i?.item?.name,
                code: i?.item?.code,
              },
            }))
          : [],
    }),
    [inventoryCalendarDetails, itemUpdate],
  )

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'receiptCommandManagement',
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
    let checkPointDate
    if (!isSameDate(startOfToday(), startOfDay(values?.closingDay))) {
      checkPointDate = endOfDay(subDays(values?.closingDay, 1))
    } else {
      checkPointDate = values?.closingDay
    }
    if (mode === MODAL_MODE.CREATE) {
      const convertValues = {
        name: values?.name,
        executeFrom: values?.executionDay[0]?.toISOString(),
        executeTo: values?.executionDay[1]?.toISOString(),
        checkPointDate: checkPointDate?.toISOString(),
        warehouseIds: JSON.stringify(
          values?.warehouses?.map((warehouse) => warehouse?.id),
        ),
        impersonators: JSON.stringify(
          values?.impersonators?.map((warehouse) => ({ id: warehouse?.id })),
        ),
        description: values?.description,
        type: values?.type,
        checkPointDataType: +values?.switchMode,
        checkPointDataAttachment: values?.checkPointDataAttachment || null,
      }
      const params = {
        name: values?.name,
        executeFrom: values?.executionDay[0]?.toISOString(),
        executeTo: values?.executionDay[1]?.toISOString(),
        checkPointDate: checkPointDate?.toISOString(),
        warehouseIds: JSON.stringify(
          values?.warehouses?.map((warehouse) => warehouse?.id),
        ),
        impersonators: JSON.stringify(
          values?.impersonators?.map((warehouse) => ({ id: warehouse?.id })),
        ),
        description: values?.description,
        type: values?.type,
        items: JSON.stringify(
          values.items?.map((item) => ({
            id: item?.itemCode?.id || item?.itemCode?.itemId,
          })),
        ),
      }
      actions.createInventoryCalendar(
        values?.type === INVENTORY_TYPE.UNEXPECTED ? params : convertValues,
        backToList,
      )
    } else if (mode === MODAL_MODE.UPDATE) {
      const convertValues = {
        name: values?.name,
        executeFrom: values?.executionDay[0]?.toISOString(),
        executeTo: values?.executionDay[1]?.toISOString(),
        checkPointDate: checkPointDate?.toISOString(),
        warehouseIds: JSON.stringify(
          values?.warehouses?.map((warehouse) => warehouse?.id),
        ),
        impersonators: JSON.stringify(
          values?.impersonators?.map((warehouse) => ({ id: warehouse?.id })),
        ),
        description: values?.description,
        type: values?.type,
        // items: '[]',
        checkPointDataType: +values?.switchMode,
        checkPointDataAttachment:
          values?.switchMode === CHECK_POINT_DATA_TYPE.EXTERNAL_SNAPSHOT
            ? values?.checkPointDataAttachment
            : null,
      }
      const params = {
        name: values?.name,
        executeFrom: values?.executionDay[0]?.toISOString(),
        executeTo: values?.executionDay[1]?.toISOString(),
        checkPointDate: checkPointDate?.toISOString(),
        warehouseIds: JSON.stringify(
          values?.warehouses?.map((warehouse) => warehouse?.id),
        ),
        impersonators: JSON.stringify(
          values?.impersonators?.map((warehouse) => ({ id: warehouse?.id })),
        ),
        description: values?.description,
        type: values?.type,
        items: JSON.stringify(
          values.items?.map((item) => ({
            id: item?.itemCode?.id || item?.itemCode?.itemId,
          })),
        ),
      }
      actions.updateInventoryCalendar(
        values?.type === INVENTORY_TYPE.UNEXPECTED
          ? { ...params, id: id, code: values?.code }
          : { ...convertValues, id: id, code: values?.code },
        backToList,
      )
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
        validationSchema={defineSchema(t, inventoryType, dataSnapshot)}
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
                    {isUpdate && (
                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          label={t('inventoryCalendar.code')}
                          name="code"
                          placeholder={t('inventoryCalendar.code')}
                          inputProps={{
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_12.MAX,
                          }}
                          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                          disabled
                          required
                        />
                      </Grid>
                    )}
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
                        onChange={(val) => {
                          setFieldValue('items', [])
                          setInventoryType(val)
                          if (val === INVENTORY_TYPE.PERIODIC) {
                            setDataSnapshot(
                              CHECK_POINT_DATA_TYPE.EXTERNAL_SNAPSHOT,
                            )
                          }
                        }}
                        required
                        disableClearable
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.DatePicker
                        name="closingDay"
                        label={t('inventoryCalendar.closingDay')}
                        placeholder={t('inventoryCalendar.closingDay')}
                        maxDate={new Date()}
                        minDate={
                          new Date(
                            sub(new Date(), {
                              years: 0,
                              months: 3,
                              weeks: 0,
                              days: 0,
                              hours: 0,
                              minutes: 0,
                              seconds: 0,
                            }),
                          )
                        }
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="warehouses"
                        label={t('inventoryCalendar.warehouses')}
                        placeholder={t('inventoryCalendar.warehouses')}
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
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        getOptionLabel={(opt) => opt?.name}
                        getOptionSubLabel={(opt) => opt?.code}
                        multiple
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="impersonators"
                        label={t('inventoryCalendar.impersonators')}
                        placeholder={t('inventoryCalendar.impersonators')}
                        asyncRequest={(s) =>
                          searchUsersApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: convertFilterParams({
                              status: ACTIVE_STATUS.ACTIVE,
                            }),
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        getOptionLabel={(opt) => opt?.username}
                        getOptionSubLabel={(opt) => opt?.fullName}
                        multiple
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.DateRangePicker
                        name="executionDay"
                        label={t('inventoryCalendar.executionDay')}
                        placeholder={t('inventoryCalendar.executionDay')}
                        minDate={values?.closingDay}
                        required
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Field.TextField
                        name="description"
                        label={t('inventoryCalendar.description')}
                        placeholder={t(
                          'inventoryCalendar.descriptionPlaceholder',
                        )}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        multiline
                        rows={3}
                      />
                    </Grid>
                    {values?.type === INVENTORY_TYPE.PERIODIC && (
                      <Grid item xs={12} mt={1}>
                        <LV
                          label={
                            <Typography>
                              {t('inventoryCalendar.dataClosing')}
                            </Typography>
                          }
                          value={
                            <Grid item xs={12} lg={6} mt={-1}>
                              <Field.RadioGroup name="switchMode">
                                <Box sx={{ display: 'flex' }}>
                                  <FormControlLabel
                                    value={
                                      CHECK_POINT_DATA_TYPE.EXTERNAL_SNAPSHOT
                                    }
                                    control={<Radio />}
                                    label={t('inventoryCalendar.dataSnapshot')}
                                    onChange={(val) => {
                                      val
                                        ? setDataSnapshot(
                                            CHECK_POINT_DATA_TYPE.EXTERNAL_SNAPSHOT,
                                          )
                                        : setDataSnapshot(null)
                                    }}
                                  />
                                  <FormControlLabel
                                    value={
                                      CHECK_POINT_DATA_TYPE.INTERNAL_SNAPSHOT
                                    }
                                    control={<Radio />}
                                    label={t('inventoryCalendar.snapshotWmsx')}
                                    sx={{ ml: 2 }}
                                    onChange={(val) => {
                                      val
                                        ? setDataSnapshot(null)
                                        : setDataSnapshot(
                                            CHECK_POINT_DATA_TYPE.EXTERNAL_SNAPSHOT,
                                          )
                                    }}
                                  />
                                </Box>
                              </Field.RadioGroup>
                            </Grid>
                          }
                        />
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              {values?.type === INVENTORY_TYPE.PERIODIC &&
                +values?.switchMode ===
                  CHECK_POINT_DATA_TYPE.EXTERNAL_SNAPSHOT && (
                  <Grid item xs={12} lg={6} mt={1}>
                    <LV sx={{ ml: 6, mt: 1 }}>
                      {values?.checkPointDataAttachment && (
                        <label htmlFor="select-file">
                          <Typography
                            className={classes.uploadText}
                            sx={{ mt: 8 / 12, mb: 1 }}
                          >
                            {values?.checkPointDataAttachment?.name}
                          </Typography>
                        </label>
                      )}
                      <>
                        <input
                          style={{ display: 'none' }}
                          id="contained-button-file"
                          type="file"
                          accept={FILE_TYPE.XLSX.EXT}
                          onChange={(e) => {
                            setFieldValue(
                              'checkPointDataAttachment',
                              e.target.files[0],
                            )
                          }}
                        />
                        <label htmlFor="contained-button-file">
                          <Button
                            variant="contained"
                            color="grayEE"
                            component="span"
                          >
                            <FileUploadIcon color="primary" /> Nhập dữ liệu
                          </Button>
                        </label>
                        {!values?.checkPointDataAttachment && (
                          <FormHelperText error>
                            {t('general:form.required')}
                          </FormHelperText>
                        )}
                      </>
                    </LV>
                  </Grid>
                )}
              {values?.type === INVENTORY_TYPE.UNEXPECTED && (
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
