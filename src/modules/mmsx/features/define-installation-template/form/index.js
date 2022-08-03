import React, { useEffect } from 'react'

import { Box, Grid } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import useDefineInstallationTemplate from '~/modules/mmsx/redux/hooks/useDefineInstallationTemplate'
import { ROUTE } from '~/modules/mmsx/routes/config'

import ItemSettingTable from './item-setting-table'
import { validateShema } from './schema'
const DEFAULT_ITEM = [
  {
    id: new Date().getTime(),
    title: '',
    description: '',
    isRequire: true,
  },
]
const DefineInstallationTemplateForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()

  const {
    data: { installDetail, isLoading },
    actions,
  } = useDefineInstallationTemplate()
  const MODE_MAP = {
    [ROUTE.INSTALLATION_TEMPLATE.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.INSTALLATION_TEMPLATE.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(ROUTE.INSTALLATION_TEMPLATE.LIST.PATH)
  }

  const initialValues = {
    code: installDetail?.code || '',
    name: installDetail?.name || '',
    description: installDetail?.description || '',
    items:
      installDetail?.details?.map((item) => ({
        title: item?.title,
        description: item?.description,
        isRequire: item?.isRequire,
      })) || DEFAULT_ITEM,
  }
  useEffect(() => {
    if (isUpdate) {
      actions.getDetailTemplateInstall(id)
    }
    return () => {
      actions.resetTempalteInstall()
    }
  }, [id])

  const handleSubmit = (values) => {
    const params = {
      code: values?.code.trim(),
      name: values?.name.trim(),
      description: values?.description.trim(),
      details: values?.items.map((data) => ({
        title: data?.title.trim(),
        description: data?.description.trim(),
        isRequire: data?.isRequire ? true : false,
      })),
    }
    if (isUpdate) {
      params.id = id
      actions.updateTemplateInstall(params, backToList)
    } else {
      actions.createTemplateInstall(params, backToList)
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: 'database',
      },
      {
        route: ROUTE.INSTALLATION_TEMPLATE.LIST.PATH,
        title: ROUTE.INSTALLATION_TEMPLATE.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.INSTALLATION_TEMPLATE.CREATE.PATH,
          title: ROUTE.INSTALLATION_TEMPLATE.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.INSTALLATION_TEMPLATE.EDIT.PATH,
          title: ROUTE.INSTALLATION_TEMPLATE.EDIT.TITLE,
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
        return ROUTE.INSTALLATION_TEMPLATE.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.INSTALLATION_TEMPLATE.EDIT.TITLE
      default:
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
      title={t(`menu.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validateShema(t)}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleReset, values }) => (
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
                      label={t('templateInstall.form.field.code')}
                      name="code"
                      placeholder={t('templateInstall.form.field.code')}
                      disabled={mode === MODAL_MODE.UPDATE}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_8.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('templateInstall.form.field.name')}
                      name="name"
                      placeholder={t('templateInstall.form.field.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
                      }}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('templateInstall.form.field.description')}
                      placeholder={t('templateInstall.form.field.description')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 3 }}>
                  <FieldArray
                    name="items"
                    render={(arrayHelpers) => (
                      <ItemSettingTable
                        arrayHelpers={arrayHelpers}
                        items={values?.items || []}
                      />
                    )}
                  />
                </Box>
                {renderActionBar(handleReset)}
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default DefineInstallationTemplateForm
