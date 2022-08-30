import React, { useEffect } from 'react'

import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

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
import { UOM_ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useDefineUom from '~/modules/wmsx/redux/hooks/useDefineUom'
import { ROUTE } from '~/modules/wmsx/routes/config'

import { formSchema } from './schema'

function DefineUomForm() {
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const params = useParams()

  const {
    data: { isLoading, uomDetails },
    actions,
  } = useDefineUom()

  const initialValues = {
    code: uomDetails?.code || '',
    name: uomDetails?.name || '',
    shortName: uomDetails?.shortName || '',
    description: uomDetails?.description || '',
  }

  const MODE_MAP = {
    [ROUTE.DEFINE_UOM.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_UOM.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const { t } = useTranslation(['wmsx'])

  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      const id = params?.id
      actions.getUomDetailsById(id)
    }
    return () => {
      if (isUpdate) actions.resetUomDetailsState()
    }
  }, [params?.id])

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: 'database',
      },
      {
        route: ROUTE.DEFINE_UOM.LIST.PATH,
        title: ROUTE.DEFINE_UOM.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_UOM.CREATE.PATH,
          title: ROUTE.DEFINE_UOM.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_UOM.EDIT.PATH,
          title: ROUTE.DEFINE_UOM.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumb
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.DEFINE_UOM.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_UOM.EDIT.TITLE
      default:
        break
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
    }
  }

  const backToList = () => {
    history.push(ROUTE.DEFINE_UOM.LIST.PATH)
  }

  const onSubmit = (values) => {
    const id = Number(params?.id)
    const convertValues = {
      id,
      ...values,
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createUom(convertValues, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updateUom(convertValues, backToList)
    }
  }

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t(`menu.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
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
                        label={<Typography>{t('defineUom.status')}</Typography>}
                        value={
                          <Status
                            options={UOM_ACTIVE_STATUS_OPTIONS}
                            value={uomDetails?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('defineUom.code')}
                      name="code"
                      placeholder={t('defineUom.code')}
                      disabled={isUpdate}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('defineUom.name')}
                      placeholder={t('defineUom.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="shortName"
                      label={t('defineUom.shortName')}
                      placeholder={t('defineUom.shortName')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('defineUom.description')}
                      placeholder={t('defineUom.description')}
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

export default DefineUomForm
