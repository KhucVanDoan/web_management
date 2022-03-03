import React, { useState, useEffect } from 'react'

import { TabContext, TabPanel, TabList } from '@mui/lab'
import { Checkbox, FormControlLabel, Grid, Tab } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import { Formik, Form, FieldArray } from 'formik'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { useAppStore } from '~/modules/auth/redux/hooks/useAppStore'
import { DEFAULT_UNITS, WEIGHT_UNITS } from '~/modules/mesx/constants/index'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import useDefineItem from '~/modules/mesx/redux/hooks/useDefineItem'
import { ROUTE } from '~/modules/mesx/routes/config'

import ItemsSettingTable from './items-setting-table'
import { itemSchema } from './schema'

function DefineItemForm() {
  const { t } = useTranslation(['mesx'])
  const routeMatch = useRouteMatch()
  const history = useHistory()
  const params = useParams()
  const [tabValue, setTabValue] = useState('1')
  const [warehouseId, setWarehouseId] = useState('')
  const [warehouseSectorId, setWarehouseSectorId] = useState('')

  const {
    data: { itemDetails, isLoading },
    actions,
  } = useDefineItem()

  const {
    data: { warehouseList, warehouseSectorList, warehouseShelfList },
    actions: commonManagementActions,
  } = useCommonManagement()

  const { appStore } = useAppStore()

  const initialValues = {
    name: itemDetails?.name || '',
    code: itemDetails?.code || '',
    description: itemDetails?.description || '',
    itemType: {
      id: itemDetails?.itemType?.id || '',
      name: itemDetails?.itemType?.name || '',
      code: itemDetails?.itemType?.code || '',
      hasItemDetail: itemDetails?.itemType?.hasItemDetail || false,
    },
    itemGroup: {
      id: itemDetails?.itemGroup?.id || '',
      name: itemDetails?.itemGroup?.name || '',
      code: itemDetails?.itemGroup?.code || '',
    },
    itemUnit: {
      id: itemDetails?.itemUnit?.id || '',
      name: itemDetails?.itemUnit?.name || '',
      code: itemDetails?.itemUnit?.code || '',
    },
    price: itemDetails?.price || '',
    dayExpire: itemDetails?.dayExpire || '',
    isProductionObject: itemDetails?.isProductionObject || false,
    hasStorageSpace: itemDetails?.hasStorageSpace || false,
    ...(itemDetails?.hasStorageSpace
      ? {
          long: {
            value: itemDetails?.long?.value,
            unit: itemDetails?.long?.unit,
          },
          width: {
            value: itemDetails?.width?.value,
            unit: itemDetails?.width?.unit,
          },
          height: {
            value: itemDetails?.height?.value,
            unit: itemDetails?.height?.unit,
          },
          weight: {
            value: itemDetails?.weight?.value,
            unit: itemDetails?.weight?.unit,
          },
        }
      : {}),
    isLocation: !!itemDetails?.itemWarehouseLocation || false,
    ...(itemDetails?.itemWarehouseLocation
      ? {
          itemWarehouseLocation: {
            warehouseId: itemDetails?.itemWarehouseLocation?.warehouseId || '',
            warehouseSectorId:
              itemDetails?.itemWarehouseLocation?.warehouseSectorId || '',
            warehouseShelfId:
              itemDetails?.itemWarehouseLocation?.warehouseShelfId || '',
          },
        }
      : {}),
    hasItemDetail: !!itemDetails?.itemDetails || false,
    itemDetails:
      itemDetails?.itemDetails?.map((item) => ({
        detailId: item.itemDetailId,
        quantity: Number(item.quantity),
      })) || [],
  }

  const [isProductionObject, setIsProductionObject] = useState(
    initialValues.isProductionObject,
  )
  const [isLocation, setIsLocation] = useState(initialValues.isLocation)
  const [storage, setStorage] = useState(initialValues.hasStorageSpace)
  const [isDetailed, setIsDetailed] = useState(initialValues.hasItemDetail)

  const MODE_MAP = {
    [ROUTE.DEFINE_ITEM.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_ITEM.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const handleChangeTabValue = (event, value) => {
    setTabValue(value)
  }

  const backToList = () => {
    history.push(ROUTE.DEFINE_ITEM.LIST.PATH)
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.DEFINE_ITEM.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_ITEM.EDIT.TITLE
      default:
        break
    }
  }

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'database',
      },
      {
        route: ROUTE.DEFINE_ITEM.LIST.PATH,
        title: ROUTE.DEFINE_ITEM.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_ITEM.CREATE.PATH,
          title: ROUTE.DEFINE_ITEM.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_ITEM.EDIT.PATH,
          title: ROUTE.DEFINE_ITEM.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  const onToggleIsProductionObject = () => {
    setIsProductionObject(!isProductionObject)
  }

  const onToggleStorage = () => {
    setStorage(!storage)
  }

  const onToggleStorageLocation = () => {
    setIsLocation(!isLocation)
  }

  const onToggleIsDetailed = (checked) => {
    setIsDetailed(!isDetailed)
  }

  useEffect(() => {
    const id = params?.id
    actions.getItemDetailsById(id)
    commonManagementActions.getWarehouses()
    commonManagementActions.getWarehousesSector()
    commonManagementActions.getWarehousesShelf()
    return () => {
      actions.resetItemDetailsState()
    }
  }, [params?.id])

  const onSubmit = (values) => {
    const id = Number(params?.id)

    const convertValues = {
      ...values,
      id,
      itemTypeId: values?.itemType?.id,
      itemGroupId: values?.itemGroup?.id,
      itemUnitId: values?.itemUnit?.id,
      price: Number(values.price),
      dayExpire: values?.dayExpire ? Number(values.dayExpire) : null,
      isProductionObject: isProductionObject ? '1' : '0',
      hasStorageSpace: storage ? 1 : 0,
      ...(storage
        ? {
            long: {
              value: Number(values?.long?.value),
              unit: values?.long?.unit,
            },
            width: {
              value: Number(values.width?.value),
              unit: values.width?.unit,
            },
            height: {
              value: Number(values.height?.value),
              unit: values.height?.unit,
            },
            weight: {
              value: Number(values.weight?.value),
              unit: values.weight?.unit,
            },
          }
        : {}),
      isLocation: isLocation,
      ...(isLocation
        ? {
            itemWarehouseLocation: {
              warehouseId: values?.warehouse?.id,
              warehouseSectorId: values?.warehouseSector?.id,
              warehouseShelfId: values?.warehouseShelf?.id,
            },
          }
        : {}),
      ...(isDetailed
        ? {
            itemDetails: values.items?.map((item) => ({
              detailId: item.detailId,
              quantity: Number(item.quantity),
            })),
          }
        : {}),
    }

    if (mode === MODAL_MODE.CREATE) {
      actions.createItem(convertValues, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updateItem(convertValues, backToList)
    }
  }

  const renderActionButtons = (handleReset) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <>
            <Button onClick={backToList} color="grayF4" sx={{ mr: 4 / 3 }}>
              {t('common.close')}
            </Button>
            <Button
              onClick={handleReset}
              variant="outlined"
              color="subText"
              sx={{ mr: 4 / 3 }}
            >
              {t('common.cancel')}
            </Button>
            <Button type="submit">{t('common.create')}</Button>
          </>
        )
      case MODAL_MODE.UPDATE:
        return (
          <>
            <Button onClick={backToList} color="grayF4" sx={{ mr: 4 / 3 }}>
              {t('common.close')}
            </Button>
            <Button
              onClick={handleReset}
              variant="outlined"
              color="subText"
              sx={{ mr: 4 / 3 }}
            >
              {t('common.cancel')}
            </Button>
            <Button type="submit">{t('common.save')}</Button>
          </>
        )
      default:
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
            validationSchema={itemSchema(t)}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ handleReset, values }) => (
              <Form>
                <TabContext value={tabValue}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChangeTabValue}>
                      <Tab label={t('defineItem.commonInfo')} value="1" />
                      <Tab label={t('defineItem.storage')} value="2" />
                      <Tab label={t('defineItem.storageInfo')} value="3" />
                      <Tab label={t('defineItem.detail')} value="4" />
                    </TabList>
                  </Box>
                  <TabPanel sx={{ px: 0 }} value="1">
                    <Grid
                      container
                      rowSpacing={4 / 3}
                      columnSpacing={{ xl: 8, xs: 4 }}
                    >
                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          label={t('defineItem.code')}
                          name="code"
                          placeholder={t('defineItem.code')}
                          disabled={isUpdate}
                          required
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          name="name"
                          label={t('defineItem.name')}
                          placeholder={t('defineItem.name')}
                          required
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.Autocomplete
                          name="itemType"
                          label={t('defineItem.typeCode')}
                          placeholder={t('defineItem.typeCode')}
                          options={appStore?.itemTypes}
                          getOptionLabel={(opt) => opt?.code}
                          required
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          name="itemType.name"
                          label={t('defineItem.typeName')}
                          placeholder={t('defineItem.typeName')}
                          disabled
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.Autocomplete
                          name="itemGroup"
                          label={t('defineItem.groupCode')}
                          placeholder={t('defineItem.groupCode')}
                          options={appStore?.itemGroups}
                          getOptionLabel={(opt) => opt?.code}
                          required
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          name="itemGroup.name"
                          label={t('defineItem.groupName')}
                          placeholder={t('defineItem.groupName')}
                          disabled
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.Autocomplete
                          name="itemUnit"
                          label={t('defineItem.unit')}
                          placeholder={t('defineItem.unit')}
                          options={appStore?.itemUnits}
                          getOptionLabel={(opt) => opt?.name}
                          required
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          name="price"
                          label={t('defineItem.price')}
                          placeholder={t('defineItem.price')}
                          type="number"
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          name="dayExpire"
                          label={t('defineItem.expiry')}
                          placeholder={t('defineItem.expiry')}
                          type="number"
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isProductionObject}
                              onChange={onToggleIsProductionObject}
                              name="isProductionObject"
                            />
                          }
                          label={t('defineItem.isProductionObject') + '?'}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field.TextField
                          name="description"
                          label={t('defineItem.description')}
                          placeholder={t('defineItem.description')}
                          multiline
                          rows={3}
                        />
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel sx={{ px: 0 }} value="2">
                    <Grid
                      container
                      rowSpacing={4 / 3}
                      columnSpacing={{ xl: 8, xs: 4 }}
                    >
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={storage}
                              onChange={onToggleStorage}
                              name="storage"
                            />
                          }
                          label={t('defineItem.storage')}
                        />
                      </Grid>

                      <Grid item lg={6} xs={12}>
                        <Grid container spacing={1} mb={4 / 3}>
                          <Grid item xs={8}>
                            <Field.TextField
                              name="long.value"
                              label={t('defineItem.long')}
                              labelWidth={100}
                              placeholder={t('defineItem.long')}
                              type="number"
                              disabled={!storage}
                              required={storage}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl fullWidth size="small">
                              <Field.Autocomplete
                                name="long.unit"
                                options={DEFAULT_UNITS}
                                getOptionLabel={(opt) => opt?.name}
                                getOptionValue={(opt) => opt?.id}
                                disabled={!storage}
                              ></Field.Autocomplete>
                            </FormControl>
                          </Grid>
                        </Grid>

                        <Grid container spacing={1}>
                          <Grid item xs={8}>
                            <Field.TextField
                              name="width.value"
                              label={t('defineItem.width')}
                              labelWidth={100}
                              placeholder={t('defineItem.width')}
                              type="number"
                              disabled={!storage}
                              required={storage}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl fullWidth size="small">
                              <Field.Autocomplete
                                name="width.unit"
                                options={DEFAULT_UNITS}
                                getOptionLabel={(opt) => opt?.name}
                                getOptionValue={(opt) => opt?.id}
                                disabled={!storage}
                              ></Field.Autocomplete>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item lg={6} xs={12}>
                        <Grid container spacing={1} mb={4 / 3}>
                          <Grid item xs={8}>
                            <Field.TextField
                              name="height.value"
                              label={t('defineItem.height')}
                              labelWidth={100}
                              placeholder={t('defineItem.height')}
                              type="number"
                              disabled={!storage}
                              required={storage}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl fullWidth size="small">
                              <Field.Autocomplete
                                name="height.unit"
                                options={DEFAULT_UNITS}
                                getOptionLabel={(opt) => opt?.name}
                                getOptionValue={(opt) => opt?.id}
                                disabled={!storage}
                              ></Field.Autocomplete>
                            </FormControl>
                          </Grid>
                        </Grid>

                        <Grid container spacing={1}>
                          <Grid item xs={8}>
                            <Field.TextField
                              name="weight.value"
                              label={t('defineItem.weight')}
                              labelWidth={100}
                              placeholder={t('defineItem.weight')}
                              type="number"
                              disabled={!storage}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl fullWidth size="small">
                              <Field.Autocomplete
                                name="weight.unit"
                                options={WEIGHT_UNITS}
                                getOptionLabel={(opt) => opt?.name}
                                getOptionValue={(opt) => opt?.id}
                                disabled={!storage}
                              ></Field.Autocomplete>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel sx={{ px: 0 }} value="3">
                    <Grid
                      container
                      rowSpacing={4 / 3}
                      columnSpacing={{ xl: 8, xs: 4 }}
                    >
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isLocation}
                              onChange={onToggleStorageLocation}
                              name="isLocation"
                            />
                          }
                          label={t('defineItem.storageLocation')}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.Autocomplete
                          name="warehouse"
                          label={t('defineItem.warehouseName')}
                          placeholder={t('defineItem.warehouseName')}
                          options={warehouseList}
                          getOptionLabel={(option) => option?.name}
                          onChange={(val) => setWarehouseId(val.id)}
                          disabled={!isLocation}
                          required={isLocation}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.Autocomplete
                          name="warehouseSector"
                          label={t('defineItem.locationName')}
                          placeholder={t('defineItem.locationName')}
                          options={warehouseSectorList.filter(
                            (item) => item.warehouseId === warehouseId,
                          )}
                          getOptionLabel={(option) => option?.name}
                          onChange={(val) => setWarehouseSectorId(val.id)}
                          disabled={!isLocation}
                          required={isLocation}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.Autocomplete
                          name="warehouseShelf"
                          label={t('defineItem.shelfName')}
                          placeholder={t('defineItem.shelfName')}
                          options={warehouseShelfList.filter(
                            (item) =>
                              item.warehouseSector.id === warehouseSectorId,
                          )}
                          getOptionLabel={(option) => option?.name}
                          disabled={!isLocation}
                          required={isLocation}
                        />
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel sx={{ px: 0 }} value="4">
                    <Grid
                      container
                      rowSpacing={4 / 3}
                      columnSpacing={{ xl: 8, xs: 4 }}
                    >
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isDetailed}
                              onChange={onToggleIsDetailed}
                              name="isDetailed"
                            />
                          }
                          label={t('defineItem.isDetailed') + '?'}
                        />
                      </Grid>
                      {isDetailed && (
                        <Grid item xs={12}>
                          <FieldArray
                            name="itemDetails"
                            render={(arrayHelpers) => (
                              <ItemsSettingTable
                                items={values?.itemDetails || []}
                                mode={mode}
                                arrayHelpers={arrayHelpers}
                              />
                            )}
                          />
                        </Grid>
                      )}
                    </Grid>
                  </TabPanel>
                </TabContext>
                <Box mt={3} display="flex" justifyContent="flex-end">
                  {renderActionButtons(handleReset)}
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefineItemForm
