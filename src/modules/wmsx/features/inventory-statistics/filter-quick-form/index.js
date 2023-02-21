import React from 'react'

import { Grid, Box } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import { ACTIVE_STATUS } from '~/modules/wmsx/constants'
import { searchWarehouseApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouse'
import { searchLocationsApi } from '~/modules/wmsx/redux/sagas/location-management/search-locations'
import { searchMaterialsApi } from '~/modules/wmsx/redux/sagas/material-management/search-materials'
import { convertFilterParams } from '~/utils'

const InventoryStatisticFilter = ({
  setQuickFilters,
  quickFilters,
  defaultFilter,
}) => {
  const { t } = useTranslation(['wmsx'])
  const onSubmit = (values) => {
    setQuickFilters(values)
  }

  return (
    <Formik initialValues={quickFilters} onSubmit={onSubmit} enableReinitialize>
      {({ resetForm, values, setFieldValue }) => {
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
                      name="warehouseId"
                      label={t('inventoryStatistics.warehouseName')}
                      placeholder={t('inventoryStatistics.allWarehouse')}
                      asyncRequest={(s) =>
                        searchWarehouseApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            status: ACTIVE_STATUS.ACTIVE,
                            userWarehouse: ACTIVE_STATUS.ACTIVE,
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                      onChange={() => {
                        // setFieldValue('itemId', null)
                        setFieldValue('locatorId', null)
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="itemId"
                      label={t('inventoryStatistics.item')}
                      placeholder={t('inventoryStatistics.allItem')}
                      asyncRequest={(s) =>
                        searchMaterialsApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                      // asyncRequestDeps={values?.warehouseId}
                      // disabled={!values?.warehouseId}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="locatorId"
                      label={t('inventoryStatistics.location')}
                      placeholder={t('inventoryStatistics.allLocation')}
                      asyncRequest={(s) =>
                        searchLocationsApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            warehouseId: values?.warehouseId?.id,
                            type: Object.values(ACTIVE_STATUS).join(','),
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.code}
                      asyncRequestDeps={values?.warehouseId}
                      disabled={!values?.warehouseId}
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

export default InventoryStatisticFilter
