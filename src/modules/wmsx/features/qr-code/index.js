import React, { useEffect } from 'react'

import { Grid, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE, TEXTFIELD_ALLOW } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import useQrCode from '~/modules/wmsx/redux/hooks/useQrCode'
import { ROUTE } from '~/modules/wmsx/routes/config'

import { formSchema } from './schema'

const breadcrumbs = [
  {
    title: 'setting',
  },
  {
    route: ROUTE.QR_CODE.PATH,
    title: ROUTE.QR_CODE.TITLE,
  },
]

const QrCode = () => {
  const { t } = useTranslation(['wmsx'])

  const {
    data: { isLoading, qrCodeDetails },
    actions,
  } = useQrCode()

  const initialValues = {
    dataId: '00',
    dataLength: '02',
    dataValue: qrCodeDetails?.version?.value || '',
    methodId: '01',
    methodLength: '18',
    subId1: '01',
    length1: '02',
    value1: qrCodeDetails?.initializationMethod?.subId1?.value || '',
    subId2: '02',
    length2: '02',
    value2: qrCodeDetails?.initializationMethod?.subId2?.value || '',
    subId3: '03',
    length3: '02',
    value3: qrCodeDetails?.initializationMethod?.subId3?.value || '',
    idenId: '03',
    idenLength: '01',
    idenValue: qrCodeDetails?.uniqueId?.value || '',
  }

  useEffect(() => {
    actions.getQrCodeDetails()
  }, [])

  const onSubmit = (values) => {
    const convertValues = {
      version: values?.dataValue,
      initializationMethod: {
        subId1Value: values?.value1,
        subId2Value: values?.value2,
        subId3Value: values?.value3,
      },
      uniqueId: values?.idenValue,
    }
    actions.updateQrCode(convertValues, () => {
      window.location.reload()
    })
  }

  const renderActionBar = (handleReset) => {
    return <ActionBar onCancel={handleReset} mode={MODAL_MODE.UPDATE} />
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.qrCode')}
      loading={isLoading}
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
                  {/* dataVersion */}
                  <Grid item xs={12}>
                    <Typography variant="h4" mt={1} mb={1}>
                      {t('qrCode.dataVersion')}
                    </Typography>
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="dataId"
                      label={t('qrCode.id')}
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="dataLength"
                      label={t('qrCode.length')}
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="dataValue"
                      label={t('qrCode.value')}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      inputProps={{ maxLength: 2 }}
                      required
                    />
                  </Grid>

                  {/* initMethod */}
                  <Grid item xs={12}>
                    <Typography variant="h4" mt={1} mb={1}>
                      {t('qrCode.initMethod')}
                    </Typography>
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="methodId"
                      label={t('qrCode.id')}
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="methodLength"
                      label={t('qrCode.length')}
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}></Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="subId1"
                      label={t('qrCode.subId1')}
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="length1"
                      label={t('qrCode.length1')}
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="value1"
                      label={t('qrCode.value1')}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      inputProps={{ maxLength: 2 }}
                      required
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="subId2"
                      label={t('qrCode.subId2')}
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="length2"
                      label={t('qrCode.length2')}
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="value2"
                      label={t('qrCode.value2')}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      inputProps={{ maxLength: 2 }}
                      required
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="subId3"
                      label={t('qrCode.subId3')}
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="length3"
                      label={t('qrCode.length3')}
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="value3"
                      label={t('qrCode.value3')}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      inputProps={{ maxLength: 2 }}
                      required
                    />
                  </Grid>

                  {/* identifyId */}
                  <Grid item xs={12}>
                    <Typography variant="h4" mt={1}>
                      {t('qrCode.identifyId')}
                    </Typography>
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="idenId"
                      label={t('qrCode.id')}
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="idenLength"
                      label={t('qrCode.length')}
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="idenValue"
                      label={t('qrCode.value')}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      inputProps={{ maxLength: 1 }}
                      required
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

export default QrCode
