import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
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
import Page from '~/components/Page'
import { useAppStore } from '~/modules/auth/redux/hooks/useAppStore'
import useDefineFactory from '~/modules/mesx/redux/hooks/useDefineFactory'
import { ROUTE } from '~/modules/mesx/routes/config'

import { defineFactorySchema } from './schema'

const DefineFactoryForm = () => {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const params = useParams()
  const routeMatch = useRouteMatch()
  const {
    data: { factoryDetails, isLoading },
    actions,
  } = useDefineFactory()

  const { appStore } = useAppStore()

  const initialValues = {
    code: factoryDetails?.code || '',
    name: factoryDetails?.name || '',
    description: factoryDetails?.description || '',
    location: factoryDetails?.location || '',
    phone: factoryDetails?.phone || '',
    companyId: factoryDetails?.companyId || '',
  }

  const MODE_MAP = {
    [ROUTE.DEFINE_FACTORY.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_FACTORY.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: 'database',
      },
      {
        route: ROUTE.DEFINE_FACTORY.LIST.PATH,
        title: ROUTE.DEFINE_FACTORY.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_FACTORY.CREATE.PATH,
          title: ROUTE.DEFINE_FACTORY.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_FACTORY.EDIT.PATH,
          title: ROUTE.DEFINE_FACTORY.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumb
  }

  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      const id = params?.id
      actions.getFactoryDetailsById(id)
    }
    return () => {
      if (isUpdate) actions.resetFactoryDetailsState()
    }
  }, [params?.id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.DEFINE_FACTORY.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_FACTORY.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.DEFINE_FACTORY.LIST.PATH)
  }

  const onSubmit = (values) => {
    if (mode === MODAL_MODE.CREATE) {
      actions.createFactory(values, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      const id = Number(params?.id)
      const paramUpdate = {
        ...values,
        id,
      }
      actions.updateFactory(paramUpdate, backToList)
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
            validationSchema={defineFactorySchema(t)}
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
                      label={t('defineFactory.code')}
                      name="code"
                      placeholder={t('defineFactory.code')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_10.MAX,
                      }}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="location"
                      label={t('defineFactory.location')}
                      placeholder={t('defineFactory.location')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('defineFactory.name')}
                      name="name"
                      placeholder={t('defineFactory.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="phone"
                      label={t('defineFactory.phone')}
                      placeholder={t('defineFactory.phone')}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.PHONE.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="companyId"
                      label={t('defineFactory.companyName')}
                      placeholder={t('defineFactory.companyName')}
                      options={appStore?.companies}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionValue={(opt) => opt?.id}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('defineFactory.description')}
                      placeholder={t('defineFactory.description')}
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

export default DefineFactoryForm
