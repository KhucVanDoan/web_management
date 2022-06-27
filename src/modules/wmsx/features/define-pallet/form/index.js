import React, { useEffect, useMemo, useState } from 'react'

import { Box, FormControl, FormControlLabel, Grid, Radio } from '@mui/material'
import { Formik, Form, FieldArray } from 'formik'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import Tabs from '~/components/Tabs'
import {
  DEFAULT_UNITS,
  PALLET_ITEM_STORAGE_TYPE,
  WEIGHT_UNITS,
} from '~/modules/wmsx/constants'
import useDefinePallet from '~/modules/wmsx/redux/hooks/useDefinePallet'
import { ROUTE } from '~/modules/wmsx/routes/config'

import PackageSettingTable from './packages-setting-table'
import ProductSettingTable from './products-setting-table'
import { definePalletSchema } from './schema'

const DEFAULT_ITEM = {
  itemId: null,
  quantity: 1,
}
const DEFAULT_PACKAGE = {
  packageId: null,
  quantity: 1,
}

const DefinePalletForm = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const params = useParams()
  const routeMatch = useRouteMatch()
  const {
    data: { isLoading, palletDetails },
    actions,
  } = useDefinePallet()
  const [palletType, setPalletType] = useState('0')

  const MODE_MAP = {
    [ROUTE.DEFINE_PALLET.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_PALLET.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = useMemo(
    () => ({
      name: palletDetails?.name || '',
      code: isUpdate ? palletDetails?.code : '',
      description: palletDetails?.description || '',
      type: palletDetails?.type?.toString() || '0',
      long: {
        value: palletDetails?.long?.value || null,
        unit: palletDetails?.long?.unit || 3,
      },
      width: {
        value: palletDetails?.width?.value || null,
        unit: palletDetails?.width?.unit || 3,
      },
      height: {
        value: palletDetails?.height?.value || null,
        unit: palletDetails?.height?.unit || 3,
      },
      weightLoad: {
        value: palletDetails?.weightLoad?.value || null,
        unit: palletDetails?.weightLoad?.unit || 1,
      },
      packages:
        palletDetails?.type === PALLET_ITEM_STORAGE_TYPE.GROUP
          ? palletDetails?.palletDetails?.map((p) => ({
              packageId: p?.package?.id,
              quantity: p?.quantity,
            }))
          : [{ ...DEFAULT_PACKAGE }],
      items:
        palletDetails?.type === PALLET_ITEM_STORAGE_TYPE.SINGLE
          ? palletDetails?.palletDetails?.map((p) => ({
              itemId: p?.item,
              quantity: p?.quantity,
            }))
          : [{ ...DEFAULT_ITEM }],
    }),
    [palletDetails, isUpdate],
  )

  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      const id = params?.id
      actions.getPalletDetailById(id)
    }
    return () => {
      actions.resetPalletDetailsState()
    }
  }, [params?.id])

  const onSubmit = (values) => {
    const id = Number(params?.id)
    const convertValues = {
      ...values,
      id,
      type: Number(values.type),
      palletDetails:
        Number(values.type) === PALLET_ITEM_STORAGE_TYPE.GROUP
          ? values?.packages
          : values?.items?.map((i) => ({
              itemId: i?.itemId?.id,
              quantity: i?.quantity,
            })),
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createPallet(convertValues, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updatePallet(convertValues, backToList)
    }
  }

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'defineCategory',
      },
      {
        route: ROUTE.DEFINE_PALLET.LIST.PATH,
        title: ROUTE.DEFINE_PALLET.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_PALLET.CREATE.PATH,
          title: ROUTE.DEFINE_PALLET.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_PALLET.EDIT.PATH,
          title: ROUTE.DEFINE_PALLET.EDIT.TITLE,
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
        return ROUTE.DEFINE_PALLET.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_PALLET.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.DEFINE_PALLET.LIST.PATH)
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
            validationSchema={definePalletSchema(t, palletType)}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ handleReset, values }) => (
              <Form>
                <Tabs
                  list={[
                    t('definePallet.commonInfo'),
                    t('definePallet.storageSpace'),
                    t('definePallet.itemStorageType'),
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
                          label={t('definePallet.code')}
                          name="code"
                          placeholder={t('definePallet.code')}
                          inputProps={{
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_12.MAX,
                          }}
                          disabled={isUpdate}
                          required
                          allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          name="name"
                          label={t('definePallet.name')}
                          placeholder={t('definePallet.name')}
                          inputProps={{
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                          }}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field.TextField
                          name="description"
                          label={t('definePallet.description')}
                          placeholder={t('definePallet.description')}
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
                      <Grid item lg={6} xs={12}>
                        <Grid container spacing={1} mb={4 / 3}>
                          <Grid item xs={8}>
                            <Field.TextField
                              name="long.value"
                              label={t('definePallet.long')}
                              labelWidth={100}
                              placeholder={t('definePallet.long')}
                              numberProps={{
                                decimalScale: 3,
                              }}
                              required
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl fullWidth size="small">
                              <Field.Autocomplete
                                name="long.unit"
                                options={DEFAULT_UNITS}
                                getOptionLabel={(opt) => opt?.name}
                                getOptionValue={(opt) => opt?.id}
                                disableClearable
                              />
                            </FormControl>
                          </Grid>
                        </Grid>

                        <Grid container spacing={1}>
                          <Grid item xs={8}>
                            <Field.TextField
                              name="width.value"
                              label={t('definePallet.width')}
                              labelWidth={100}
                              placeholder={t('definePallet.width')}
                              numberProps={{
                                decimalScale: 3,
                              }}
                              required
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl fullWidth size="small">
                              <Field.Autocomplete
                                name="width.unit"
                                options={DEFAULT_UNITS}
                                getOptionLabel={(opt) => opt?.name}
                                getOptionValue={(opt) => opt?.id}
                                disableClearable
                              />
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item lg={6} xs={12}>
                        <Grid container spacing={1} mb={4 / 3}>
                          <Grid item xs={8}>
                            <Field.TextField
                              name="height.value"
                              label={t('definePallet.height')}
                              labelWidth={100}
                              placeholder={t('definePallet.height')}
                              numberProps={{
                                decimalScale: 3,
                              }}
                              required
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl fullWidth size="small">
                              <Field.Autocomplete
                                name="height.unit"
                                options={DEFAULT_UNITS}
                                getOptionLabel={(opt) => opt?.name}
                                getOptionValue={(opt) => opt?.id}
                                disableClearable
                              />
                            </FormControl>
                          </Grid>
                        </Grid>

                        <Grid container spacing={1}>
                          <Grid item xs={8}>
                            <Field.TextField
                              name="weightLoad.value"
                              label={t('definePallet.weight')}
                              labelWidth={100}
                              placeholder={t('definePallet.weight')}
                              numberProps={{
                                decimalScale: 3,
                              }}
                              required
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl fullWidth size="small">
                              <Field.Autocomplete
                                name="weightLoad.unit"
                                options={WEIGHT_UNITS}
                                getOptionLabel={(opt) => opt?.name}
                                getOptionValue={(opt) => opt?.id}
                                disableClearable
                              />
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
                      <Grid item xs={12} lg={6}>
                        <Field.RadioGroup name="type">
                          <FormControlLabel
                            value="0"
                            control={<Radio />}
                            label={t('definePallet.palletGroupItem')}
                            onChange={(e) => setPalletType(e.target.value)}
                          />
                          <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label={t('definePallet.palletSingleItem')}
                            onChange={(e) => setPalletType(e.target.value)}
                          />
                        </Field.RadioGroup>
                      </Grid>
                      <Grid item xs={12}>
                        {Number(values.type) ===
                        PALLET_ITEM_STORAGE_TYPE.GROUP ? (
                          <FieldArray
                            name="packages"
                            render={(arrayHelpers) => (
                              <PackageSettingTable
                                items={values?.packages || []}
                                arrayHelpers={arrayHelpers}
                              />
                            )}
                          />
                        ) : (
                          <FieldArray
                            name="items"
                            render={(arrayHelpers) => (
                              <ProductSettingTable
                                items={values?.items || []}
                                arrayHelpers={arrayHelpers}
                              />
                            )}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </Tabs>
                {renderActionBar(handleReset)}
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefinePalletForm
