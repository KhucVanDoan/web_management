import React, { useEffect } from 'react'

import { Grid, createFilterOptions } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import { PROGRESS_MANUFACTURING_BY_WORK_CENTER_STATUS_OPTIONS } from '~/modules/mesx/constants'
import { useDefineMasterPlan } from '~/modules/mesx/redux/hooks/useDefineMasterPlan'
import useWorkCenter from '~/modules/mesx/redux/hooks/useWorkCenter'

function ProgressManufacturingByWorkCenterForm({ setFilters }) {
  const { t } = useTranslation('mesx')

  const {
    data: { wcList },
    actions: workCenterActions,
  } = useWorkCenter()

  const {
    data: { masterPlanList },
    actions: masterPlanActions,
  } = useDefineMasterPlan()

  const initialValues = {
    workCenterName: '',
    status: '',
    masterPlan: '',
    planDate: null,
  }

  useEffect(() => {
    workCenterActions.searchWorkCenter({ isGetAll: 1 })
    masterPlanActions.searchMasterPlans({ isGetAll: 1 })
  }, [])

  const onSubmit = (values) => {
    // console.log('values', values)
    setFilters(values)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ handleReset }) => (
        <Form>
          <Grid container justifyContent="center" mb={2}>
            <Grid item xl={11} xs={12}>
              <Grid
                container
                rowSpacing={4 / 3}
                columnSpacing={{ xl: 8, xs: 4 }}
              >
                <Grid item xs={12} lg={5}>
                  <Field.Autocomplete
                    name="workCenterName"
                    label={t(
                      'progressManufacturingByWorkCenter.workCenterName',
                    )}
                    placeholder={t(
                      'progressManufacturingByWorkCenter.workCenterName',
                    )}
                    options={wcList}
                    getOptionValue={(opt) => opt?.id}
                    getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
                    filterOptions={createFilterOptions({
                      stringify: (opt) => `${opt?.code}|${opt?.name}`,
                    })}
                  />
                </Grid>
                <Grid item xs={12} lg={5}>
                  <Field.Autocomplete
                    name="status"
                    label={t('userManagement.status')}
                    placeholder={t('userManagement.status')}
                    options={
                      PROGRESS_MANUFACTURING_BY_WORK_CENTER_STATUS_OPTIONS
                    }
                    getOptionValue={(opt) => opt?.id}
                    getOptionLabel={(opt) => t(opt?.text)}
                  />
                </Grid>
                <Grid item xs={12} lg={2}>
                  <Button type="submit">{t('common.search')}</Button>
                </Grid>
                <Grid item xs={12} lg={5}>
                  <Field.Autocomplete
                    name="masterPlan"
                    label={t('progressManufacturingByWorkCenter.masterPlan')}
                    placeholder={t(
                      'progressManufacturingByWorkCenter.masterPlan',
                    )}
                    options={masterPlanList}
                    getOptionValue={(opt) => opt?.id}
                    getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
                    filterOptions={createFilterOptions({
                      stringify: (opt) => `${opt?.code}|${opt?.name}`,
                    })}
                  />
                </Grid>
                <Grid item xs={12} lg={5}>
                  <Field.DateRangePicker
                    name="planDate"
                    label={t('progressManufacturingByWorkCenter.planDate')}
                    placeholder={t(
                      'progressManufacturingByWorkCenter.planDate',
                    )}
                  />
                </Grid>
                <Grid item xs={12} lg={2}>
                  <Button
                    variant="outlined"
                    color="subText"
                    sx={{ width: 110 }}
                    onClick={() => {
                      handleReset()
                      setFilters(initialValues)
                    }}
                  >
                    {t('common.cancel')}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default ProgressManufacturingByWorkCenterForm
