import React, { useEffect } from 'react'

import { Grid, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { isNil } from 'lodash'
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
import useDefineTypeUnit from '~/modules/wmsx/redux/hooks/useDefineTypeUnit'
import { ROUTE } from '~/modules/wmsx/routes/config'

import defineTypeUnitSchema from './schema'

const DefineTypeUnitForm = () => {
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { t } = useTranslation(['wmsx'])
  const MODE_MAP = {
    [ROUTE.TYPE_UNIT.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.TYPE_UNIT.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const {
    data: { isLoading, typeUnitsDetails },
    actions,
  } = useDefineTypeUnit()
  const initialValues = {
    code: typeUnitsDetails?.code || '',
    name: typeUnitsDetails?.name || '',
    description: typeUnitsDetails?.description || '',
  }
  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      actions.getTypeUnitDetailsById(id)
    }
    return () => actions.resetTypeUnitState()
  }, [mode])

  const onSubmit = (values) => {
    const convertValue = { ...values, customFields: [] }
    if (mode === MODAL_MODE.CREATE) {
      actions.createTypeUnit(convertValue, backToList)
    } else {
      actions.updateTypeUnit({ ...convertValue, id: +id }, backToList)
    }
  }
  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: ROUTE.RENT_WAREHOUSE_COST_MANAGEMENT.TITLE,
      },
      {
        route: ROUTE.TYPE_UNIT.LIST.PATH,
        title: ROUTE.TYPE_UNIT.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.TYPE_UNIT.CREATE.PATH,
          title: ROUTE.TYPE_UNIT.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.TYPE_UNIT.EDIT.PATH,
          title: ROUTE.TYPE_UNIT.EDIT.TITLE,
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
        return ROUTE.TYPE_UNIT.CREATE.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.TYPE_UNIT.DETAIL.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.TYPE_UNIT.EDIT.TITLE
      default:
    }
  }
  const backToList = () => {
    history.push(ROUTE.TYPE_UNIT.LIST.PATH)
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
        validationSchema={defineTypeUnitSchema(t)}
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
                  {!isNil(typeUnitsDetails?.status) && isUpdate && (
                    <Grid item xs={12}>
                      <LV
                        label={
                          <Typography>{t('defineTypeUnit.status')}</Typography>
                        }
                        value={
                          <Status
                            options={DEFINE_TYPE_UNIT_OPTIONS}
                            value={typeUnitsDetails?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('defineTypeUnit.code')}
                      name="code"
                      placeholder={t('defineTypeUnit.code')}
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
                      label={t('defineTypeUnit.name')}
                      name="name"
                      placeholder={t('defineTypeUnit.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('defineTypeUnit.description')}
                      placeholder={t('defineTypeUnit.description')}
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

export default DefineTypeUnitForm
