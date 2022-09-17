import React from 'react'

import { Box, Grid } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import useReportExport from '~/modules/wmsx/redux/hooks/useReportExport'
import { ROUTE } from '~/modules/wmsx/routes/config'

import { searchCompaniesApi } from '../../redux/sagas/company-management/search-companies'
import { searchConstructionsApi } from '../../redux/sagas/construction-management/search-constructions'
import { searchWarehouseApi } from '../../redux/sagas/define-warehouse/search-warehouse'
import { formSchema } from './schema'

const breadcrumbs = [
  {
    title: ROUTE.REPORT_STATISTICS.TITLE,
  },
  {
    route: ROUTE.REPORT_EXPORT.PATH,
    title: ROUTE.REPORT_EXPORT.TITLE,
  },
]

const ReportExport = () => {
  const { t } = useTranslation(['wmsx'])

  const {
    data: { isLoading },
    actions,
  } = useReportExport()

  const initialValues = {
    type: '',
    company: null,
    fromDate: '',
    fileFormat: '',
  }

  const onSubmit = (values) => {
    const convertValues = {
      ...values,
    }
    actions.exportReport(convertValues, () => {
      window.location.reload()
    })
  }

  const renderActionBar = (handleReset) => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          '& button + button': {
            ml: 4 / 3,
          },
        }}
      >
        <Button variant="outlined" color="subText" onClick={handleReset}>
          {t('general:actionBar.cancel')}
        </Button>
        <Button type="submit" icon="save">
          {t('reportExport.export')}
        </Button>
      </Box>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.reportExport')}
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
            <Grid container justifyContent="center" sx={{ mb: 3 }}>
              <Grid item xl={6} xs={12}>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 4, xs: 4 }}
                >
                  <Grid item lg={12} xs={12}>
                    <Field.Autocomplete
                      name="type"
                      label={t('reportExport.type')}
                      placeholder={t('reportExport.type')}
                      labelWidth={160}
                      options={[]}
                      getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
                      getOptionValue={(opt) => opt?.id?.toString()}
                      required
                    />
                  </Grid>
                  <Grid item lg={12} xs={12}>
                    <Field.Autocomplete
                      name="company"
                      label={t('reportExport.company')}
                      placeholder={t('reportExport.company')}
                      asyncRequest={(s) =>
                        searchCompaniesApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.name}
                      required
                    />
                  </Grid>
                  <Grid item lg={12} xs={12}>
                    <Field.Autocomplete
                      name="contruction"
                      label={t('reportExport.contruction')}
                      placeholder={t('reportExport.contruction')}
                      asyncRequest={(s) =>
                        searchConstructionsApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.name}
                    />
                  </Grid>
                  <Grid item lg={12} xs={12}>
                    <Field.Autocomplete
                      name="warehouse"
                      label={t('reportExport.warehouse')}
                      placeholder={t('reportExport.warehouse')}
                      asyncRequest={(s) =>
                        searchWarehouseApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.name}
                    />
                  </Grid>
                  <Grid item lg={12} xs={12}>
                    <Field.Autocomplete
                      name="receivingDepartment"
                      label={t('reportExport.receivingDepartment')}
                      placeholder={t('reportExport.receivingDepartment')}
                      asyncRequest={(s) =>
                        //@TODO udpate api
                        searchWarehouseApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.name}
                    />
                  </Grid>
                  <Grid item lg={12} xs={12}>
                    <Field.DatePicker
                      name="fromDate"
                      label={t('reportExport.fromDate')}
                      placeholder={t('reportExport.fromDate')}
                      labelWidth={160}
                      required
                    />
                  </Grid>
                  <Grid item lg={12} xs={12}>
                    <Field.Autocomplete
                      name="fileFormat"
                      label={t('reportExport.fileFormat')}
                      placeholder={t('reportExport.fileFormat')}
                      labelWidth={160}
                      options={[]}
                      getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
                      getOptionValue={(opt) => opt?.id?.toString()}
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

export default ReportExport
