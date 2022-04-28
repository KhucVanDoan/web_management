import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useParams, useRouteMatch, useHistory } from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { useWarehouseSetting } from '~/modules/wmsx/redux/hooks/useWarehouseSetting'
import { ROUTE } from '~/modules/wmsx/routes/config'

import warehouseSettingSchema from './schema'

const WarehouseSettingForm = () => {
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { t } = useTranslation(['wmsx'])
  const MODE_MAP = {
    [ROUTE.WAREHOUSE_SETTING.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.WAREHOUSE_SETTING.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const {
    data: { warehouseSettingDetails, isLoading },
    actions,
  } = useWarehouseSetting()
  const initialValues = {
    code: warehouseSettingDetails?.code || '',
    name: warehouseSettingDetails?.name || '',
    description: warehouseSettingDetails?.description || '',
  }
  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      actions.getWarehouseSettingDetailsById(id)
    }
    return () => actions.resetWarehouseSettingState()
  }, [mode])

  const onSubmit = (values) => {
    const params = {
      code: values?.code,
      name: values?.name,
      description: values?.description || '',
    }

    if (mode === MODAL_MODE.CREATE) {
      actions.createWarehouseSetting(params, backToList)
    } else {
      params.id = +id
      actions.updateWarehouseSetting(params, backToList)
    }
  }
  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'warehouseSetup',
      },
      {
        route: ROUTE.WAREHOUSE_SETTING.LIST.PATH,
        title: ROUTE.WAREHOUSE_SETTING.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.WAREHOUSE_SETTING.CREATE.PATH,
          title: ROUTE.WAREHOUSE_SETTING.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.WAREHOUSE_SETTING.EDIT.PATH,
          title: ROUTE.WAREHOUSE_SETTING.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
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
  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.WAREHOUSE_SETTING.CREATE.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.WAREHOUSE_SETTING.DETAIL.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.WAREHOUSE_SETTING.EDIT.TITLE
      default:
    }
  }
  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_SETTING.LIST.PATH)
  }
  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t(`menu.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={warehouseSettingSchema(t)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset }) => (
          <Form>
            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  columnSpacing={{ xl: 8, xs: 4 }}
                  rowSpacing={4 / 3}
                >
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('warehouseSetting.code')}
                      name="code"
                      placeholder={t('warehouseSetting.code')}
                      disabled={isUpdate}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_4.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('warehouseSetting.name')}
                      name="name"
                      placeholder={t('warehouseSetting.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('warehouseSetting.description')}
                      placeholder={t('warehouseSetting.description')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {renderActionBar(handleReset)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default WarehouseSettingForm
