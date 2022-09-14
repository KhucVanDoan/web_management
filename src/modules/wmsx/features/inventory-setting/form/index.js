import React, { useEffect, useMemo } from 'react'

import { Grid } from '@mui/material'
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
import useInventorySetting from '~/modules/wmsx/redux/hooks/useInventorySetting'
import { searchCompaniesApi } from '~/modules/wmsx/redux/sagas/company-management/search-companies'
import { searchWarehouseApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouse'
import { ROUTE } from '~/modules/wmsx/routes/config'

import { formSchema } from './schema'

function InventorySettingForm() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()

  const {
    data: { isLoading, iventorySettingDetail },
    actions,
  } = useInventorySetting()

  const MODE_MAP = {
    [ROUTE.INVENTORY_SETTING.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.INVENTORY_SETTING.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = useMemo(
    () => ({
      warehouse: iventorySettingDetail?.warehouse || null,
      item: iventorySettingDetail?.item || null,
      unit: '',
      inventoryLimit: iventorySettingDetail?.inventoryLimit || 0,
      minInventoryLimit: iventorySettingDetail?.minInventoryLimit || 0,
      maxInventoryLimit: iventorySettingDetail?.maxInventoryLimit || 0,
    }),
    [iventorySettingDetail],
  )

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: ROUTE.WAREHOUSE_MANAGEMENT.TITLE,
      },
      {
        route: ROUTE.INVENTORY_SETTING.LIST.PATH,
        title: ROUTE.INVENTORY_SETTING.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.INVENTORY_SETTING.CREATE.PATH,
          title: ROUTE.INVENTORY_SETTING.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.INVENTORY_SETTING.EDIT.PATH,
          title: ROUTE.INVENTORY_SETTING.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    if (isUpdate) {
      actions.getDetailInventorySettingById(id)
    }
    return () => {
      actions.resetInventorySettingState()
    }
  }, [id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.INVENTORY_SETTING.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.INVENTORY_SETTING.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.INVENTORY_SETTING.LIST.PATH)
  }

  const onSubmit = (values) => {
    const convertValues = {
      id: Number(id),
      ...values,
      itemId: values?.item?.id,
      warehouseId: values?.warehouse?.id,
      inventoryLimit: Number(values?.inventoryLimit),
      minInventoryLimit: Number(values?.minInventoryLimit),
      maxInventoryLimit: Number(values?.maxInventoryLimit),
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createInventorySetting(convertValues, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updateInventorySetting(convertValues, backToList)
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
                      label={t('inventorySetting.warehouseCode')}
                      placeholder={t('inventorySetting.warehouseCode')}
                      asyncRequest={(s) =>
                        searchWarehouseApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="warehouse.name"
                      label={t('inventorySetting.warehouseName')}
                      placeholder={t('inventorySetting.warehouseName')}
                      disabled
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="item"
                      label={t('inventorySetting.itemCode')}
                      placeholder={t('inventorySetting.itemCode')}
                      asyncRequest={(s) =>
                        //@TODO update api
                        searchCompaniesApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="item.name"
                      label={t('inventorySetting.itemName')}
                      placeholder={t('inventorySetting.itemName')}
                      disabled
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="unit"
                      label={t('inventorySetting.unit')}
                      placeholder={t('inventorySetting.unit')}
                      disabled
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="inventoryLimit"
                      label={t('inventorySetting.inventoryLimit')}
                      placeholder={t('inventorySetting.inventoryLimit')}
                      type="number"
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="minInventoryLimit"
                      label={t('inventorySetting.minInventoryLimit')}
                      placeholder={t('inventorySetting.minInventoryLimit')}
                      type="number"
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="maxInventoryLimit"
                      label={t('inventorySetting.maxInventoryLimit')}
                      placeholder={t('inventorySetting.maxInventoryLimit')}
                      type="number"
                      allow={TEXTFIELD_ALLOW.NUMERIC}
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

export default InventorySettingForm