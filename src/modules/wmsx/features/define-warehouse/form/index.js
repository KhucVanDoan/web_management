import React, { useEffect, useMemo } from 'react'

import { Grid, Typography } from '@mui/material'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

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
  ACTIVE_STATUS_OPTIONS,
  WAREHOUSE_LOT_TYPE_OPTIONS,
  WAREHOUSE_NATURE_OPTIONS,
  WAREHOUSE_TYPE_OPTIONS,
} from '~/modules/wmsx/constants'
import useDefineWarehouse from '~/modules/wmsx/redux/hooks/useDefineWarehouse'
import { searchCompaniesApi } from '~/modules/wmsx/redux/sagas/company-management/search-companies'
import { ROUTE } from '~/modules/wmsx/routes/config'

import { formSchema } from './schema'

function DefineWarehouseForm() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()

  const {
    data: { isLoading, warehouseDetails },
    actions,
  } = useDefineWarehouse()

  const MODE_MAP = {
    [ROUTE.DEFINE_WAREHOUSE.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_WAREHOUSE.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = useMemo(
    () => ({
      code: warehouseDetails?.code || '',
      name: warehouseDetails?.name || '',
      type: warehouseDetails?.type || '',
      companyCode: warehouseDetails?.company?.code || '',
      nature: warehouseDetails?.nature || '',
      lotManagement: '',
      description: warehouseDetails?.description || '',
    }),
    [warehouseDetails],
  )

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: ROUTE.WAREHOUSE_MANAGEMENT.TITLE,
      },
      {
        route: ROUTE.DEFINE_WAREHOUSE.LIST.PATH,
        title: ROUTE.DEFINE_WAREHOUSE.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_WAREHOUSE.CREATE.PATH,
          title: ROUTE.DEFINE_WAREHOUSE.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_WAREHOUSE.EDIT.PATH,
          title: ROUTE.DEFINE_WAREHOUSE.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    if (isUpdate) {
      actions.getWarehouseDetailsById(id)
    }
    return () => {
      actions.resetWarehouseDetailsState()
    }
  }, [id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.DEFINE_WAREHOUSE.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_WAREHOUSE.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.DEFINE_WAREHOUSE.LIST.PATH)
  }

  const onSubmit = (values) => {
    const convertValues = {
      ...values,
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createWarehouse(convertValues, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      const paramUpdate = {
        ...convertValues,
        id: +id,
      }
      actions.updateWarehouse(paramUpdate, backToList)
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
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={formSchema(t)}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ handleReset }) => (
              <Form>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  {isUpdate && (
                    <Grid item xs={12}>
                      <LV
                        label={
                          <Typography>{t('defineWarehouse.status')}</Typography>
                        }
                        value={
                          <Status
                            options={ACTIVE_STATUS_OPTIONS}
                            value={warehouseDetails?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="code"
                      label={t('defineWarehouse.code')}
                      placeholder={t('defineWarehouse.code')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      disabled={isUpdate}
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
                      name="companyCode"
                      label={t('defineWarehouse.companyCode')}
                      placeholder={t('defineWarehouse.companyCode')}
                      asyncRequest={(s) =>
                        searchCompaniesApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.name}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="type"
                      label={t('defineWarehouse.type')}
                      placeholder={t('defineWarehouse.type')}
                      options={WAREHOUSE_TYPE_OPTIONS}
                      getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
                      getOptionValue={(opt) => opt?.id?.toString()}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="nature"
                      label={t('defineWarehouse.nature')}
                      placeholder={t('defineWarehouse.nature')}
                      options={WAREHOUSE_NATURE_OPTIONS}
                      getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
                      getOptionValue={(opt) => opt?.id?.toString()}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="lotManagement"
                      label={t('defineWarehouse.lotManagement')}
                      placeholder={t('defineWarehouse.lotManagement')}
                      options={WAREHOUSE_LOT_TYPE_OPTIONS}
                      getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
                      getOptionValue={(opt) => opt?.id?.toString()}
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

export default DefineWarehouseForm
