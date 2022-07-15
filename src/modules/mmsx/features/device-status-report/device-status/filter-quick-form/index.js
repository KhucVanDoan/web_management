import React, { useEffect } from 'react'

import { Grid, Box } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import useWorkCenter from '~/modules/mesx/redux/hooks/useWorkCenter'
import useCommonInfo from '~/modules/mmsx/redux/hooks/useCommonInfo'
import useDeviceCategory from '~/modules/mmsx/redux/hooks/useDeviceCategory'

const DeviceStatusQuickFilter = ({
  setQuickFilters,
  quickFilters,
  defaultFilter,
}) => {
  const { t } = useTranslation(['mmsx'])

  const onSubmit = (values) => {
    setQuickFilters(values)
  }
  const {
    data: { deviceCategoryList },
    actions,
  } = useDeviceCategory()
  const {
    data: { factoryList },
    actions: commonAction,
  } = useCommonInfo()

  const {
    data: { wcList },
    actions: workCenterActions,
  } = useWorkCenter()
  useEffect(() => {
    actions.searchDeviceCategory()
    commonAction.getFactoryList({ isGetAll: 1 })
    workCenterActions.searchWorkCenter({ isGetAll: 1 })
  }, [])

  return (
    <Formik initialValues={quickFilters} onSubmit={onSubmit} enableReinitialize>
      {({ resetForm, values }) => {
        const workCenterList = wcList?.filter(
          (item) => item?.factory?.id === values?.factoryId,
        )
        return (
          <Form>
            <Grid container justifyContent="center" sx={{ mb: 4 }}>
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="deviceGroup"
                      label={t('general.placeholder.deviceGroup')}
                      placeholder={t('general.placeholder.deviceGroup')}
                      options={deviceCategoryList}
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => opt?.name}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="factoryId"
                      label={t('general.placeholder.factoryName')}
                      placeholder={t('general.placeholder.factoryName')}
                      options={factoryList}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionValue={(opt) => opt?.id}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="workshopId"
                      label={t('general.placeholder.workshopName')}
                      placeholder={t('general.placeholder.workshopName')}
                      options={workCenterList}
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => opt?.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        color="grayF4"
                        sx={{ mr: 1 }}
                        onClick={() => {
                          resetForm()
                          setQuickFilters(defaultFilter)
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

export default DeviceStatusQuickFilter
