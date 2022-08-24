import React, { useEffect } from 'react'

import { Grid, Box } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import { searchSaleOrdersApi } from '~/modules/database/redux/sagas/sale-order/search-sale-orders'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import useProgressDetailReport from '~/modules/mesx/redux/hooks/useProgressDetailReport'
import { searchMOApi } from '~/modules/mesx/redux/sagas/mo/search-mo'

import progressDetailReportSchema from '../schema'

function ProgressDetailReport() {
  const { t } = useTranslation(['mesx'])

  const {
    data: { moProducingStep },
    actions: actionMo,
  } = useMo()

  const { actions: actionProgress } = useProgressDetailReport()
  useEffect(() => {
    return () => {
      actionMo.resetMoProducingStep()
    }
  }, [])

  const getItemList = (moId) => {
    if (!moId) return []
    return moProducingStep?.moDetail?.map((item) => item.moPlanBom).flat() || []
  }

  const getProducingStepList = (moId, itemId) => {
    if (!moId || !itemId) return []

    const itemList = getItemList(moId)
    return itemList?.find((i) => i.itemId === itemId)?.workOrders || []
  }

  const getWorkCenterList = (moId, itemId, producingStepId) => {
    if (!moId || !producingStepId || !itemId) return []

    const producingStepList = getProducingStepList(moId, itemId)
    return (
      producingStepList.find((i) => i.producingStepId === producingStepId)
        ?.workCenters || []
    )
  }

  const initialValues = {
    soId: null,
    moId: '',
    producingStepId: '',
    itemId: '',
    workCenterId: '',
    created: '',
  }
  const onSubmit = (values) => {
    const params = {
      id: values?.soId?.id || null,
      itemIds: values?.itemId || null,
      moIds: values?.moId?.id || null,
      producingStepIds: values?.producingStepId || null,
      workCenterIds: values?.workCenterId || null,
      dateFrom: values?.created[0] || null,
      dateTo: values?.created[1] || null,
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
      {({ resetForm, values, setFieldValue }) => (
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
                    onChange={() => {
                      setFieldValue('moId', '')
                      setFieldValue('itemId', '')
                      setFieldValue('producingStepId', '')
                      setFieldValue('workCenterId', '')
                    }}
                    required
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <Field.Autocomplete
                    name="moId"
                    label={t('productivityReport.moCode')}
                    placeholder={t('productivityReport.moCode')}
                    asyncRequest={(s) =>
                      searchMOApi({
                        keyword: s,
                        limit: ASYNC_SEARCH_LIMIT,
                        filter: values?.soId
                          ? JSON.stringify([
                              {
                                column: 'saleOrderIds',
                                text: [values?.soId?.id],
                              },
                            ])
                          : [],
                      })
                    }
                    disabled={!values?.soId}
                    asyncRequestHelper={(res) => res?.data?.items}
                    getOptionLabel={(opt) => opt?.code}
                    asyncRequestDeps={values?.soId}
                    onChange={(val) => {
                      if (val) {
                        actionMo.getListMoProducingStepById(val?.id)
                      } else {
                        actionMo.resetMoProducingStep()
                      }
                      setFieldValue('itemId', '')
                      setFieldValue('producingStepId', '')
                      setFieldValue('workCenterId', '')
                    }}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <Field.Autocomplete
                    name="itemId"
                    label={t('productivityReport.itemName')}
                    placeholder={t('productivityReport.itemName')}
                    options={getItemList(values.moId)}
                    getOptionValue={(opt) => opt?.itemId}
                    getOptionLabel={(opt) => opt?.itemName || opt?.item?.name}
                    onChange={() => {
                      setFieldValue('producingStepId', '')
                      setFieldValue('workCenterId', '')
                    }}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <Field.Autocomplete
                    name="producingStepId"
                    label={t('productivityReport.producingSteps')}
                    placeholder={t('productivityReport.producingSteps')}
                    options={getProducingStepList(values.moId, values.itemId)}
                    getOptionValue={(opt) => opt?.producingStepId}
                    getOptionLabel={(opt) => opt?.producingStepName}
                    onChange={() => {
                      setFieldValue('workCenterId', '')
                    }}
                  />
                </Grid>

                <Grid item lg={6} xs={12}>
                  <Field.Autocomplete
                    name="workCenterId"
                    label={t('productivityReport.workCenter')}
                    placeholder={t('productivityReport.workCenter')}
                    options={getWorkCenterList(
                      values.moId,
                      values.itemId,
                      values.producingStepId,
                    )}
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
