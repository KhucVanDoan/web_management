import React, { useEffect } from 'react'

import { Grid, Box } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import useCommonInfo from '~/modules/mmsx/redux/hooks/useCommonInfo'
import useDefineDevice from '~/modules/mmsx/redux/hooks/useDefineDevice'
import useDeviceCategory from '~/modules/mmsx/redux/hooks/useDeviceCategory'

const DeviceStatisticQuickFilter = ({
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
    data: { deviceList },
    actions: deviceAction,
  } = useDefineDevice()
  const {
    data: { factoryList, userList },
    actions: commonAction,
  } = useCommonInfo()

  useEffect(() => {
    actions.searchDeviceCategory()
    commonAction.getFactoryList({ isGetAll: 1 })
    deviceAction.searchDevice({ isGetAll: 1 })
    commonAction.getUserList({ isGetAll: 1 })
  }, [])
  return (
    <Formik initialValues={quickFilters} onSubmit={onSubmit} enableReinitialize>
      {({ resetForm }) => {
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
                      name="deviceId"
                      label={t('general.placeholder.deviceName')}
                      placeholder={t('general.placeholder.deviceName')}
                      options={deviceList}
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => opt?.code}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="userId"
                      label={t('general.placeholder.user')}
                      placeholder={t('general.placeholder.user')}
                      options={userList}
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => opt?.username}
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

export default DeviceStatisticQuickFilter
