import React, { useEffect, useMemo } from 'react'

import { Grid, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW } from '~/common/constants'
import { FUNCTION_CODE } from '~/common/constants/functionCode'
import { useApp } from '~/common/hooks/useApp'
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
  const { canAccess } = useApp()

  const {
    data: { isLoading, qrCodeDetails },
    actions,
  } = useQrCode()
  const convertData = (val) => {
    if (+val < 10 && val.toString().length < 2) {
      return `0${val}`
    } else {
      return val
    }
  }
  const initialValues = useMemo(
    () => ({
      dataId: qrCodeDetails?.version?.id || '00',
      dataLength: convertData(qrCodeDetails?.version?.length) || '02',
      dataValue: qrCodeDetails?.version?.value || '',
      methodId: qrCodeDetails?.initializationMethod?.id?.id || '01',
      methodLength:
        convertData(qrCodeDetails?.initializationMethod?.id?.length) || '18',
      subId1: qrCodeDetails?.initializationMethod?.subId1?.id || '01',
      length1:
        convertData(qrCodeDetails?.initializationMethod?.subId1?.length) ||
        '02',
      value1: qrCodeDetails?.initializationMethod?.subId1?.value || '',
      subId2: qrCodeDetails?.initializationMethod?.subId2?.id || '02',
      length2:
        convertData(qrCodeDetails?.initializationMethod?.subId2?.length) ||
        '02',
      value2: qrCodeDetails?.initializationMethod?.subId2?.value || '',
      subId3: qrCodeDetails?.initializationMethod?.subId3?.id || '03',
      length3:
        convertData(qrCodeDetails?.initializationMethod?.subId3?.length) ||
        '02',
      value3: qrCodeDetails?.initializationMethod?.subId3?.value || '',
      idenId: qrCodeDetails?.uniqueId?.id || '03',
      idenLength: convertData(qrCodeDetails?.uniqueId?.length) || '01',
      idenValue: qrCodeDetails?.uniqueId?.value || '',
    }),
    [qrCodeDetails],
  )

  useEffect(() => {
    actions.getQrCodeDetails()
    return () => actions.resetQrCode()
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

  const editable = canAccess(FUNCTION_CODE.REPORT_CREATE_QR_CODE_SETTING)

  // const renderActionBar = (handleReset) => {
  //   if (!editable) return null
  //   return <ActionBar onCancel={handleReset} mode={MODAL_MODE.UPDATE} />
  // }

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
        {() => (
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
                      required={editable}
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="dataLength"
                      label={t('qrCode.length')}
                      disabled
                      required={editable}
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="dataValue"
                      label={t('qrCode.value')}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      inputProps={{ maxLength: 2 }}
                      required={editable}
                      disabled
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
                      required={editable}
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="methodLength"
                      label={t('qrCode.length')}
                      disabled
                      required={editable}
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}></Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="subId1"
                      label={t('qrCode.subId1')}
                      disabled
                      required={editable}
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="length1"
                      label={t('qrCode.length1')}
                      disabled
                      required={editable}
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="value1"
                      label={t('qrCode.value1')}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      inputProps={{ maxLength: 2 }}
                      required={editable}
                      disabled
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="subId2"
                      label={t('qrCode.subId2')}
                      disabled
                      required={editable}
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="length2"
                      label={t('qrCode.length2')}
                      disabled
                      required={editable}
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="value2"
                      label={t('qrCode.value2')}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      inputProps={{ maxLength: 2 }}
                      required={editable}
                      disabled
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="subId3"
                      label={t('qrCode.subId3')}
                      disabled
                      required={editable}
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="length3"
                      label={t('qrCode.length3')}
                      disabled
                      required={editable}
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="value3"
                      label={t('qrCode.value3')}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      inputProps={{ maxLength: 2 }}
                      required={editable}
                      disabled
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
                      required={editable}
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="idenLength"
                      label={t('qrCode.length')}
                      disabled
                      required={editable}
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Field.TextField
                      name="idenValue"
                      label={t('qrCode.value')}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      inputProps={{ maxLength: 1 }}
                      required={editable}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* {renderActionBar(handleReset)} */}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default QrCode
