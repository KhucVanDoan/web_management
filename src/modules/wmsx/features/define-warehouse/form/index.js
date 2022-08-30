import { useEffect } from 'react'

import { Grid, Typography, FormControl } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import {
  useHistory,
  useParams,
  useRouteMatch,
  useLocation,
} from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
  ASYNC_SEARCH_LIMIT,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { searchCompaniesApi } from '~/modules/database/redux/sagas/define-company/search-companies'
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'
import { DEFAULT_UNITS } from '~/modules/wmsx/constants'
import useDefineWarehouse from '~/modules/wmsx/redux/hooks/useDefineWarehouse'
import { searchWarehouseSettingApi } from '~/modules/wmsx/redux/sagas/warehouse-setting/search-warehouse-setting'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams } from '~/utils'
import qs from '~/utils/qs'

import { warehouseSchema } from './schema'

function DefineWarehouseFrom() {
  const { t } = useTranslation(['wmsx'])
  const { id } = useParams()
  const location = useLocation()
  const { cloneId } = qs.parse(location.search)
  const history = useHistory()
  const routeMatch = useRouteMatch()

  const {
    data: { warehouseDetails, isLoading },
    actions,
  } = useDefineWarehouse()

  const MODE_MAP = {
    [ROUTE.DEFINE_WAREHOUSE.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_WAREHOUSE.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]

  const isUpdate = mode === MODAL_MODE.UPDATE

  const handleSubmit = (values) => {
    const params = {
      ...values,
      factoryId: values?.factoryId?.id,
      companyId: values?.companyId?.id,
      warehouseTypeSettings: values?.warehouseTypeSettings?.map((i) => ({
        id: i?.id,
      })),
    }
    if (isUpdate) {
      actions.updateWarehouse({ ...params, id: Number(id) }, backToList)
    } else {
      actions.createWarehouse(params, backToList)
    }
  }

  const backToList = () => {
    history.push(ROUTE.DEFINE_WAREHOUSE.LIST.PATH)
  }

  useEffect(() => {
    if (isUpdate) {
      actions.getWarehouseDetailsById(id)
    }
    if (cloneId) {
      actions.getWarehouseDetailsById(cloneId)
    }
    return () => actions.resetWarehouseState()
  }, [id, cloneId])

  const initialValues = {
    code: isUpdate ? warehouseDetails?.code : '',
    name: warehouseDetails?.name || '',
    warehouseTypeSettings: warehouseDetails?.warehouseTypeSettings || [],
    companyId: warehouseDetails?.company || null,
    factoryId: warehouseDetails?.factory || null,
    location: warehouseDetails?.location || '',
    long: {
      value: warehouseDetails?.long?.value || null,
      unit: warehouseDetails?.long?.unit || 3,
    },
    width: {
      value: warehouseDetails?.width?.value || null,
      unit: warehouseDetails?.width?.unit || 3,
    },
    height: {
      value: warehouseDetails?.height?.value || null,
      unit: warehouseDetails?.height?.unit || 3,
    },
    description: warehouseDetails?.description || '',
  }

  const renderBreadcrumb = () => {
    const breadcrumb = [
      {
        title: ROUTE.WAREHOUSE_SETUP.TITLE,
      },
      {
        route: ROUTE.DEFINE_WAREHOUSE.LIST.PATH,
        title: ROUTE.DEFINE_WAREHOUSE.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_WAREHOUSE.CREATE.PATH,
          title: ROUTE.DEFINE_WAREHOUSE.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_WAREHOUSE.EDIT.PATH + `/${id}`,
          title: ROUTE.DEFINE_WAREHOUSE.EDIT.TITLE,
        })
        break
      default:
    }
    return breadcrumb
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.DEFINE_WAREHOUSE.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_WAREHOUSE.EDIT.TITLE
      default:
    }
  }

  const renderActionBar = (handleReset) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={() => {
              handleReset()
            }}
            mode={MODAL_MODE.CREATE}
          />
        )
      case MODAL_MODE.UPDATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={() => {
              handleReset()
            }}
            mode={MODAL_MODE.UPDATE}
          />
        )
      default:
        break
    }
  }

  return (
    <Page
      breadcrumbs={renderBreadcrumb()}
      title={t(`menu.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={warehouseSchema(t)}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ handleReset, values, setFieldValue }) => (
              <Form>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="code"
                      label={t('defineWarehouse.code')}
                      placeholder={t('defineWarehouse.code')}
                      disabled={isUpdate}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('defineWarehouse.name')}
                      placeholder={t('defineWarehouse.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="warehouseTypeSettings"
                      label={t('defineWarehouse.type')}
                      placeholder={t('defineWarehouse.type')}
                      asyncRequest={(s) =>
                        searchWarehouseSettingApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      multiple
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="companyId"
                      label={t('defineWarehouse.company')}
                      placeholder={t('defineWarehouse.company')}
                      asyncRequest={(s) =>
                        searchCompaniesApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.name}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      onChange={() => setFieldValue('factoryId', null)}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="factoryId"
                      label={t('defineWarehouse.factory')}
                      placeholder={t('defineWarehouse.factory')}
                      asyncRequest={(s) =>
                        searchFactoriesApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            companyId: values?.companyId?.id,
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      asyncRequestDeps={values?.companyId}
                      getOptionLabel={(option) => option.name}
                      disabled={!values?.companyId}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="location"
                      label={t('defineWarehouse.address')}
                      placeholder={t('defineWarehouse.address')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('defineWarehouse.description')}
                      placeholder={t('defineWarehouse.description')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      multiline
                      rows={3}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h4" mt={1}>
                      {t('defineWarehouse.storageSpace')}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Grid container spacing={1} mb={4 / 3}>
                      <Grid item xs={8}>
                        <Field.TextField
                          name="long.value"
                          label={t('defineWarehouse.long')}
                          labelWidth={100}
                          placeholder={t('defineWarehouse.long')}
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
                          label={t('defineWarehouse.width')}
                          labelWidth={100}
                          placeholder={t('defineWarehouse.width')}
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
                          label={t('defineWarehouse.height')}
                          labelWidth={100}
                          placeholder={t('defineWarehouse.height')}
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
                  </Grid>
                </Grid>
                {renderActionBar(handleReset)}
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefineWarehouseFrom
