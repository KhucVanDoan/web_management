import React, { useEffect } from 'react'

import { Grid, FormControlLabel, createFilterOptions, Box } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import useSaleOrder from '~/modules/database/redux/hooks/useSaleOrder'
import {
  MASTER_PLAN_STATUS,
  PROGRESS_ORDER_STATUS_OPTIONS,
} from '~/modules/mesx/constants'
import { searchMasterPlansApi } from '~/modules/mesx/redux/sagas/define-master-plan/search-master-plans'
import { convertFilterParams } from '~/utils'
const ProgressManufacturingFilter = ({ setFilters }) => {
  const { t } = useTranslation(['mesx'])

  const initialValues = {
    soIds: [],
    dateSell: '',
    status: '',
    deliveryDate: '',
    isHasPlan: false,
    masterPlanIds: [],
  }
  const onSubmit = (values) => {
    setFilters(values)
  }
  const {
    data: { saleOrderList },
    actions,
  } = useSaleOrder()

  useEffect(() => {
    actions.searchSaleOrders({ isGetAll: 1 })
  }, [])

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ setFieldValue, resetForm, values }) => {
        return (
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
                      name="soIds"
                      label={t('progressManufacturingByOrder.saleOrder')}
                      placeholder={t('progressManufacturingByOrder.saleOrder')}
                      options={saleOrderList}
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                      filterOptions={createFilterOptions({
                        stringify: (opt) => `${opt?.code}|${opt?.name}`,
                      })}
                      multiple
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.DateRangePicker
                      name="orderedAt"
                      label={t('progressManufacturingByOrder.dateSell')}
                      placeholder={t('progressManufacturingByOrder.dateSell')}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="status"
                      label={t('progressManufacturingByOrder.status')}
                      placeholder={t('progressManufacturingByOrder.status')}
                      options={PROGRESS_ORDER_STATUS_OPTIONS}
                      multiple
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => t(opt?.text)}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.DateRangePicker
                      name="deadline"
                      label={t('progressManufacturingByOrder.deliveryDate')}
                      placeholder={t(
                        'progressManufacturingByOrder.deliveryDate',
                      )}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={
                        <FormControlLabel
                          control={
                            <Field.Checkbox
                              onChange={(checked) => {
                                if (!checked) {
                                  setFieldValue('masterPlanIds', [])
                                }
                              }}
                              name="isHasPlan"
                            />
                          }
                          label={t('progressManufacturingByOrder.createdPlan')}
                        />
                      }
                      value={
                        <Field.Autocomplete
                          name="masterPlanIds"
                          disabled={!values.isHasPlan}
                          getOptionLabel={(opt) => opt?.code}
                          getOptionSubLabel={(opt) => opt?.name}
                          asyncRequest={(s) =>
                            searchMasterPlansApi({
                              keyword: s,
                              limit: ASYNC_SEARCH_LIMIT,
                              filter: convertFilterParams({
                                status: MASTER_PLAN_STATUS.CONFIRMED,
                              }),
                            })
                          }
                          multiple
                          asyncRequestHelper={(res) => res?.data?.masterPlans}
                          placeholder={t(
                            'progressManufacturingByOrder.planManufacturing',
                          )}
                        />
                      }
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.DateRangePicker
                      name="planDate"
                      label={t('progressManufacturingByOrder.datePlan')}
                      placeholder={t('progressManufacturingByOrder.datePlan')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        color="grayF4"
                        sx={{ mr: 1 }}
                        onClick={() => {
                          setFilters(initialValues)
                          resetForm()
                        }}
                      >
                        {t('general:common.cancel')}
                      </Button>
                      <Button type="submit">
                        {t('general:common.search')}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

export default ProgressManufacturingFilter
