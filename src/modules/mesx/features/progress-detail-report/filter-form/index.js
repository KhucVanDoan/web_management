import React, { useEffect } from 'react'

import { Grid, Box } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import useDefineItem from '~/modules/database/redux/hooks/useDefineItem'
import { searchSaleOrdersApi } from '~/modules/database/redux/sagas/sale-order/search-sale-orders'
import useProducingStep from '~/modules/mesx/redux/hooks/useProducingStep'
import useProgressDetailReport from '~/modules/mesx/redux/hooks/useProgressDetailReport'
import useWorkCenter from '~/modules/mesx/redux/hooks/useWorkCenter'
import { searchMOApi } from '~/modules/mesx/redux/sagas/mo/search-mo'

import progressDetailReportSchema from '../schema'

function ProgressDetailReport() {
  const { t } = useTranslation(['mesx'])

  const {
    data: { itemList },
    actions: DefineItemActions,
  } = useDefineItem()
  const {
    data: { list },
    actions: producingStepActions,
  } = useProducingStep()
  const {
    data: { wcList },
    actions: workcenterActions,
  } = useWorkCenter()
  const { actions: actionProgress } = useProgressDetailReport()

  useEffect(() => {
    DefineItemActions.searchItems({ isGetAll: 1 })
    producingStepActions.searchProducingSteps({ isGetAll: 1 })
    workcenterActions.searchWorkCenter({ isGetAll: 1 })
  }, [])
  const initialValues = {
    soId: '',
    moId: '',
    producingStepId: '',
    itemId: '',
    workCenterId: '',
    created: '',
  }
  const onSubmit = (values) => {
    const params = {
      id: values?.soId?.id,
      itemId: values?.itemId,
      manufacturingOrderId: values?.moId?.id,
      producingStepId: values?.producingStepId,
      workCenterId: values?.workCenterId,
      dateFrom: values?.created[0],
      dateTo: values?.created[1],
    }
    actionProgress.getProgressDetailReport(params)
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={progressDetailReportSchema(t)}
      enableReinitialize
    >
      {({ resetForm }) => (
        <Form>
          <Grid container justifyContent="center">
            <Grid item xl={11} xs={12}>
              <Grid
                container
                rowSpacing={4 / 3}
                columnSpacing={{ xl: 8, xs: 4 }}
              >
                <Grid item lg={6} xs={12}>
                  <Field.Autocomplete
                    name="soId"
                    label={t('ProgessDetailReport.soName')}
                    placeholder={t('ProgessDetailReport.soName')}
                    asyncRequest={(s) =>
                      searchSaleOrdersApi({
                        keyword: s,
                        limit: ASYNC_SEARCH_LIMIT,
                      })
                    }
                    asyncRequestHelper={(res) => res?.data?.items}
                    getOptionLabel={(opt) => opt?.name}
                    required
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <Field.Autocomplete
                    name="moId"
                    label={t('ProgessDetailReport.moCode')}
                    placeholder={t('ProgessDetailReport.moCode')}
                    asyncRequest={(s) =>
                      searchMOApi({
                        keyword: s,
                        limit: ASYNC_SEARCH_LIMIT,
                      })
                    }
                    asyncRequestHelper={(res) => res?.data?.items}
                    getOptionLabel={(opt) => opt?.name}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <Field.Autocomplete
                    name="itemId"
                    label={t('ProgessDetailReport.itemName')}
                    placeholder={t('ProgessDetailReport.itemName')}
                    options={itemList || []}
                    getOptionValue={(opt) => opt?.id}
                    getOptionLabel={(opt) => opt?.name}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <Field.Autocomplete
                    name="producingStepId"
                    label={t('ProgessDetailReport.producingSteps')}
                    placeholder={t('ProgessDetailReport.producingSteps')}
                    options={list || []}
                    getOptionValue={(opt) => opt?.id}
                    getOptionLabel={(opt) => opt?.name}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <Field.Autocomplete
                    name="workCenterId"
                    label={t('ProgessDetailReport.workCenter')}
                    placeholder={t('ProgessDetailReport.workCenter')}
                    options={wcList || []}
                    getOptionValue={(opt) => opt?.id}
                    getOptionLabel={(opt) => opt?.name}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <Field.DateRangePicker
                    name="created"
                    label={t('ProgessDetailReport.time')}
                    placeholder={t('ProgessDetailReport.time')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      color="grayF4"
                      sx={{ mr: 1 }}
                      onClick={() => {
                        resetForm()
                      }}
                    >
                      {t('general:common.cancel')}
                    </Button>
                    <Button type="submit">{t('general:common.search')}</Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default ProgressDetailReport
