import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import {
  useParams,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import useDefineCustomer from '~/modules/wmsx/redux/hooks/useDefineCustomer'
import { ROUTE } from '~/modules/wmsx/routes/config'
import qs from '~/utils/qs'

import defineCustomerSchema from './schema'

const DefineCustomerForm = () => {
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const location = useLocation()
  const { cloneId } = qs.parse(location.search)
  const { t } = useTranslation(['wmsx'])
  const MODE_MAP = {
    [ROUTE.DEFINE_CUSTOMER.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_CUSTOMER.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const {
    data: { isLoading, customerDetails },
    actions,
  } = useDefineCustomer()
  const initialValues = {
    code: isUpdate ? customerDetails?.code : '',
    name: customerDetails?.name || '',
    phone: customerDetails?.phone || '',
    email: customerDetails?.email || null,
    fax: customerDetails?.fax || '',
    address: customerDetails?.address || '',
    description: customerDetails?.description || '',
    bank: customerDetails?.bank || '',
    bankAccount: customerDetails?.bankAccount || '',
    bankAccountOwner: customerDetails?.bankAccountOwner || '',
  }
  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      actions.getCustomerDetailsById(id)
    }
    if (cloneId) {
      actions.getCustomerDetailsById(cloneId)
    }
    return () => actions.resetCustomerDetails()
  }, [mode, cloneId])

  const onSubmit = (values) => {
    if (mode === MODAL_MODE.CREATE) {
      actions.createCustomer(values, backToList)
    } else {
      actions.updateCustomer({ ...values, id: +id }, backToList)
    }
  }
  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: ROUTE.PRODUCTION_INFORMATION_MANAGENMENT.TITLE,
      },
      {
        route: ROUTE.DEFINE_CUSTOMER.LIST.PATH,
        title: ROUTE.DEFINE_CUSTOMER.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_CUSTOMER.CREATE.PATH,
          title: ROUTE.DEFINE_CUSTOMER.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_CUSTOMER.EDIT.PATH,
          title: ROUTE.DEFINE_CUSTOMER.EDIT.TITLE,
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
        return ROUTE.DEFINE_CUSTOMER.CREATE.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.DEFINE_CUSTOMER.DETAIL.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_CUSTOMER.EDIT.TITLE
      default:
    }
  }
  const backToList = () => {
    history.push(ROUTE.DEFINE_CUSTOMER.LIST.PATH)
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
        validationSchema={defineCustomerSchema(t)}
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
                      label={t('defineCustomer.code')}
                      name="code"
                      placeholder={t('defineCustomer.code')}
                      disabled={isUpdate}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_9.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('defineCustomer.name')}
                      name="name"
                      placeholder={t('defineCustomer.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('defineCustomer.address')}
                      name="address"
                      placeholder={t('defineCustomer.address')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('defineCustomer.phone')}
                      name="phone"
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      placeholder={t('defineCustomer.phone')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.PHONE.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('defineCustomer.fax')}
                      name="fax"
                      placeholder={t('defineCustomer.fax')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('defineCustomer.email')}
                      name="email"
                      placeholder={t('defineCustomer.email')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.EMAIL.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('defineCustomer.bank')}
                      name="bank"
                      placeholder={t('defineCustomer.bank')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('defineCustomer.bankAccount')}
                      name="bankAccount"
                      placeholder={t('defineCustomer.bankAccount')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_20.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('defineCustomer.bankAccountOwner')}
                      name="bankAccountOwner"
                      placeholder={t('defineCustomer.bankAccountOwner')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('defineCustomer.description')}
                      placeholder={t('defineCustomer.description')}
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

export default DefineCustomerForm
