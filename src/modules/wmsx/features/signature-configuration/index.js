import React, { useEffect } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import useSignatureConfiguration from '~/modules/wmsx/redux/hooks/useSignatureConfiguration'
import { ROUTE } from '~/modules/wmsx/routes/config'

import { TYPE_OBJECT_ENUM, TYPE_OBJECT_OPTIONS } from '../../constants'
import ItemsSettingTable from './items-setting-table'
import { formSchema } from './schema'

const DEFAULT_ITEM = {
  id: new Date().getTime(),
  role: null,
  signerName: '',
}

const breadcrumbs = [
  {
    title: ROUTE.SETTING.TITLE,
  },
  {
    route: ROUTE.SIGNATURE_CONFIGURATION.PATH,
    title: ROUTE.SIGNATURE_CONFIGURATION.TITLE,
  },
]

const SignatureConfiguration = () => {
  const { t } = useTranslation(['wmsx'])

  const {
    data: { isLoading, signatureConfigurationList },
    actions,
  } = useSignatureConfiguration()

  const initialValues = {
    typeObject: TYPE_OBJECT_ENUM.PURCHASED_ORDER_IMPORT,
    items: signatureConfigurationList?.length
      ? signatureConfigurationList?.map((item, index) => ({
          id: index + 1,
          role: item?.roleSetting || '',
          signerName: item?.signature || '',
        }))
      : [{ ...DEFAULT_ITEM }],
  }

  useEffect(() => {
    actions.getSignatureConfigurationList({
      typeObject: TYPE_OBJECT_ENUM.PURCHASED_ORDER_IMPORT,
    })
  }, [])

  const onSubmit = (values) => {
    const convertValues = {
      signatures: values.items?.map((item) => ({
        typeObject: values.typeObject,
        roleId: item?.role,
        signature: item?.signerName,
      })),
    }

    console.log(convertValues)
    actions.updateSignatureConfiguration(convertValues, () => {
      window.location.reload()
    })
  }

  const renderActionBar = (handleReset) => {
    return <ActionBar onCancel={handleReset} mode={MODAL_MODE.UPDATE} />
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.signatureConfiguration')}
      loading={isLoading}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema(t)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset, values, setFieldValue }) => (
          <Form>
            <Typography variant="h4" mt={1} mb={1}>
              {t('signatureConfiguration.title')}
            </Typography>
            <Grid
              container
              sx={(theme) => ({
                justifyContent: 'center',
                bgcolor: 'grayF4.main',
                borderRadius: 1,
                my: 2,
                pt: 1,
                pb: 2,

                [theme.breakpoints.down('xl')]: {
                  px: 2,
                },
              })}
            >
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  columnSpacing={{ xl: 8, xs: 4 }}
                  rowSpacing={4 / 3}
                >
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="typeObject"
                      label={t('signatureConfiguration.typeObject')}
                      placeholder={t('signatureConfiguration.typeObject')}
                      options={TYPE_OBJECT_OPTIONS}
                      getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
                      getOptionValue={(opt) => opt?.id}
                      onChange={(val) => {
                        setFieldValue('typeObject', val)
                        actions.getSignatureConfigurationList({
                          typeObject: val,
                        })
                        handleReset()
                      }}
                      disableClearable
                      required
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
              <FieldArray
                name="items"
                render={(arrayHelpers) => (
                  <ItemsSettingTable
                    items={values?.items || []}
                    arrayHelpers={arrayHelpers}
                  />
                )}
              />
            </Box>

            {renderActionBar(handleReset)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default SignatureConfiguration
