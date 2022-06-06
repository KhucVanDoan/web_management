import { useEffect } from 'react'

import { Grid, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useRouteMatch, useParams, useHistory } from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { DEFINE_INVOICE_TYPE_STATUS_OPTION } from '~/modules/wmsx/constants'
import useInvoiceType from '~/modules/wmsx/redux/hooks/useInvoiceType'
import { ROUTE } from '~/modules/wmsx/routes/config'

import { validateShema } from './schema'
function InvoiceTypeForm() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()

  const MODE_MAP = {
    [ROUTE.INVOICE_TYPE.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.INVOICE_TYPE.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const {
    data: { isLoading, invoiceTypeDetail },
    actions,
  } = useInvoiceType()

  const backToList = () => {
    history.push(ROUTE.INVOICE_TYPE.LIST.PATH)
  }

  useEffect(() => {
    actions.getInvoiceTypeDetailById(id)
    return () => actions.resetInvoiceTypeDetail()
  }, [id])

  const initialValues = {
    code: invoiceTypeDetail?.code || '',
    name: invoiceTypeDetail?.name || '',
    description: invoiceTypeDetail?.description || '',
  }

  const handleSubmit = (val) => {
    const params = {
      code: val?.code,
      name: val?.name,
      description: val?.description,
      customFields: [],
    }
    if (isUpdate) {
      params.id = id
      actions.updateInvoiceType(params, backToList)
    } else {
      actions.createInvoiceType(params, backToList)
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        route: ROUTE.INVOICE_TYPE.LIST.PATH,
        title: ROUTE.INVOICE_TYPE.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.INVOICE_TYPE.CREATE.PATH,
          title: ROUTE.INVOICE_TYPE.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.INVOICE_TYPE.EDIT.PATH,
          title: ROUTE.INVOICE_TYPE.EDIT.TITLE,
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
        return ROUTE.INVOICE_TYPE.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.INVOICE_TYPE.EDIT.TITLE
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
        {({ handleReset }) => (
          <Form>
            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  columnSpacing={{ xl: 8, xs: 4 }}
                  rowSpacing={4 / 3}
                >
                  {!isNil(invoiceTypeDetail?.status) && isUpdate && (
                    <Grid item xs={12}>
                      <LabelValue
                        label={
                          <Typography>{t('invoiceType.status')}</Typography>
                        }
                        value={
                          <Status
                            options={DEFINE_INVOICE_TYPE_STATUS_OPTION}
                            value={invoiceTypeDetail?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('invoiceType.code')}
                      name="code"
                      placeholder={t('invoiceType.code')}
                      disabled={mode === MODAL_MODE.UPDATE}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('invoiceType.name')}
                      name="name"
                      placeholder={t('invoiceType.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('invoiceType.description')}
                      placeholder={t('invoiceType.description')}
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

export default InvoiceTypeForm
