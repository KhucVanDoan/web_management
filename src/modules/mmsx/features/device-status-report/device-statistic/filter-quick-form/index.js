import React, { useEffect } from 'react'

import { Grid, Box } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'
import useWorkCenter from '~/modules/mesx/redux/hooks/useWorkCenter'
import { getAllUserList } from '~/modules/mmsx/redux/sagas/common/get-all-user'
import { searchDeviceListApi } from '~/modules/mmsx/redux/sagas/define-device/search-device-list'

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
    data: { wcList },
    actions: workCenterActions,
  } = useWorkCenter()
  useEffect(() => {
    //TODO:đợi làm refactor workCenters sẽ sửa
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
                      name="factoryId"
                      label={t('general.placeholder.factoryName')}
                      placeholder={t('general.placeholder.factoryName')}
                      asyncRequest={(s) =>
                        searchFactoriesApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(option) => option.name}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="workCenterId"
                      label={t('general.placeholder.workshopName')}
                      placeholder={t('general.placeholder.workshopName')}
                      options={workCenterList}
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => opt?.name}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="deviceId"
                      label={t('general.placeholder.deviceName')}
                      placeholder={t('general.placeholder.deviceName')}
                      asyncRequest={(s) =>
                        searchDeviceListApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(option) => option.code}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="assignUserId"
                      label={t('general.placeholder.user')}
                      placeholder={t('general.placeholder.user')}
                      asyncRequest={(s) =>
                        getAllUserList({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data}
                      getOptionLabel={(option) => option?.username}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
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
