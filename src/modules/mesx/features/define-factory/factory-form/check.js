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
import useDefineCompany from '~/modules/mesx/redux/hooks/useDefineCompany'
import { ROUTE } from '~/modules/mesx/routes/config'

import { defineCompanySchema } from './schema'

function DefineCompanyForm() {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const params = useParams()
  const routeMatch = useRouteMatch()
  const {
    data: { companyDetails, isLoading },
    actions,
  } = useDefineCompany()

  const initialValues = isEmpty(companyDetails)
    ? {
        code: '',
        name: '',
        address: '',
        phone: '',
        taxNo: '',
        email: '',
        fax: '',
        description: '',
      }
    : pick(companyDetails, [
        'code',
        'name',
        'description',
        'address',
        'phone',
        'taxNo',
        'fax',
        'email',
      ])

  const MODE_MAP = {
    [ROUTE.DEFINE_COMPANY.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_COMPANY.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'database',
      },
      {
        route: ROUTE.DEFINE_COMPANY.LIST.PATH,
        title: ROUTE.DEFINE_COMPANY.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_COMPANY.CREATE.PATH,
          title: ROUTE.DEFINE_COMPANY.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_COMPANY.EDIT.PATH,
          title: ROUTE.DEFINE_COMPANY.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      const id = params?.id
      actions.getCompanyDetailsById(id)
    }
    return () => {
      if (isUpdate) actions.resetCompanyDetailsState()
    }
  }, [params?.id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.DEFINE_COMPANY.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_COMPANY.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.DEFINE_COMPANY.LIST.PATH)
  }

  const onSubmit = (values) => {
    if (mode === MODAL_MODE.CREATE) {
      actions.createCompany(values, () => backToList())
    } else if (mode === MODAL_MODE.UPDATE) {
      const id = Number(params?.id)
      const { code, name, description, address, phone, taxNo, fax, email } =
        values
      const paramUpdate = {
        id,
        code,
        name,
        address,
        phone,
        description,
        taxNo,
        fax,
        email,
      }
      actions.updateCompany(paramUpdate, () => backToList())
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
      <Formik
        initialValues={initialValues}
        validationSchema={defineCompanySchema(t)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset }) => (
          <Form>
            <Grid container rowSpacing={4 / 3} columnSpacing={4}>
              <Grid item xs={6}>
                <Field.TextField
                  label={t('defineCompany.code')}
                  name="code"
                  placeholder={t('defineCompany.code')}
                  disabled={isUpdate}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <Field.TextField
                  name="taxNo"
                  label={t('defineCompany.tax')}
                  placeholder={t('defineCompany.tax')}
                />
              </Grid>
              <Grid item xs={6}>
                <Field.TextField
                  label={t('defineCompany.name')}
                  name="name"
                  placeholder={t('defineCompany.name')}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <Field.TextField
                  name="email"
                  label={t('defineCompany.email')}
                  placeholder={t('defineCompany.email')}
                />
              </Grid>
              <Grid item xs={6}>
                <Field.TextField
                  label={t('defineCompany.address')}
                  name="address"
                  placeholder={t('defineCompany.address')}
                />
              </Grid>
              <Grid item xs={6}>
                <Field.TextField
                  name="fax"
                  label={t('defineCompany.fax')}
                  placeholder={t('defineCompany.fax')}
                />
              </Grid>
              <Grid item xs={6}>
                <Field.TextField
                  name="phone"
                  label={t('defineCompany.phone')}
                  placeholder={t('defineCompany.phone')}
                />
              </Grid>
              <Grid item xs={12}>
                <Field.TextField
                  name="description"
                  label={t('defineCompany.description')}
                  placeholder={t('defineCompany.description')}
                  labelWidth={'calc(100%/6 - 4px)'}
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>
            <Box>{renderActionButtons({ handleReset })}</Box>
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default DefineCompanyForm
