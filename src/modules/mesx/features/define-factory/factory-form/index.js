import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import { Formik, Form } from 'formik'
import { isEmpty, pick } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
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

  const initialValues = isEmpty(factoryDetails)
    ? {
        code: '',
        name: '',
        description: '',
        location: '',
        phone: '',
        companyId: '',
      }
    : pick(factoryDetails, [
        'code',
        'name',
        'description',
        'location',
        'phone',
        'companyId',
      ])

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

  const renderActionButtons = ({ handleReset }) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={backToList} color="grayF4" sx={{ mr: 1 }}>
              {t('common.close')}
            </Button>
            <Button
              onClick={handleReset}
              variant="outlined"
              color="subText"
              sx={{ mr: 1 }}
            >
              {t('common.cancel')}
            </Button>
            <Button type="submit">{t('common.create')}</Button>
          </Box>
        )
      case MODAL_MODE.UPDATE:
        return (
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={backToList} color="grayF4" sx={{ mr: 1 }}>
              {t('common.close')}
            </Button>
            <Button
              onClick={handleReset}
              variant="outlined"
              color="subText"
              sx={{ mr: 1 }}
            >
              {t('common.cancel')}
            </Button>
            <Button type="submit">{t('common.save')}</Button>
          </Box>
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
        <Grid item xl={11} sx={12}>
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
                      labelWidth={180}
                      label={t('defineFactory.code')}
                      name="code"
                      placeholder={t('defineFactory.code')}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      labelWidth={180}
                      name="location"
                      label={t('defineFactory.location')}
                      placeholder={t('defineFactory.location')}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      labelWidth={180}
                      label={t('defineFactory.name')}
                      name="name"
                      placeholder={t('defineFactory.name')}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      labelWidth={180}
                      name="phone"
                      label={t('defineFactory.phone')}
                      placeholder={t('defineFactory.phone')}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      labelWidth={180}
                      name="companyId"
                      label={t('defineFactory.companyName')}
                      placeholder={t('defineFactory.companyName')}
                      options={appStore?.companies}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionValue={(opt) => opt?.id}
                      required
                      // @TODO: <yen.nguyenhai> re-check how to get the options for the select box
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      labelWidth={180}
                      name="description"
                      label={t('defineFactory.description')}
                      placeholder={t('defineFactory.description')}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
                <Box>{renderActionButtons({ handleReset })}</Box>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefineFactoryForm
