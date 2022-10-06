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
import useRoleList from '~/modules/configuration/redux/hooks/useRoleList'
import { ROUTE } from '~/modules/configuration/routes/config'

import defineRoleSchema from './schema'

const DefineRoleForm = () => {
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { t } = useTranslation(['configuration'])
  const MODE_MAP = {
    [ROUTE.ROLE_LIST.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.ROLE_LIST.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const {
    data: { isLoading, roleDetails },
    actions,
  } = useRoleList()
  const initialValues = {
    code: roleDetails?.code || '',
    name: roleDetails?.name || '',
    description: roleDetails?.description || '',
  }
  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      actions.getRoleDetailsById(id)
    }
    return () => actions.resetRoleState()
  }, [mode])

  const onSubmit = (values) => {
    const convertValue = { ...values, customFields: [] }
    if (mode === MODAL_MODE.CREATE) {
      actions.createRole(convertValue, backToList)
    } else {
      actions.updateRole({ ...convertValue, id: +id }, backToList)
    }
  }
  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'decentralization',
      },
      {
        route: ROUTE.ROLE_LIST.LIST.PATH,
        title: ROUTE.ROLE_LIST.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.ROLE_LIST.CREATE.PATH,
          title: ROUTE.ROLE_LIST.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.ROLE_LIST.EDIT.PATH,
          title: ROUTE.ROLE_LIST.EDIT.TITLE,
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
        return ROUTE.ROLE_LIST.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.ROLE_LIST.EDIT.TITLE
      default:
    }
  }
  const backToList = () => {
    history.push(ROUTE.ROLE_LIST.LIST.PATH)
  }
  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t(`roleList.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={defineRoleSchema(t)}
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
                      label={t('roleList.code')}
                      name="code"
                      placeholder={t('roleList.code')}
                      disabled={isUpdate}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_8.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('roleList.name')}
                      name="name"
                      placeholder={t('roleList.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('roleList.note')}
                      placeholder={t('roleList.note')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      multiline
                      rows={7}
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

export default DefineRoleForm
