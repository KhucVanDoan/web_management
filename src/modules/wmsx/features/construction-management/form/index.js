import React, { useEffect, useMemo } from 'react'

import { Grid, Typography } from '@mui/material'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

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
import { ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useConstructionManagement from '~/modules/wmsx/redux/hooks/useConstructionManagement'
import { ROUTE } from '~/modules/wmsx/routes/config'

import { formSchema } from './schema'

function ConstructionManagementForm() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const params = useParams()
  const routeMatch = useRouteMatch()

  const {
    data: { isLoading, constructionDetails },
    actions,
  } = useConstructionManagement()

  const MODE_MAP = {
    [ROUTE.CONSTRUCTION_MANAGEMENT.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.CONSTRUCTION_MANAGEMENT.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = useMemo(
    () => ({
      code: constructionDetails?.code || '',
      name: constructionDetails?.name || '',
      description: constructionDetails?.description || '',
    }),
    [constructionDetails],
  )

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'database',
      },
      {
        route: ROUTE.CONSTRUCTION_MANAGEMENT.LIST.PATH,
        title: ROUTE.CONSTRUCTION_MANAGEMENT.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.CONSTRUCTION_MANAGEMENT.CREATE.PATH,
          title: ROUTE.CONSTRUCTION_MANAGEMENT.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.CONSTRUCTION_MANAGEMENT.EDIT.PATH,
          title: ROUTE.CONSTRUCTION_MANAGEMENT.EDIT.TITLE,
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
      actions.getConstructionDetailsById(id)
    }
    return () => {
      actions.resetConstructionDetailsState()
    }
  }, [params?.id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.CONSTRUCTION_MANAGEMENT.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.CONSTRUCTION_MANAGEMENT.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.CONSTRUCTION_MANAGEMENT.LIST.PATH)
  }

  const onSubmit = (values) => {
    if (mode === MODAL_MODE.CREATE) {
      actions.createConstruction(values, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      const id = Number(params?.id)
      const paramUpdate = {
        ...values,
        id,
      }
      actions.updateConstruction(paramUpdate, backToList)
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
                          <Typography>
                            {t('constructionManagement.status')}
                          </Typography>
                        }
                        value={
                          <Status
                            options={ACTIVE_STATUS_OPTIONS}
                            value={constructionDetails?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="code"
                      label={t('constructionManagement.code')}
                      placeholder={t('constructionManagement.code')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIALS}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('constructionManagement.name')}
                      placeholder={t('constructionManagement.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('constructionManagement.description')}
                      placeholder={t('constructionManagement.description')}
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

export default ConstructionManagementForm
