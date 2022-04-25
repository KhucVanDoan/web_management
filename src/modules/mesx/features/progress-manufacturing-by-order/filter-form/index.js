import React, { useEffect, useState } from 'react'

import { Grid, FormControlLabel, createFilterOptions } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import { PROGRESS_MANUFACTURING_BY_ORDER_STATUS_OPTION } from '~/modules/mesx/constants'
import useSaleOrder from '~/modules/mesx/redux/hooks/useSaleOrder'
import { searchMasterPlansApi } from '~/modules/mesx/redux/sagas/define-master-plan/search-master-plans'
const ProgressManufacturingFilter = ({ setFilters }) => {
  const { t } = useTranslation(['mesx'])
  const [isPlanManufacturing, setIsManufacturing] = useState(false)

  const initialValues = {
    soIds: [],
    dateSell: '',
    status: '',
    deliveryDate: '',
    isHasPlan: '',
    planManufacturing: {},
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
      {({ setFieldValue, resetForm }) => {
        return (
          <Form>
            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  <Grid item lg={5} xs={12}>
                    <Field.Autocomplete
                      name="soIds"
                      label={t('progressManufacturingByOrder.saleOrder')}
                      placeholder={t('progressManufacturingByOrder.saleOrder')}
                      options={saleOrderList}
                      multiple
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
                      filterOptions={createFilterOptions({
                        stringify: (opt) => `${opt?.code}|${opt?.name}`,
                      })}
                    />
                  </Grid>
                  <Grid item lg={5} xs={12}>
                    <Field.DateRangePicker
                      name="orderedAt"
                      label={t('progressManufacturingByOrder.dateSell')}
                      placeholder={t('progressManufacturingByOrder.dateSell')}
                    />
                  </Grid>
                  <Grid item lg={2} xs={12}>
                    <Button type="submit">{t('common.search')}</Button>
                  </Grid>
                  <Grid item lg={5} xs={12}>
                    <Field.Autocomplete
                      name="status"
                      label={t('progressManufacturingByOrder.status')}
                      placeholder={t('progressManufacturingByOrder.status')}
                      options={PROGRESS_MANUFACTURING_BY_ORDER_STATUS_OPTION}
                      getOptionValue={(opt) => opt?.id?.toString()}
                      getOptionLabel={(opt) => t(opt?.text)}
                    />
                  </Grid>
                  <Grid item lg={5} xs={12}>
                    <Field.DateRangePicker
                      name="deadline"
                      label={t('progressManufacturingByOrder.deliveryDate')}
                      placeholder={t(
                        'progressManufacturingByOrder.deliveryDate',
                      )}
                    />
                  </Grid>
                  <Grid item lg={2} xs={12}>
                    <Button
                      variant="outlined"
                      color="subText"
                      sx={{ width: 110 }}
                      onClick={() => {
                        setFilters(initialValues)
                        resetForm()
                      }}
                    >
                      {t('common.cancel')}
                    </Button>
                  </Grid>
                  <Grid item lg={5} xs={12} sx={{ display: 'flex' }}>
                    <Grid item lg={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Field.Checkbox
                            checked={isPlanManufacturing}
                            onChange={(values) => {
                              setIsManufacturing(!isPlanManufacturing)
                              if (!values) {
                                setFieldValue('planManufacturing', {})
                              }
                            }}
                            name="isHasPlan"
                          />
                        }
                        label={t('progressManufacturingByOrder.createdPlan')}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="planManufacturing"
                        disabled={!isPlanManufacturing}
                        getOptionLabel={(opt) => opt?.code}
                        getOptionSubLabel={(opt) => opt?.name}
                        asyncRequest={(s) =>
                          searchMasterPlansApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.masterPlans}
                        placeholder={t(
                          'progressManufacturingByOrder.planManufacturing',
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid item lg={5} xs={12}>
                    <Field.DateRangePicker
                      name="planDate"
                      label={t('progressManufacturingByOrder.datePlan')}
                      placeholder={t('progressManufacturingByOrder.datePlan')}
                    />
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
