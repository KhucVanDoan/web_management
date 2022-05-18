import React, { useEffect, useMemo } from 'react'

import { Box, FormControl, Grid } from '@mui/material'
import { Formik, Form, FieldArray } from 'formik'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

import {
  CODE_SETTINGS,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import Tabs from '~/components/Tabs'
import { DEFAULT_UNITS, WEIGHT_UNITS } from '~/modules/wmsx/constants'
import useDefinePackage from '~/modules/wmsx/redux/hooks/useDefinePackage'
import { ROUTE } from '~/modules/wmsx/routes/config'

import ItemsSettingTable from './items-setting-table'
import { definePackageSchema } from './schema'

const DEFAULT_ITEM = {
  itemId: null,
  quantity: 1,
}
const DefinePackageForm = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const params = useParams()
  const routeMatch = useRouteMatch()
  const {
    data: { isLoading, packageDetails },
    actions,
  } = useDefinePackage()

  const MODE_MAP = {
    [ROUTE.DEFINE_PACKAGE.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_PACKAGE.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = useMemo(
    () => ({
      name: packageDetails?.name || '',
      code: isUpdate ? packageDetails?.code : CODE_SETTINGS.PACKAGE.PREFIX,
      description: packageDetails?.description || '',

      long: {
        value: packageDetails?.long?.value || 1,
        unit: packageDetails?.long?.unit || 3,
      },
      width: {
        value: packageDetails?.width?.value || 1,
        unit: packageDetails?.width?.unit || 3,
      },
      height: {
        value: packageDetails?.height?.value || 1,
        unit: packageDetails?.height?.unit || 3,
      },
      weight: {
        value: packageDetails?.weight?.value || 1,
        unit: packageDetails?.weight?.unit || 1,
      },
      items: packageDetails?.packageItems?.map((p) => ({
        itemId: p.item,
        quantity: p.quantity,
      })) || [{ ...DEFAULT_ITEM }],
    }),
    [packageDetails, isUpdate],
  )

  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      const id = params?.id
      actions.getPackageDetailsById(id)
    }
    return () => {
      if (isUpdate) actions.resetPackageDetailsState()
    }
  }, [params?.id])

  const onSubmit = (values) => {
    const id = Number(params?.id)

    const convertValues = {
      ...values,
      id,
      packageItems: values.items.map((item) => ({
        itemId: item.itemId?.id,
        quantity: item.quantity,
      })),
    }

    if (mode === MODAL_MODE.CREATE) {
      actions.createPackage(convertValues, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updatePackage(convertValues, backToList)
    }
  }

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'defineCategory',
      },
      {
        route: ROUTE.DEFINE_PACKAGE.LIST.PATH,
        title: ROUTE.DEFINE_PACKAGE.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_PACKAGE.CREATE.PATH,
          title: ROUTE.DEFINE_PACKAGE.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_PACKAGE.EDIT.PATH,
          title: ROUTE.DEFINE_PACKAGE.EDIT.TITLE,
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
        return ROUTE.DEFINE_PACKAGE.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_PACKAGE.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.DEFINE_PACKAGE.LIST.PATH)
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
            validationSchema={definePackageSchema(t)}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ handleReset, setFieldValue, values }) => (
              <Form>
                <Tabs
                  list={[
                    t('definePackage.commonInfo'),
                    t('definePackage.storage'),
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
                          label={t('definePackage.code')}
                          name="code"
                          placeholder={t('definePackage.code')}
                          inputProps={{
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_12.MAX,
                          }}
                          disabled={isUpdate}
                          required
                          allow={TEXTFIELD_ALLOW.NUMERIC}
                          onInput={(val) => {
                            if (
                              val?.indexOf(CODE_SETTINGS.PACKAGE.PREFIX) !== 0
                            ) {
                              return
                            }
                            setFieldValue('code', val)
                          }}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          name="name"
                          label={t('definePackage.name')}
                          placeholder={t('definePackage.name')}
                          inputProps={{
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                          }}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field.TextField
                          name="description"
                          label={t('definePackage.description')}
                          placeholder={t('definePackage.description')}
                          inputProps={{
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                          }}
                          multiline
                          rows={3}
                        />
                      </Grid>
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
                              label={t('definePackage.long')}
                              labelWidth={100}
                              placeholder={t('definePackage.long')}
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
                              ></Field.Autocomplete>
                            </FormControl>
                          </Grid>
                        </Grid>

                        <Grid container spacing={1}>
                          <Grid item xs={8}>
                            <Field.TextField
                              name="width.value"
                              label={t('definePackage.width')}
                              labelWidth={100}
                              placeholder={t('definePackage.width')}
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
                              label={t('definePackage.height')}
                              labelWidth={100}
                              placeholder={t('definePackage.height')}
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
                              ></Field.Autocomplete>
                            </FormControl>
                          </Grid>
                        </Grid>

                        <Grid container spacing={1}>
                          <Grid item xs={8}>
                            <Field.TextField
                              name="weight.value"
                              label={t('definePackage.weight')}
                              labelWidth={100}
                              placeholder={t('definePackage.weight')}
                              numberProps={{
                                decimalScale: 3,
                              }}
                              required
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl fullWidth size="small">
                              <Field.Autocomplete
                                name="weight.unit"
                                options={WEIGHT_UNITS}
                                getOptionLabel={(opt) => opt?.name}
                                getOptionValue={(opt) => opt?.id}
                              ></Field.Autocomplete>
                            </FormControl>
                          </Grid>
                        </Grid>
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

export default DefinePackageForm
