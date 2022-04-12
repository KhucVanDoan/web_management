import { useEffect } from 'react'

import { Grid } from '@mui/material'
import { Formik, Form } from 'formik'
import { isEmpty, pick } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import useDefineErrorGroup from '~/modules/qmsx/redux/hooks/useDefineErrorGroup'
import { ROUTE } from '~/modules/qmsx/routes/config'

import { defineErrorGroupSchema } from './schema'

function DefineErrorGroupForm() {
  const { t } = useTranslation(['qmsx'])
  const history = useHistory()
  const params = useParams()
  const routeMatch = useRouteMatch()
  const {
    data: { errorGroupDetail, isLoading },
    actions,
  } = useDefineErrorGroup()

  const initialValues = isEmpty(errorGroupDetail)
    ? {
        code: '',
        name: '',
        description: '',
      }
    : pick(errorGroupDetail, ['code', 'name', 'description'])

  const MODE_MAP = {
    [ROUTE.DEFINE_ERROR_GROUP.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_ERROR_GROUP.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'database',
      },
      {
        route: ROUTE.DEFINE_ERROR_GROUP.LIST.PATH,
        title: ROUTE.DEFINE_ERROR_GROUP.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_ERROR_GROUP.CREATE.PATH,
          title: ROUTE.DEFINE_ERROR_GROUP.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_ERROR_GROUP.EDIT.PATH,
          title: ROUTE.DEFINE_ERROR_GROUP.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      actions.getErrorGroupDetailById(params)
    }
    return () => {
      if (isUpdate) actions.resetErrorGroupDetailState()
    }
  }, [params?.id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.DEFINE_ERROR_GROUP.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_ERROR_GROUP.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.DEFINE_ERROR_GROUP.LIST.PATH)
  }

  const onSubmit = (values) => {
    if (mode === MODAL_MODE.CREATE) {
      actions.createErrorGroup(values, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      const id = Number(params?.id)
      const paramUpdate = {
        ...values,
        id,
      }
      actions.updateErrorGroup(paramUpdate, backToList)
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
            validationSchema={defineErrorGroupSchema(t)}
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
                    <Field.TextField
                      name="code"
                      label={t('defineErrorGroup.code')}
                      placeholder={t('defineErrorGroup.code')}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('defineErrorGroup.name')}
                      placeholder={t('defineErrorGroup.name')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('defineErrorGroup.description')}
                      placeholder={t('defineErrorGroup.description')}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
                <ActionBar
                  onBack={backToList}
                  onCancel={handleReset}
                  mode={mode}
                />
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefineErrorGroupForm
