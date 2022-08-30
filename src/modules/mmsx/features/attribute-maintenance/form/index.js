import { useEffect } from 'react'

import { Grid, Paper } from '@mui/material'
import { Form, Formik } from 'formik'
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
import { ACTION_MAP } from '~/modules/mmsx/constants'
import Activities from '~/modules/mmsx/partials/Activities'
import useAttributeMaintenance from '~/modules/mmsx/redux/hooks/useAttributeMaintenance'
import { ROUTE } from '~/modules/mmsx/routes/config'

import { validateSchema } from './schema'

function AttributeMaintenanceForm() {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()

  const {
    data: { attributeMaintainDetail, isLoading },
    actions,
  } = useAttributeMaintenance()

  const MODE_MAP = {
    [ROUTE.ATTRIBUTE_MAINTENANCE.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.ATTRIBUTE_MAINTENANCE.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = {
    code: attributeMaintainDetail?.code || '',
    name: attributeMaintainDetail?.name || '',
    description: attributeMaintainDetail?.description || '',
  }

  useEffect(() => {
    if (isUpdate) {
      actions.getDetailAttributeMaintenance(id)
    }
    return () => actions.resetState()
  }, [id])

  const handleSubmit = (val) => {
    if (isUpdate) {
      actions.updateAttributeMaintenance({ ...val, id }, backToList)
    } else {
      actions.createAttributeMaintenance(val, backToList)
    }
  }

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: ROUTE.SETTING.TITLE,
      },
      {
        route: ROUTE.ATTRIBUTE_MAINTENANCE.LIST.PATH,
        title: ROUTE.ATTRIBUTE_MAINTENANCE.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.ATTRIBUTE_MAINTENANCE.CREATE.PATH,
          title: ROUTE.ATTRIBUTE_MAINTENANCE.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.ATTRIBUTE_MAINTENANCE.EDIT.PATH,
          title: ROUTE.ATTRIBUTE_MAINTENANCE.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.ATTRIBUTE_MAINTENANCE.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.ATTRIBUTE_MAINTENANCE.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.ATTRIBUTE_MAINTENANCE.LIST.PATH)
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

  const histories = attributeMaintainDetail?.histories?.map((item) => ({
    content: ACTION_MAP[item?.action]
      ? t(`attributeMaintenance.actionHistory.${ACTION_MAP[item?.action]}`)
      : '',
    createdAt: item?.createdAt,
    username: item?.username,
  }))

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t('menu.' + getTitle())}
      onBack={backToList}
      loading={isLoading}
      freeSolo
    >
      <Paper sx={{ p: 2 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validateSchema(t)}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ handleReset }) => (
            <Form>
              <Grid container justifyContent="center">
                <Grid item xl={11} xs={12}>
                  <Grid
                    container
                    rowSpacing={4 / 3}
                    columnSpacing={{ xl: 8, xs: 4 }}
                  >
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        label={t('attributeMaintenance.form.code')}
                        name="code"
                        placeholder={t('attributeMaintenance.form.code')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                        }}
                        disabled={isUpdate}
                        required
                        allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        label={t('attributeMaintenance.form.name')}
                        name="name"
                        placeholder={t('attributeMaintenance.form.name')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        allow={TEXTFIELD_ALLOW.EXCEPT_SPECIALS}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field.TextField
                        name="description"
                        label={t('attributeMaintenance.form.description')}
                        placeholder={t('attributeMaintenance.form.description')}
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
      </Paper>
      {isUpdate && <Activities data={histories} />}
    </Page>
  )
}

export default AttributeMaintenanceForm
