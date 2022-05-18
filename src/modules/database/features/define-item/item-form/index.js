import React, { useEffect, useMemo } from 'react'

import { FormControlLabel, Grid, InputAdornment } from '@mui/material'
import { createFilterOptions } from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import { Formik, Form, FieldArray } from 'formik'
import { useTranslation } from 'react-i18next'
import {
  useParams,
  useHistory,
  useRouteMatch,
  useLocation,
} from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_REQUIRED_LENGTH,
  TEXTFIELD_ALLOW,
  CODE_SETTINGS,
  ASYNC_SEARCH_LIMIT,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import Tabs from '~/components/Tabs'
import useDefineItem from '~/modules/database/redux/hooks/useDefineItem'
import useItemType from '~/modules/database/redux/hooks/useItemType'
import { searchItemGroupsApi } from '~/modules/database/redux/sagas/item-group-setting/search-item-groups'
import { searchItemUnitsApi } from '~/modules/database/redux/sagas/item-unit-setting/search-item-units'
import { ROUTE } from '~/modules/database/routes/config'
import {
  DEFAULT_UNITS,
  WEIGHT_UNITS,
  DEFAULT_ITEM_TYPES,
} from '~/modules/mesx/constants'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import qs from '~/utils/qs'

import ItemsSettingTable from './items-setting-table'
import { itemSchema } from './schema'

const DEFAULT_DETAIL = {
  detailId: '',
  quantity: 1,
}

function DefineItemForm() {
  const { t } = useTranslation(['database'])
  const routeMatch = useRouteMatch()
  const history = useHistory()
  const params = useParams()
  const location = useLocation()
  const { cloneId } = qs.parse(location.search)
  const MODE_MAP = {
    [ROUTE.DEFINE_ITEM.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_ITEM.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const {
    data: { itemDetails, isLoading },
    actions,
  } = useDefineItem()

  const {
    data: { itemTypeList },
    actions: itemTypeActions,
  } = useItemType()

  useEffect(() => {
    itemTypeActions.searchItemTypes({ isGetAll: 1 })
  }, [])

  const {
    data: { detailList },
    actions: commonManagementActions,
  } = useCommonManagement()

  useEffect(() => {
    commonManagementActions.getDetails()
  }, [])

  const initialValues = useMemo(
    () => ({
      name: itemDetails?.name || '',
      code: isUpdate ? itemDetails?.code : CODE_SETTINGS.ITEM.PREFIX,
      description: itemDetails?.description || '',
      itemType: itemDetails?.itemType || '',
      itemGroup: itemDetails?.itemGroup || '',
      itemUnit: itemDetails?.itemUnit || '',
      price: itemDetails?.price
        ? itemDetails?.price === '0.00' && cloneId
          ? ''
          : itemDetails?.price
        : '',
      dayExpire: itemDetails?.dayExpire || 1,
      isProductionObject: Boolean(itemDetails?.isProductionObject) || false,
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
        : {
            long: {
              value: 1,
              unit: 3,
            },
            width: {
              value: 1,
              unit: 3,
            },
            height: {
              value: 1,
              unit: 3,
            },
            weight: {
              value: 1,
              unit: 1,
            },
          }),
      hasItemDetail: !!itemDetails?.itemDetails?.length || false,
      itemDetails: [],
      warehouseId: itemDetails?.itemWarehouseLocation?.warehouseId,
      warehouseSectorId: itemDetails?.itemWarehouseLocation?.warehouseSectorId,
      warehouseShelfId: itemDetails?.itemWarehouseLocation?.warehouseShelfId,
      items: itemDetails?.itemDetails?.map((item) => ({
        detailId: {
          ...item,
          name: detailList.find((detail) => detail.id === item?.itemDetailId)
            ?.name,
        },
        quantity: Number(item.quantity),
      })) || [{ ...DEFAULT_DETAIL }],
    }),
    [itemDetails, isUpdate],
  )

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

  useEffect(() => {
    if (params?.id) {
      actions.getItemDetailsById(params?.id)
    }

    if (cloneId) {
      actions.getItemDetailsById(cloneId)
    }
    return () => {
      actions.resetItemDetailsState()
    }
  }, [params?.id, cloneId])

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
      isProductionObject: values?.isProductionObject ? '1' : '0',
      hasStorageSpace: values?.hasStorageSpace ? 1 : 0,
      ...(values?.hasStorageSpace
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
      ...(values?.hasItemDetail
        ? {
            itemDetails: values.items?.map((item) => ({
              detailId: item.detailId?.id || item.detailId?.itemDetailId,
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
            {({ handleReset, values, setFieldValue }) => {
              const itemtype = values?.itemType?.code
              const disabledCheckBox = (DEFAULT_ITEM_TYPES.code || []).includes(
                itemtype,
              )
              return (
                <Form>
                  <Tabs
                    list={[
                      t('defineItem.commonInfo'),
                      t('defineItem.storage'),
                      t('defineItem.detail'),
                    ]}
                  >
                    {/* Tab 1 */}
                    <Box>
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
                            inputProps={{
                              maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_7.MAX,
                            }}
                            disabled={isUpdate}
                            required
                            allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                            onInput={(val) => {
                              if (
                                val?.indexOf(CODE_SETTINGS.ITEM.PREFIX) !== 0
                              ) {
                                return
                              }
                              setFieldValue('code', val)
                            }}
                            {...(cloneId ? { autoFocus: true } : {})}
                          />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                          <Field.TextField
                            name="name"
                            label={t('defineItem.name')}
                            placeholder={t('defineItem.name')}
                            inputProps={{
                              maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                            }}
                            required
                          />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                          <Field.Autocomplete
                            name="itemType"
                            label={t('defineItem.typeCode')}
                            placeholder={t('defineItem.typeCode')}
                            options={itemTypeList}
                            getOptionLabel={(opt) => opt?.code}
                            getOptionSubLabel={(opt) => opt?.name}
                            isOptionEqualToValue={(opt, val) =>
                              opt?.code === val?.code
                            }
                            filterOptions={createFilterOptions({
                              stringify: (opt) => `${opt?.code}|${opt?.name}`,
                            })}
                            subLabelWidth="70%"
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
                            asyncRequest={(s) =>
                              searchItemGroupsApi({
                                keyword: s,
                                limit: ASYNC_SEARCH_LIMIT,
                              })
                            }
                            asyncRequestHelper={(res) => res?.data?.items}
                            getOptionLabel={(opt) => opt?.code}
                            getOptionSubLabel={(opt) => opt?.name}
                            subLabelWidth="70%"
                            required
                            options={
                              itemDetails?.itemGroup?.code
                                ? [itemDetails?.itemGroup]
                                : []
                            }
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
                            asyncRequest={(s) =>
                              searchItemUnitsApi({
                                keyword: s,
                                limit: ASYNC_SEARCH_LIMIT,
                              })
                            }
                            asyncRequestHelper={(res) => res?.data?.items}
                            getOptionLabel={(opt) => opt?.name}
                            options={
                              itemDetails?.itemUnit?.id
                                ? [itemDetails?.itemUnit]
                                : []
                            }
                            required
                          />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                          <Field.TextField
                            name="price"
                            label={t('defineItem.price')}
                            placeholder={t('defineItem.price')}
                            numberProps={{
                              thousandSeparator: true,
                              decimalScale: 3,
                            }}
                          />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                          <Field.TextField
                            name="dayExpire"
                            label={t('defineItem.expiry')}
                            placeholder={t('defineItem.expiry')}
                            type="number"
                            allow={TEXTFIELD_ALLOW.NUMERIC}
                            endAdornment={
                              <InputAdornment
                                position="end"
                                sx={{ ml: 0, pr: 1 }}
                              >
                                {t('defineItem.day')}
                              </InputAdornment>
                            }
                          />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                          <FormControlLabel
                            control={
                              <Field.Checkbox
                                name="isProductionObject"
                                disabled={disabledCheckBox}
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
                            inputProps={{
                              maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                            }}
                            multiline
                            rows={3}
                          />
                        </Grid>
                      </Grid>
                    </Box>

                    {/* Tab 2 */}
                    <Box>
                      <Grid
                        container
                        rowSpacing={4 / 3}
                        columnSpacing={{ xl: 8, xs: 4 }}
                      >
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={
                              <Field.Checkbox
                                name="hasStorageSpace"
                                onChange={() => {
                                  setFieldValue('long', { value: 1, unit: 3 })
                                  setFieldValue('width', { value: 1, unit: 3 })
                                  setFieldValue('height', { value: 1, unit: 3 })
                                  setFieldValue('weight', { value: 1, unit: 1 })
                                }}
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
                                numberProps={{
                                  decimalScale: 3,
                                }}
                                disabled={!values.hasStorageSpace}
                                required={values.hasStorageSpace}
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <FormControl fullWidth size="small">
                                <Field.Autocomplete
                                  name="long.unit"
                                  options={DEFAULT_UNITS}
                                  getOptionLabel={(opt) => opt?.name}
                                  getOptionValue={(opt) => opt?.id}
                                  disabled={!values.hasStorageSpace}
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
                                numberProps={{
                                  decimalScale: 3,
                                }}
                                disabled={!values.hasStorageSpace}
                                required={values.hasStorageSpace}
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <FormControl fullWidth size="small">
                                <Field.Autocomplete
                                  name="width.unit"
                                  options={DEFAULT_UNITS}
                                  getOptionLabel={(opt) => opt?.name}
                                  getOptionValue={(opt) => opt?.id}
                                  disabled={!values.hasStorageSpace}
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
                                numberProps={{
                                  decimalScale: 3,
                                }}
                                disabled={!values.hasStorageSpace}
                                required={values.hasStorageSpace}
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <FormControl fullWidth size="small">
                                <Field.Autocomplete
                                  name="height.unit"
                                  options={DEFAULT_UNITS}
                                  getOptionLabel={(opt) => opt?.name}
                                  getOptionValue={(opt) => opt?.id}
                                  disabled={!values.hasStorageSpace}
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
                                numberProps={{
                                  decimalScale: 3,
                                }}
                                disabled={!values.hasStorageSpace}
                                required={values.hasStorageSpace}
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <FormControl fullWidth size="small">
                                <Field.Autocomplete
                                  name="weight.unit"
                                  options={WEIGHT_UNITS}
                                  getOptionLabel={(opt) => opt?.name}
                                  getOptionValue={(opt) => opt?.id}
                                  disabled={!values.hasStorageSpace}
                                ></Field.Autocomplete>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>

                    {/* Tab 3 */}
                    <Box>
                      <Grid
                        container
                        rowSpacing={4 / 3}
                        columnSpacing={{ xl: 8, xs: 4 }}
                      >
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={
                              <Field.Checkbox
                                onChange={() => {
                                  setFieldValue('items', [
                                    { ...DEFAULT_DETAIL },
                                  ])
                                }}
                                name="hasItemDetail"
                              />
                            }
                            label={t('defineItem.isDetailed') + '?'}
                          />
                        </Grid>
                        {values?.hasItemDetail && (
                          <Grid item xs={12}>
                            <FieldArray
                              name="items"
                              render={(arrayHelpers) => (
                                <ItemsSettingTable
                                  items={values?.items || []}
                                  arrayHelpers={arrayHelpers}
                                />
                              )}
                            />
                          </Grid>
                        )}
                      </Grid>
                    </Box>
                  </Tabs>

                  {renderActionBar(handleReset)}
                </Form>
              )
            }}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefineItemForm
