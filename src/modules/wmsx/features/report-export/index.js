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
import { getLocalItem } from '~/utils'

import {
  REPORT_FILE_TYPE_OPTIONS,
  REPORT_TYPE,
  REPORT_TYPE_OPTIONS,
} from '../../constants'
import { searchConstructionsApi } from '../../redux/sagas/construction-management/search-constructions'
import { searchWarehouseApi } from '../../redux/sagas/define-warehouse/search-warehouse'
import { searchReceiptDepartmentApi } from '../../redux/sagas/receipt-department-management/search-receipt-department'
import { exportReportApi } from '../../redux/sagas/report-export/export-report'
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
  } = useReportExport()

  const initialValues = {
    type: '',
    company: null,
    time: [new Date(), new Date()],
    fileFormat: '',
  }

  const userInfo = getLocalItem('userInfo')

  const onSubmit = (values) => {
    const convertValues = {
      reportType: values?.type,
      exportType: values?.fileFormat,
      companyCode: userInfo?.company?.code,
      constructionCode: values?.construction?.code,
      warehouseCode: values?.warehouse?.code,
      departmentReceiptCode: values?.receivingDepartment?.code,
      dateFrom: values?.time?.[0]?.toISOString(),
      dateTo: values?.time?.[1]?.toISOString(),
    }
    exportReportApi(convertValues)
  }

  const isTimeRequired = (type) =>
    ![
      REPORT_TYPE.INVENTORY,
      REPORT_TYPE.SITUATION_INVENTORY_PERIOD,
      REPORT_TYPE.ITEM_INVENTORY_BELOW_MINIMUM,
      REPORT_TYPE.ITEM_INVENTORY_BELOW_SAFE,
    ].includes(type)

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
        {({ handleReset, setFieldValue, values }) => (
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
                      options={REPORT_TYPE_OPTIONS}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => t(opt?.text)}
                      getOptionValue={(opt) => opt?.id}
                      required
                      onChange={(val) => {
                        if (!isTimeRequired(val)) {
                          setFieldValue('time', [new Date(), new Date()])
                        }
                      }}
                    />
                  </Grid>
                  {/* <Grid item lg={12} xs={12}>
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
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                      required
                    />
                  </Grid> */}
                  <Grid item lg={12} xs={12}>
                    <Field.Autocomplete
                      name="construction"
                      label={t('reportExport.construction')}
                      placeholder={t('reportExport.construction')}
                      asyncRequest={(s) =>
                        searchConstructionsApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
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
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                    />
                  </Grid>
                  <Grid item lg={12} xs={12}>
                    <Field.Autocomplete
                      name="receivingDepartment"
                      label={t('reportExport.receivingDepartment')}
                      placeholder={t('reportExport.receivingDepartment')}
                      asyncRequest={(s) =>
                        searchReceiptDepartmentApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                      disabled={
                        values?.type !== REPORT_TYPE.SITUATION_EXPORT_PERIOD
                      }
                    />
                  </Grid>

                  {isTimeRequired(values?.type) && (
                    <Grid item lg={12} xs={12}>
                      <Field.DateRangePicker
                        name="time"
                        label={t('reportExport.time')}
                        placeholder={t('reportExport.time')}
                        required
                      />
                    </Grid>
                  )}

                  <Grid item lg={12} xs={12}>
                    <Field.Autocomplete
                      name="fileFormat"
                      label={t('reportExport.fileFormat')}
                      placeholder={t('reportExport.fileFormat')}
                      labelWidth={160}
                      options={REPORT_FILE_TYPE_OPTIONS}
                      getOptionLabel={(opt) => t(opt?.text)}
                      getOptionValue={(opt) => opt?.id}
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
