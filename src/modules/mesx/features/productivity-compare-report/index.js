import { useEffect, useState } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { MO_STATUS } from '~/modules/mesx/constants'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import useProductivityCompare from '~/modules/mesx/redux/hooks/useProductivityCompare'
import { ROUTE } from '~/modules/mesx/routes/config'

import ProductivityCompareChart from './chart/detail-productivity'
import OEECompareChart from './chart/oee'
import ProductivityCompareTable from './table/detail-productivity'
import OEECompareTable from './table/oee'
const breadcrumbs = [
  { title: 'report' },
  {
    route: ROUTE.PRODUCTIVITY_COMPARE_REPORT.PATH,
    title: ROUTE.PRODUCTIVITY_COMPARE_REPORT.TITLE,
  },
]
function ProductivityCompareReport() {
  const { t } = useTranslation(['mesx'])
  const [listItem, setListItem] = useState([])
  const [itemId, setItemId] = useState()
  const [listProducingSteps, setListProducingSteps] = useState([])
  const [isSubmit, setIsSubmit] = useState(false)

  const {
    data: { moList, moProducingStep },
    actions: actionMo,
  } = useMo()

  const { actions } = useProductivityCompare()

  useEffect(() => {
    refreshData()
  }, [])

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

  const initialValues = {
    moId: '',
    itemId: '',
    producingStepId: '',
  }

  const onSubmit = (values) => {
    setIsSubmit(true)
    const params = {
      manufacturingOrderId: values.moId,
      itemId: values.itemId,
      producingStepId: values.producingStepId,
    }
    actions.getReportProductivityCompare(
      params,
      () => setIsSubmit(false),
      () => setIsSubmit(false),
    )
  }

  const handleChangeMo = (id) => {
    actionMo.getListMoProducingStepById(id)
  }

  const renderHeaderRight = () => {
    return (
      //@TODO: <linh.taquang> handle export
      <Button variant="outlined" disabled icon="download">
        {t('productivityCompareReport.export')}
      </Button>
    )
  }
  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('productivityCompareReport.title')}
        renderHeaderRight={renderHeaderRight}
      >
        <Grid>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            // validationSchema={productivityReportSchema(t)}
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
                      columnSpacing={{ xl: 4, xs: 2 }}
                    >
                      <Grid item lg={4} xs={6}>
                        <Field.Autocomplete
                          name="moId"
                          label={t('productivityReport.moCode')}
                          placeholder={t('productivityReport.moCode')}
                          options={moList}
                          getOptionValue={(opt) => opt?.id}
                          getOptionLabel={(opt) => opt?.code}
                          labelWidth={120}
                          onChange={(id) => handleChangeMo(id)}
                        />
                      </Grid>
                      <Grid item lg={4} xs={6}>
                        <Field.Autocomplete
                          name="itemId"
                          label={t('productivityReport.itemName')}
                          placeholder={t('productivityReport.itemName')}
                          options={listItem}
                          getOptionValue={(opt) => opt?.itemId}
                          getOptionLabel={(opt) =>
                            opt?.itemId || opt?.item?.name
                          }
                          labelWidth={120}
                          onChange={(id) => setItemId(id)}
                        />
                      </Grid>
                      <Grid item lg={4} xs={6}>
                        <Field.Autocomplete
                          name="producingStepId"
                          label={t('productivityReport.producingSteps')}
                          placeholder={t('productivityReport.producingSteps')}
                          options={listProducingSteps}
                          getOptionValue={(opt) => opt?.producingStepId}
                          getOptionLabel={(opt) => opt?.producingStepName}
                          labelWidth={120}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item lg={2}>
                    <Button type="submit">{t('common.search')}</Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
          <Box mt={2}>
            <Box textAlign="center">
              <Typography variant="h3" color="primary">
                {t('productivityCompareReport.productivityWorkCenter')}
              </Typography>
            </Box>
            <ProductivityCompareChart isSubmit={isSubmit} />
          </Box>
          <Box mt={2}>
            <ProductivityCompareTable />
          </Box>
          <Box mt={2}>
            <Box textAlign="center">
              <Typography variant="h3" color="primary">
                {t('productivityCompareReport.oeeWorkCenter')}
              </Typography>
            </Box>
            <OEECompareChart isSubmit={isSubmit} />
          </Box>
          <Box mt={2}>
            <OEECompareTable />
          </Box>
        </Grid>
      </Page>
    </>
  )
}
export default ProductivityCompareReport
