import { useEffect } from 'react'

import { Grid, InputAdornment } from '@mui/material'
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
import Page from '~/components/Page'
import useVoucher from '~/modules/wmsx/redux/hooks/useVoucher'
import { ROUTE } from '~/modules/wmsx/routes/config'

import { validateShema } from './schema'

function DefineVoucherForm() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()

  const {
    data: { isLoading, voucher },
    actions,
  } = useVoucher()

  const MODE_MAP = {
    [ROUTE.DEFINE_VOUCHER.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_VOUCHER.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(ROUTE.DEFINE_VOUCHER.LIST.PATH)
  }

  const initialValues = {
    code: voucher?.code || '',
    name: voucher?.name || '',
    date: [voucher?.dateFrom, voucher?.dateTo] || '',
    percentage: Number(voucher?.percentage) || '',
    description: voucher?.description || '',
  }

  useEffect(() => {
    actions.getVoucherById(id)
    return () => actions.resetVoucherDetailState()
  }, [mode])

  const handleSubmit = (val) => {
    const params = {
      ...val,
      dateFrom: val?.date[0],
      dateTo: val?.date[1],
    }
    if (isUpdate) {
      actions.updateVoucher({ ...params, id: Number(id) }, backToList)
    } else {
      actions.createVoucher(params, backToList)
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        route: ROUTE.DEFINE_VOUCHER.LIST.PATH,
        title: ROUTE.DEFINE_VOUCHER.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_VOUCHER.CREATE.PATH,
          title: ROUTE.DEFINE_VOUCHER.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_VOUCHER.EDIT.PATH,
          title: ROUTE.DEFINE_VOUCHER.EDIT.TITLE,
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
        return ROUTE.DEFINE_VOUCHER.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_VOUCHER.EDIT.TITLE
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
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('defineVoucher.code')}
                      name="code"
                      placeholder={t('defineVoucher.code')}
                      disabled={mode === MODAL_MODE.UPDATE}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_20.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('defineVoucher.name')}
                      name="name"
                      placeholder={t('defineVoucher.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="percentage"
                      label={t('defineVoucher.percentage')}
                      placeholder={t('defineVoucher.percentage')}
                      type="number"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                            {t('defineVoucher.percent')}
                          </InputAdornment>
                        ),
                      }}
                      allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.DateRangePicker
                      label={t('defineVoucher.date')}
                      name="date"
                      placeholder={t('defineVoucher.date')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('defineVoucher.description')}
                      placeholder={t('defineVoucher.description')}
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

export default DefineVoucherForm
