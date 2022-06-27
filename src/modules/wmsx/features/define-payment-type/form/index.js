import { useEffect } from 'react'

import { Grid, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
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
import { DEFINE_PAYMENT_TYPE_STATUS_MAP } from '~/modules/wmsx/constants'
import useDefinePaymentType from '~/modules/wmsx/redux/hooks/useDefinePaymentType'
import { ROUTE } from '~/modules/wmsx/routes/config'

import { validateShema } from './schema'

function DefinePaymentTypeForm() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()

  const {
    data: { isLoading, paymentTypeDetails },
    actions,
  } = useDefinePaymentType()

  const MODE_MAP = {
    [ROUTE.DEFINE_PAYMENT_TYPE.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_PAYMENT_TYPE.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(ROUTE.DEFINE_PAYMENT_TYPE.LIST.PATH)
  }

  const initialValues = {
    code: paymentTypeDetails?.code || '',
    name: paymentTypeDetails?.name || '',
    percentage: Number(paymentTypeDetails?.discount) || '',
    description: paymentTypeDetails?.description || '',
  }

  useEffect(() => {
    actions.getPaymentTypeDetailsById(id)
    return () => actions.resetStatePaymentType()
  }, [mode])

  const handleSubmit = (val) => {
    const params = {
      code: val?.code,
      name: val?.name,
      discount: +val?.percentage,
      description: val?.description,
      customFields: [],
    }
    if (isUpdate) {
      params.id = id
      actions.updatePaymentType(params, backToList)
    } else {
      actions.createPaymentType(params, backToList)
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        route: ROUTE.DEFINE_PAYMENT_TYPE.LIST.PATH,
        title: ROUTE.DEFINE_PAYMENT_TYPE.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_PAYMENT_TYPE.CREATE.PATH,
          title: ROUTE.DEFINE_PAYMENT_TYPE.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_PAYMENT_TYPE.EDIT.PATH,
          title: ROUTE.DEFINE_PAYMENT_TYPE.EDIT.TITLE,
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
        return ROUTE.DEFINE_PAYMENT_TYPE.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_PAYMENT_TYPE.EDIT.TITLE
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
                  {isUpdate && (
                    <Grid item xs={12}>
                      <LabelValue
                        label={
                          <Typography>
                            {t('definePaymentType.status')}
                          </Typography>
                        }
                        value={
                          <Status
                            options={DEFINE_PAYMENT_TYPE_STATUS_MAP}
                            value={paymentTypeDetails?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('definePaymentType.code')}
                      name="code"
                      placeholder={t('definePaymentType.code')}
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
                      label={t('definePaymentType.name')}
                      name="name"
                      placeholder={t('definePaymentType.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="percentage"
                      label={t('definePaymentType.percentage')}
                      placeholder={t('definePaymentType.percentage')}
                      type="number"
                      numberProps={{
                        decimalScale: 3,
                      }}
                      allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('definePaymentType.description')}
                      placeholder={t('definePaymentType.description')}
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

export default DefinePaymentTypeForm
