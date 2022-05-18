import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useRouteMatch } from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import useDefineFactory from '~/modules/database/redux/hooks/useDefineFactory'
import useDefineWarehouse from '~/modules/wmsx/redux/hooks/useDefineWarehouse'
import useWarehouseReport from '~/modules/wmsx/redux/hooks/useWarehouseReport'
import { ROUTE } from '~/modules/wmsx/routes/config'

import { defineWarehouseReportSchema } from './schema'

const WarehouseReportForm = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()

  const {
    data: { isLoading },
    actions,
  } = useWarehouseReport()

  const {
    data: { factoryList },
    actions: actionFactory,
  } = useDefineFactory()

  const {
    data: { warehouseList },
    actions: actionWarehouse,
  } = useDefineWarehouse()

  const initialValues = {
    code: '',
    name: '',
    description: '',
    periodReport: null,
    warehouseIds: [],
    factoryIds: [],
  }

  const MODE_MAP = {
    [ROUTE.WAREHOUSE_REPORT.CREATE.PATH]: MODAL_MODE.CREATE,
  }
  const mode = MODE_MAP[routeMatch.path]

  const breadcrumbs = [
    {
      title: ROUTE.WAREHOUSE_REPORT_MANAGEMENT.TITLE,
    },
    {
      route: ROUTE.WAREHOUSE_REPORT.LIST.PATH,
      title: ROUTE.WAREHOUSE_REPORT.LIST.TITLE,
    },
    {
      route: ROUTE.WAREHOUSE_REPORT.CREATE.PATH,
      title: ROUTE.WAREHOUSE_REPORT.CREATE.TITLE,
    },
  ]

  useEffect(() => {
    actionFactory.searchFactories({ isGetAll: 1 })
    actionWarehouse.searchWarehouses({ isGetAll: 1 })
  }, [])

  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_REPORT.LIST.PATH)
  }

  const onSubmit = (values) => {
    actions.createWarehouseReport(
      {
        ...values,
        startDate: values?.periodReport ? values?.periodReport[0] : '',
        endDate: values?.periodReport ? values?.periodReport[1] : '',
      },
      () => backToList(),
    )
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
      default:
        break
    }
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseReportCreate')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={defineWarehouseReportSchema(t)}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ handleReset, values }) => (
              <Form>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('warehouseReport.code')}
                      name="code"
                      placeholder={t('warehouseReport.code')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_9.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('warehouseReport.name')}
                      placeholder={t('warehouseReport.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="factoryIds"
                      label={t('warehouseReport.factoryName')}
                      placeholder={t('warehouseReport.factoryName')}
                      options={factoryList || []}
                      getOptionLabel={(option) => t(option?.name)}
                      getOptionValue={(option) => option?.id}
                      multiple
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="warehouseIds"
                      label={t('warehouseReport.warehouseName')}
                      placeholder={t('warehouseReport.warehouseName')}
                      options={
                        warehouseList?.filter((i) =>
                          values.factoryIds.includes(i.factoryId),
                        ) || []
                      }
                      getOptionLabel={(option) => t(option?.name)}
                      getOptionValue={(option) => option?.id}
                      multiple
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.DateRangePicker
                      name="periodReport"
                      label={t('warehouseReport.periodReport')}
                      placeholder={t('warehouseReport.periodReport')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6} />
                  <Grid item xs={12}>
                    <Field.TextField
                      name="note"
                      label={t('warehouseReport.description')}
                      placeholder={t('warehouseReport.description')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
                {renderActionBar(handleReset)}
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default WarehouseReportForm
