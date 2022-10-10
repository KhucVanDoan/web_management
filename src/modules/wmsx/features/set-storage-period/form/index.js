import React, { useEffect, useMemo } from 'react'

import { Grid, InputAdornment } from '@mui/material'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { ACTIVE_STATUS } from '~/modules/wmsx/constants'
import useSetStoragePeriod from '~/modules/wmsx/redux/hooks/useSetStoragePeriod'
import { searchWarehouseApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouse'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams } from '~/utils'

import { formSchema } from './schema'

function SetStoragePeriodForm() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const params = useParams()
  const routeMatch = useRouteMatch()

  const {
    data: { isLoading, storagePeriodDetails },
    actions,
  } = useSetStoragePeriod()

  const MODE_MAP = {
    [ROUTE.SET_STORAGE_PERIOD.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.SET_STORAGE_PERIOD.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = useMemo(
    () => ({
      warehouse: storagePeriodDetails?.warehouse || null,
      expiryWarehouse: storagePeriodDetails?.expiryWarehouse || 365,
      expiryWarningWarehouse: storagePeriodDetails?.expiryWarningWarehouse || 0,
    }),
    [storagePeriodDetails],
  )

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: ROUTE.WAREHOUSE_MANAGEMENT.TITLE,
      },
      {
        route: ROUTE.SET_STORAGE_PERIOD.LIST.PATH,
        title: ROUTE.SET_STORAGE_PERIOD.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.SET_STORAGE_PERIOD.CREATE.PATH,
          title: ROUTE.SET_STORAGE_PERIOD.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.SET_STORAGE_PERIOD.EDIT.PATH,
          title: ROUTE.SET_STORAGE_PERIOD.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    if (isUpdate) {
      const id = params?.id
      actions.getStoragePeriodDetailsById(id)
    }
    return () => {
      actions.resetStoragePeriodDetailsState()
    }
  }, [params?.id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.SET_STORAGE_PERIOD.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.SET_STORAGE_PERIOD.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.SET_STORAGE_PERIOD.LIST.PATH)
  }

  const onSubmit = (values) => {
    const id = Number(params?.id)
    const convertValues = {
      id,
      ...values,
      warehouseId: values?.warehouse?.id,
      expiryWarehouse: Number(values?.expiryWarehouse),
      expiryWarningWarehouse: Number(values?.expiryWarningWarehouse),
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createStoragePeriod(convertValues, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updateStoragePeriod(convertValues, backToList)
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
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="warehouse"
                      label={t('setStoragePeriod.warehouseCode')}
                      placeholder={t('setStoragePeriod.warehouseCode')}
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
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                      required
                      disabled={isUpdate}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="warehouse.name"
                      label={t('setStoragePeriod.warehouseName')}
                      placeholder={t('setStoragePeriod.warehouseName')}
                      disabled
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="expiryWarehouse"
                      label={t('setStoragePeriod.storageLimitTitle')}
                      placeholder={t('setStoragePeriod.storageLimitTitle')}
                      type="number"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                            {t('general:days')}
                          </InputAdornment>
                        ),
                      }}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="expiryWarningWarehouse"
                      label={t('setStoragePeriod.warningPeriodTitle')}
                      placeholder={t('setStoragePeriod.warningPeriodTitle')}
                      type="number"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                            {t('general:days')}
                          </InputAdornment>
                        ),
                      }}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      required
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

export default SetStoragePeriodForm
