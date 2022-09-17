import React, { useEffect } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT, MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import useSignatureConfiguration from '~/modules/wmsx/redux/hooks/useSignatureConfiguration'
import { ROUTE } from '~/modules/wmsx/routes/config'

import { searchMovementsApi } from '../../redux/sagas/movements/search-movements'
import ItemsSettingTable from './items-setting-table'
import { formSchema } from './schema'

const DEFAULT_ITEM = {
  id: new Date().getTime(),
  itemId: '',
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
    data: { isLoading, signatureConfigurationDetails },
    actions,
  } = useSignatureConfiguration()

  const initialValues = {
    formType: signatureConfigurationDetails?.formType || null,
    items: signatureConfigurationDetails?.items || [{ ...DEFAULT_ITEM }],
  }

  useEffect(() => {
    actions.getSignatureConfigurationDetails()
  }, [])

  const onSubmit = (values) => {
    const convertValues = {
      formType: values.formType.id,
      items: values.items,
    }
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
        {({ handleReset, values }) => (
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
                      name="formType"
                      label={t('signatureConfiguration.formType')}
                      placeholder={t('signatureConfiguration.formType')}
                      asyncRequest={(s) =>
                        //@TODO update api
                        searchMovementsApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
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
