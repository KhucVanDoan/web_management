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
import { ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useDefineExpenditureOrg from '~/modules/wmsx/redux/hooks/useDefineExpenditureOrg'
import { ROUTE } from '~/modules/wmsx/routes/config'

import { formSchema } from './schema'

const DefineExpenditureOrgForm = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()

  const MODE_MAP = {
    [ROUTE.DEFINE_EXPENDITURE_ORG.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_EXPENDITURE_ORG.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const {
    data: { isLoading, expenditureOrgDetails },
    actions,
  } = useDefineExpenditureOrg()

  const initialValues = {
    code: isUpdate ? expenditureOrgDetails?.code : '',
    name: expenditureOrgDetails?.name || '',
    phone: expenditureOrgDetails?.phone || '',
    email: expenditureOrgDetails?.email || '',
    description: expenditureOrgDetails?.description || '',
  }

  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      actions.getExpenditureOrgDetailsById(id)
    }
    return () => actions.resetExpenditureOrgDetailsState()
  }, [mode])

  const onSubmit = (values) => {
    const params = {
      code: values?.code,
      name: values?.name,
      phone: values?.phone,
      email: values?.email,
      description: values?.description || '',
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createExpenditureOrg(params, backToList)
    } else {
      actions.updateExpenditureOrg({ ...params, id: Number(id) }, backToList)
    }
  }
  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'database',
      },
      {
        route: ROUTE.DEFINE_EXPENDITURE_ORG.LIST.PATH,
        title: ROUTE.DEFINE_EXPENDITURE_ORG.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_EXPENDITURE_ORG.CREATE.PATH,
          title: ROUTE.DEFINE_EXPENDITURE_ORG.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_EXPENDITURE_ORG.EDIT.PATH,
          title: ROUTE.DEFINE_EXPENDITURE_ORG.EDIT.TITLE,
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
        return ROUTE.DEFINE_EXPENDITURE_ORG.CREATE.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.DEFINE_EXPENDITURE_ORG.DETAIL.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_EXPENDITURE_ORG.EDIT.TITLE
      default:
    }
  }
  const backToList = () => {
    history.push(ROUTE.DEFINE_EXPENDITURE_ORG.LIST.PATH)
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
        validationSchema={formSchema(t)}
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
                            {t('defineExpenditureType.status')}
                          </Typography>
                        }
                        value={
                          <Status
                            options={ACTIVE_STATUS_OPTIONS}
                            value={expenditureOrgDetails?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('defineExpenditureOrg.code')}
                      name="code"
                      placeholder={t('defineExpenditureOrg.code')}
                      disabled={isUpdate}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('defineExpenditureOrg.name')}
                      name="name"
                      placeholder={t('defineExpenditureOrg.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('defineExpenditureOrg.email')}
                      name="email"
                      placeholder={t('defineExpenditureOrg.email')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.EMAIL.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('defineExpenditureOrg.phone')}
                      name="phone"
                      placeholder={t('defineExpenditureOrg.phone')}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.PHONE.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('defineExpenditureOrg.description')}
                      placeholder={t('defineExpenditureOrg.description')}
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

export default DefineExpenditureOrgForm
