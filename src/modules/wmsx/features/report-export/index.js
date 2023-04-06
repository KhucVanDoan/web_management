import React, { useMemo, useState } from 'react'

import { Box, Grid } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { reportApi } from '~/services/api'
import { convertSortParams, getLocalItem } from '~/utils'
import { getFileNameFromHeader } from '~/utils/api'

import {
  REPORT_FILE_TYPE_OPTIONS,
  REPORT_TYPE,
  REPORT_TYPE_OPTIONS,
} from '../../constants'
import { searchConstructionsApi } from '../../redux/sagas/construction-management/search-constructions'
import { searchWarehouseApi } from '../../redux/sagas/define-warehouse/search-warehouse'
import { searchReceiptDepartmentApi } from '../../redux/sagas/receipt-department-management/search-receipt-department'
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
  const [isLoading, setIsLoading] = useState(false)
  // const {
  //   data: { isLoading },
  //   actions,
  // } = useReportExport()

  const initialValues = useMemo(
    () => ({
      type: '',
      company: null,
      time: [new Date(), new Date()],
      fileFormat: '',
    }),
    [],
  )

  const userInfo = getLocalItem('userInfo')

  const onSubmit = async (values) => {
    setIsLoading(true)
    if (values?.type === REPORT_TYPE.INVENTORY) {
      const convertValues = {
        reportType: values?.type,
        exportType: values?.fileFormat,
        companyCode: userInfo?.company?.code,
        constructionCode: values?.construction?.code,
        warehouseCode: values?.warehouse?.code,
        departmentReceiptCode: values?.receivingDepartment?.code,
        dateFrom: new Date(),
        dateTo: new Date(),
      }
      const uri = `/v1/reports/export`
      const res = await reportApi.get(uri, convertValues, {
        responseType: 'blob',
        getHeaders: true,
      })
      if (res) {
        setIsLoading(false)
        const filename = getFileNameFromHeader(res)
        const blob = new Blob([res?.data])
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        const nameFile = decodeURI(filename)
        link.setAttribute('download', nameFile)
        document.body.appendChild(link)
        link.click()
        URL.revokeObjectURL(url)
      }
    } else {
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
      const uri = `/v1/reports/export`
      const res = await reportApi.get(uri, convertValues, {
        responseType: 'blob',
        getHeaders: true,
      })
      if (res) {
        setIsLoading(false)
        const filename = getFileNameFromHeader(res)
        const blob = new Blob([res?.data])
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        const nameFile = decodeURI(filename)
        link.setAttribute('download', nameFile)
        document.body.appendChild(link)
        link.click()
        URL.revokeObjectURL(url)
      }
    }
  }

  const isConstructionEnabled = (type) =>
    [
      REPORT_TYPE.ORDER_IMPORT_INCOMPLETED,
      REPORT_TYPE.ORDER_EXPORT_INCOMPLETED,
      REPORT_TYPE.SITUATION_IMPORT_PERIOD,
      REPORT_TYPE.SITUATION_EXPORT_PERIOD,
    ].includes(type)

  const isDepartmentEnabled = (type) =>
    type === REPORT_TYPE.SITUATION_EXPORT_PERIOD

  const isTimeEnabled = (type) =>
    [
      REPORT_TYPE.ORDER_TRANSFER_INCOMPLETED,
      REPORT_TYPE.ORDER_EXPORT_INCOMPLETED,
      REPORT_TYPE.ORDER_IMPORT_INCOMPLETED,
      REPORT_TYPE.ITEM_IMPORTED_BUT_NOT_PUT_TO_POSITION,
      REPORT_TYPE.ITEM_INVENTORY,
      REPORT_TYPE.ITEM_INVENTORY_IMPORTED_NO_QR_CODE,
      REPORT_TYPE.ORDER_EXPORT_BY_REQUEST_FOR_ITEM,
      REPORT_TYPE.SITUATION_TRANSFER,
      REPORT_TYPE.SITUATION_INVENTORY_PERIOD,
      REPORT_TYPE.SITUATION_IMPORT_PERIOD,
      REPORT_TYPE.SITUATION_EXPORT_PERIOD,
      // REPORT_TYPE.STORED,
    ].includes(type)

  const handleChangeReportType = (type, setFieldValue) => {
    if (!isConstructionEnabled(type)) {
      setFieldValue('construction', null)
    }

    if (!isDepartmentEnabled(type)) {
      setFieldValue('receivingDepartment', null)
    }

    if (!isTimeEnabled(type)) {
      setFieldValue('time', [new Date(), new Date()])
    }
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
                      onChange={(type) =>
                        handleChangeReportType(type, setFieldValue)
                      }
                    />
                  </Grid>

                  {isConstructionEnabled(values?.type) && (
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
                  )}

                  <Grid item lg={12} xs={12}>
                    <Field.Autocomplete
                      name="warehouse"
                      label={t('reportExport.warehouse')}
                      placeholder={t('reportExport.warehouse')}
                      asyncRequest={(s) =>
                        searchWarehouseApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          sort: convertSortParams({
                            order: 'DESC',
                            orderBy: 'status',
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                    />
                  </Grid>

                  {isDepartmentEnabled(values?.type) && (
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
                  )}

                  {isTimeEnabled(values?.type) && (
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
