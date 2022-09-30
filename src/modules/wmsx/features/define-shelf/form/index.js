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
import {
  ACTIVE_STATUS_OPTIONS,
  WAREHOUSE_LAYOUTS,
} from '~/modules/wmsx/constants'
import useDefineShelf from '~/modules/wmsx/redux/hooks/useDefineShelf'
import { ROUTE } from '~/modules/wmsx/routes/config'

import { formSchema } from './schema'

function DefineShelfForm() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()

  const {
    data: { isLoading, shelfDetails },
    actions,
  } = useDefineShelf()

  const MODE_MAP = {
    [ROUTE.DEFINE_SHELF.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_SHELF.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = useMemo(
    () => ({
      code: shelfDetails?.code || '',
      name: shelfDetails?.name || '',
      description: shelfDetails?.description || '',
    }),
    [shelfDetails],
  )

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: ROUTE.WAREHOUSE_MANAGEMENT.TITLE,
      },
      {
        route: ROUTE.DEFINE_SHELF.LIST.PATH,
        title: ROUTE.DEFINE_SHELF.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_SHELF.CREATE.PATH,
          title: ROUTE.DEFINE_SHELF.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_SHELF.EDIT.PATH,
          title: ROUTE.DEFINE_SHELF.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    if (isUpdate) {
      actions.getShelfDetailsById(id)
    }
    return () => {
      actions.resetShelfDetailsState()
    }
  }, [id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.DEFINE_SHELF.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_SHELF.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.DEFINE_SHELF.LIST.PATH)
  }

  const onSubmit = (values) => {
    const convertValues = {
      ...values,
      level: WAREHOUSE_LAYOUTS.SHELF,
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createShelf(convertValues, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      const paramUpdate = {
        ...convertValues,
        id,
      }
      actions.updateShelf(paramUpdate, backToList)
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
                          <Typography>{t('defineShelf.status')}</Typography>
                        }
                        value={
                          <Status
                            options={ACTIVE_STATUS_OPTIONS}
                            value={shelfDetails?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="code"
                      label={t('defineShelf.code')}
                      placeholder={t('defineShelf.code')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_5.MAX,
                      }}
                      disabled={isUpdate}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('defineShelf.name')}
                      placeholder={t('defineShelf.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_100.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('defineShelf.description')}
                      placeholder={t('defineShelf.description')}
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

export default DefineShelfForm
