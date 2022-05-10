import { useEffect } from 'react'

import { Grid, InputAdornment } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useRouteMatch, useHistory, useParams } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { searchItemsApi } from '~/modules/mesx/redux/sagas/define-item/search-items'
import useInventoryLimit from '~/modules/wmsx/redux/hooks/useInvetoryLimit'
import { ROUTE } from '~/modules/wmsx/routes/config'

import { validationSchema } from './schema'

function InventoryLimitForm() {
  const { t } = useTranslation(['wmsx'])
  const { id } = useParams()
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const {
    data: { isLoading, inventoryLimitDetails },
    actions,
  } = useInventoryLimit()
  const MODE_MAP = {
    [ROUTE.INVENTORY_LIMIT.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.INVENTORY_LIMIT.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]

  const isUpdate = mode === MODAL_MODE.UPDATE
  const backToList = () => {
    history.push(ROUTE.INVENTORY_LIMIT.LIST.PATH)
  }

  useEffect(() => {
    if (isUpdate) {
      actions.getInventoryLimitDetailsById(id)
    }
    return () => actions.resetInventoryLimitState()
  }, [id])

  const initialValues = {
    itemCode: inventoryLimitDetails?.item || null,
    itemName: inventoryLimitDetails?.item?.name || '',
    itemUnit: inventoryLimitDetails?.item?.itemUnit?.name || '',
    itemType: inventoryLimitDetails?.item?.itemType?.name || '',
    minInventoryLimit: Number(inventoryLimitDetails?.minInventoryLimit) || null,
    maxInventoryLimit: Number(inventoryLimitDetails?.maxInventoryLimit) || null,
    inventoryLimit: Number(inventoryLimitDetails?.inventoryLimit) || null,
    expiryWarehouse: Number(inventoryLimitDetails?.expiryWarehouse) || null,
    expiryWarningWarehouse:
      Number(inventoryLimitDetails?.expiryWarningWarehouse) || null,
    // @TODO: <linh.taquang> wait field confirm
    durationLife: null,
    shelfLifeWarning: null,
  }

  const handleSubmit = (value) => {
    const params = {
      ...value,
      itemId: value?.itemCode?.id,
    }
    if (isUpdate) {
      actions.updateInventoryLimit({ id: Number(id), ...params }, backToList)
    } else {
      actions.createInventoryLimit(params, backToList)
    }
  }

  const handleChangeItem = (val, setFieldValue) => {
    setFieldValue('itemName', val?.name)
    setFieldValue('itemUnit', val?.itemUnit?.name)
    setFieldValue('itemType', val?.itemType?.name)
  }

  const renderBreadcrumb = () => {
    const breadcrumb = [
      {
        title: ROUTE.WAREHOUSE_SETUP.TITLE,
      },
      {
        route: ROUTE.INVENTORY_LIMIT.LIST.PATH,
        title: ROUTE.INVENTORY_LIMIT.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.INVENTORY_LIMIT.CREATE.PATH,
          title: ROUTE.INVENTORY_LIMIT.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.INVENTORY_LIMIT.EDIT.PATH + `/${id}`,
          title: ROUTE.INVENTORY_LIMIT.EDIT.TITLE,
        })
        break
      default:
    }
    return breadcrumb
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.INVENTORY_LIMIT.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.INVENTORY_LIMIT.EDIT.TITLE
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
            validationSchema={validationSchema(t)}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ handleReset, setFieldValue }) => (
              <Form>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="itemCode"
                      label={t('inventoryLimit.itemCode')}
                      placeholder={t('inventoryLimit.itemCode')}
                      asyncRequest={(s) =>
                        searchItemsApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          inventoryNorms: true,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                      onChange={(val) => handleChangeItem(val, setFieldValue)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="itemName"
                      label={t('inventoryLimit.itemName')}
                      placeholder={t('inventoryLimit.itemName')}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="itemUnit"
                      label={t('inventoryLimit.itenUnit')}
                      placeholder={t('inventoryLimit.itenUnit')}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="itemType"
                      label={t('inventoryLimit.itemType')}
                      placeholder={t('inventoryLimit.itemType')}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="minInventoryLimit"
                      label={t('inventoryLimit.inventoryLimitDown')}
                      placeholder={t('inventoryLimit.inventoryLimitDown')}
                      type="number"
                      allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
                      required
                    />
                    <Field.TextField
                      name="maxInventoryLimit"
                      label={t('inventoryLimit.inventoryLimitUp')}
                      placeholder={t('inventoryLimit.inventoryLimitUp')}
                      type="number"
                      allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
                      sx={{ mt: 4 / 3 }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="inventoryLimit"
                      label={t('inventoryLimit.inventoryLimit')}
                      placeholder={t('inventoryLimit.inventoryLimit')}
                      sx={{ mt: 16 / 3 }}
                      type="number"
                      allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="expiryWarehouse"
                      label={t('inventoryLimit.durationStorage')}
                      placeholder={t('inventoryLimit.durationStorage')}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                            {t('general:days')}
                          </InputAdornment>
                        ),
                      }}
                      type="number"
                      allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="expiryWarningWarehouse"
                      label={t('inventoryLimit.warningStorage')}
                      placeholder={t('inventoryLimit.warningStorage')}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                            {t('general:days')}
                          </InputAdornment>
                        ),
                      }}
                      type="number"
                      allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="durationLife"
                      label={t('inventoryLimit.durationLife')}
                      placeholder={t('inventoryLimit.durationLife')}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                            {t('general:days')}
                          </InputAdornment>
                        ),
                      }}
                      type="number"
                      allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="shelfLifeWarning"
                      label={t('inventoryLimit.shelfLifeWarning')}
                      placeholder={t('inventoryLimit.shelfLifeWarning')}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                            {t('general:days')}
                          </InputAdornment>
                        ),
                      }}
                      type="number"
                      allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
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

export default InventoryLimitForm
