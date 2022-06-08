import React, { useEffect } from 'react'

import { Grid, Typography } from '@mui/material'
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
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { DEFINE_TYPE_UNIT_OPTIONS } from '~/modules/wmsx/constants'
import useDefineTypeService from '~/modules/wmsx/redux/hooks/useDefineTypeService'
import { ROUTE } from '~/modules/wmsx/routes/config'

import defineTypeServiceSchema from './schema'

const DefineTypeServiceForm = () => {
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { t } = useTranslation(['wmsx'])
  const MODE_MAP = {
    [ROUTE.TYPE_SERVICE.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.TYPE_SERVICE.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const {
    data: { isLoading, typeServicesDetails },
    actions,
  } = useDefineTypeService()
  const initialValues = {
    code: typeServicesDetails?.code || '',
    name: typeServicesDetails?.name || '',
    description: typeServicesDetails?.description || '',
  }
  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      actions.getTypeServiceDetailsById(id)
    }
    return () => actions.resetTypeServiceState()
  }, [mode])

  const onSubmit = (values) => {
    const convertValue = { ...values, customFields: [] }
    if (mode === MODAL_MODE.CREATE) {
      actions.createTypeService(convertValue, backToList)
    } else {
      actions.updateTypeService({ ...convertValue, id: +id }, backToList)
    }
  }
  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: ROUTE.RENT_WAREHOUSE_COST_MANAGEMENT.TITLE,
      },
      {
        route: ROUTE.TYPE_SERVICE.LIST.PATH,
        title: ROUTE.TYPE_SERVICE.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.TYPE_SERVICE.CREATE.PATH,
          title: ROUTE.TYPE_SERVICE.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.TYPE_SERVICE.EDIT.PATH,
          title: ROUTE.TYPE_SERVICE.EDIT.TITLE,
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
        return ROUTE.TYPE_SERVICE.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.TYPE_SERVICE.EDIT.TITLE
      default:
    }
  }
  const backToList = () => {
    history.push(ROUTE.TYPE_SERVICE.LIST.PATH)
  }
  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t(`defineTypeService.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={defineTypeServiceSchema(t)}
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
                  {isUpdate && (
                    <Grid item xs={12}>
                      <LV
                        label={
                          <Typography>
                            {t('defineTypeService.status')}
                          </Typography>
                        }
                        value={
                          <Status
                            options={DEFINE_TYPE_UNIT_OPTIONS}
                            value={typeServicesDetails?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('defineTypeService.code')}
                      name="code"
                      placeholder={t('defineTypeService.code')}
                      disabled={isUpdate}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_10.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('defineTypeService.name')}
                      name="name"
                      placeholder={t('defineTypeService.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('defineTypeService.description')}
                      placeholder={t('defineTypeService.description')}
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

export default DefineTypeServiceForm
