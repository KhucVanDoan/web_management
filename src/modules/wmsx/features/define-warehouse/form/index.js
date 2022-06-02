import { useEffect, useState } from 'react'

import { Grid, Typography, InputAdornment } from '@mui/material'
import { Form, Formik } from 'formik'
import { isEmpty } from 'lodash'
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
import useDefineFactory from '~/modules/database/redux/hooks/useDefineFactory'
import { searchCompaniesApi } from '~/modules/database/redux/sagas/define-company/search-companies'
import useDefineWarehouse from '~/modules/wmsx/redux/hooks/useDefineWarehouse'
import { searchWarehouseSettingApi } from '~/modules/wmsx/redux/sagas/warehouse-setting/search-warehouse-setting'
import { ROUTE } from '~/modules/wmsx/routes/config'
import qs from '~/utils/qs'

import { warehouseSchema } from './schema'

function DefineWarehouseFrom() {
  const { t } = useTranslation(['wmsx'])
  const { id } = useParams()
  const location = useLocation()
  const { cloneId } = qs.parse(location.search)
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const [factories, setFactories] = useState([])
  const {
    data: { factoryList },
    actions: factoryAction,
  } = useDefineFactory()

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
      companyId: values?.companyId?.id,
      width: {
        value: values?.width,
        unit: 3,
      },
      height: {
        value: values?.height,
        unit: 3,
      },
      long: {
        value: values?.long,
        unit: 3,
      },
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
    factoryAction.searchFactories({ isGetAll: 1 })
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
    factoryId: warehouseDetails?.factoryId || null,
    location: warehouseDetails?.location || '',
    long: warehouseDetails?.long?.value || null,
    width: warehouseDetails?.width?.value || null,
    height: warehouseDetails?.height?.value || null,
    description: warehouseDetails?.description || '',
  }

  const handleChangeCompany = (val) => {
    const listFactory = factoryList?.filter(
      (item) => item?.companyId === val?.id,
    )
    setFactories(listFactory)
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
            {({ handleReset }) => (
              <Form>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  <Grid item xs={12} lg={6}>
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
                    <Field.TextField
                      name="name"
                      label={t('defineWarehouse.name')}
                      placeholder={t('defineWarehouse.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      sx={{ mt: 4 / 3 }}
                      required
                    />
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
                      asyncRequestHelper={(res) => res?.data}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                      sx={{ mt: 4 / 3 }}
                      multiple
                      required
                    />
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
                      getOptionSubLabel={(opt) => opt?.code}
                      onChange={(val) => handleChangeCompany(val)}
                      sx={{ mt: 4 / 3 }}
                      required
                    />
                    <Field.Autocomplete
                      name="factoryId"
                      label={t('defineWarehouse.factory')}
                      placeholder={t('defineWarehouse.factory')}
                      options={!isEmpty(factories) ? factories : factoryList}
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                      sx={{ mt: 4 / 3 }}
                      required
                    />
                    <Field.TextField
                      name="location"
                      label={t('defineWarehouse.address')}
                      placeholder={t('defineWarehouse.address')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                      }}
                      sx={{ mt: 4 / 3 }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant="h4">
                      {t('defineWarehouse.storageSpace')}
                    </Typography>
                    {/* @TODO: <linh.taquang> add select choose unit */}
                    <Field.TextField
                      name="long"
                      label={t('defineWarehouse.long')}
                      placeholder={t('defineWarehouse.long')}
                      sx={{ mt: 4 / 3 }}
                      type="number"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                            {t('defineWarehouse.unit.m')}
                          </InputAdornment>
                        ),
                      }}
                      allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
                      required
                    />
                    <Field.TextField
                      name="width"
                      label={t('defineWarehouse.wide')}
                      placeholder={t('defineWarehouse.wide')}
                      sx={{ mt: 4 / 3 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                            {t('defineWarehouse.unit.m')}
                          </InputAdornment>
                        ),
                      }}
                      allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
                      type="number"
                      required
                    />
                    <Field.TextField
                      name="height"
                      label={t('defineWarehouse.high')}
                      placeholder={t('defineWarehouse.high')}
                      sx={{ mt: 4 / 3 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                            {t('defineWarehouse.unit.m')}
                          </InputAdornment>
                        ),
                      }}
                      allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
                      type="number"
                      required
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
