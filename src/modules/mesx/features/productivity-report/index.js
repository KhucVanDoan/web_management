import React, { useEffect, useState } from 'react'

import { Box, Divider, Grid } from '@mui/material'
import { Form, Formik } from 'formik'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import Tabs from '~/components/Tabs'
import { MO_STATUS } from '~/modules/mesx/constants'
import { ROUTE } from '~/modules/mesx/routes/config'

import { useMo } from '../../redux/hooks/useMo'
import useProductivityReport from '../../redux/hooks/useProductivityReport'
import ProductivityChart from './chart/detail-productivity'
import OEEChart from './chart/oee'
import productivityReportSchema from './schema'
import ProductivityTable from './table/detail-productivity'
import OEETable from './table/oee'
const breadcrumbs = [
  { title: 'report' },
  {
    route: ROUTE.PRODUCTIVITY_REPORT.PATH,
    title: ROUTE.PRODUCTIVITY_REPORT.TITLE,
  },
]

function ProductivityReport() {
  const { t } = useTranslation(['mesx'])
  const [listItem, setListItem] = useState([])
  const [itemId, setItemId] = useState()
  const [listProducingSteps, setListProducingSteps] = useState([])
  const [producingStepId, setProducingStepId] = useState()
  const [listWorkCenter, setlistWorkCenter] = useState([])

  const {
    data: { moList, moProducingStep },
    actions: actionMo,
  } = useMo()

  const {
    data: { data },
    actions,
  } = useProductivityReport()

  useEffect(() => {
    refreshData()
  }, [])
  const refreshData = () => {
    const filterData = [
      {
        column: 'status',
        text: MO_STATUS.IN_PROGRESS.toString(),
      },
    ]
    const params = {
      isGetAll: 1,
      filter: JSON.stringify(filterData),
    }
    actionMo.searchMO(params)
  }

  useEffect(() => {
    if (!isEmpty(moProducingStep)) {
      setListItem(moProducingStep?.moDetail[0]?.moPlanBom)
    }
  }, [moProducingStep])

  useEffect(() => {
    if (itemId) {
      const listProducingStep = listItem?.find(
        (i) => i.itemId === itemId,
      )?.workOrders
      setListProducingSteps(listProducingStep)
    }
  }, [itemId])

  useEffect(() => {
    if (producingStepId) {
      const listWorkCenter = listProducingSteps.find(
        (i) => i.producingStepId === producingStepId,
      )?.workCenters
      setlistWorkCenter(listWorkCenter)
    }
  }, [producingStepId])

  const initialValues = {
    moId: '',
    producingStepId: '',
    itemId: '',
    workCenterId: '',
  }
  const handleChangeMo = (id) => {
    actionMo.getListMoProducingStepById(id)
  }
  const handleChangeItem = (id) => {
    setItemId(id)
  }
  const handleChangeProducingStep = (id) => {
    setProducingStepId(id)
  }
  const onSubmit = (values) => {
    const params = {
      itemId: values?.itemId,
      manufacturingOrderId: values?.moId,
      producingStepId: values?.producingStepId,
      workCenterId: values?.workCenterId,
    }
    actions.getDataProductivityReport(params)
  }
  const renderHeaderRight = () => {
    // @TODO: <linh.taquang> handle export
    return (
      <Button variant="outlined" disabled icon="download">
        {t('productivityReport.export')}
      </Button>
    )
  }
  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('productivityReport.title')}
        renderHeaderRight={renderHeaderRight}
      >
        <Grid>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={productivityReportSchema(t)}
            enableReinitialize
          >
            {() => (
              <Form>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  <Grid item lg={10} display="flex">
                    <Grid
                      container
                      rowSpacing={4 / 3}
                      columnSpacing={{ xl: 8, xs: 4 }}
                    >
                      <Grid item lg={6} xs={12}>
                        <Field.Autocomplete
                          name="moId"
                          label={t('productivityReport.moCode')}
                          placeholder={t('productivityReport.moCode')}
                          options={moList}
                          getOptionValue={(opt) => opt?.id}
                          getOptionLabel={(opt) => opt?.code}
                          onChange={(id) => handleChangeMo(id)}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.Autocomplete
                          name="producingStepId"
                          label={t('productivityReport.producingSteps')}
                          placeholder={t('productivityReport.producingSteps')}
                          options={listProducingSteps}
                          getOptionValue={(opt) => opt?.producingStepId}
                          getOptionLabel={(opt) => opt?.producingStepName}
                          onChange={(id) => handleChangeProducingStep(id)}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.Autocomplete
                          name="itemId"
                          label={t('productivityReport.itemName')}
                          placeholder={t('productivityReport.itemName')}
                          options={listItem}
                          getOptionValue={(opt) => opt?.itemId}
                          getOptionLabel={(opt) =>
                            opt?.itemId || opt?.item?.name
                          }
                          onChange={(id) => handleChangeItem(id)}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.Autocomplete
                          name="workCenterId"
                          label={t('productivityReport.workCenter')}
                          placeholder={t('productivityReport.workCenter')}
                          options={listWorkCenter}
                          getOptionValue={(opt) => opt?.id}
                          getOptionLabel={(opt) => opt?.name}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item lg={2}>
                    <Button type="submit">{t('common.search')}</Button>
                  </Grid>
                </Grid>
                <Box mt={2}>
                  <Tabs
                    labels={[
                      t('productivityReport.productivityDetail'),
                      t('productivityReport.oee'),
                    ]}
                  >
                    {/* Tab 1 */}
                    <Box>
                      <ProductivityChart data={data} />
                      <Divider />
                      <ProductivityTable data={data} />
                    </Box>

                    {/* Tab 2 */}
                    <Box>
                      <OEEChart data={data} />
                      <Divider />
                      <OEETable data={data} />
                    </Box>
                  </Tabs>
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>
      </Page>
    </>
  )
}

export default ProductivityReport
