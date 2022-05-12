import React, { useEffect } from 'react'

import { Grid, createFilterOptions, Box } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import { WAREHOUSE_IMPORT_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useDefineWarehouse from '~/modules/wmsx/redux/hooks/useDefineWarehouse'

function WarehouseImportFilter({ setFilters }) {
  const { t } = useTranslation('wmsx')

  const initialValues = {
    warehouseName: '',
    orderType: '',
    planDate: null,
  }

  const {
    data: { warehouseList },
    actions: warehouseActions,
  } = useDefineWarehouse()

  useEffect(() => {
    warehouseActions.searchWarehouses({ isGetAll: 1 })
  }, [])

  const onSubmit = (values) => {
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
                <Grid item xs={12} lg={6}>
                  <Field.Autocomplete
                    name="warehouseName"
                    label={t('movements.importExport.warehouseName')}
                    placeholder={t('movements.importExport.warehouseName')}
                    options={warehouseList}
                    getOptionValue={(opt) => opt?.id}
                    getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
                    filterOptions={createFilterOptions({
                      stringify: (opt) => `${opt?.code}|${opt?.name}`,
                    })}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Field.Autocomplete
                    name="orderType"
                    label={t('movements.importExport.orderType')}
                    placeholder={t('movements.importExport.orderType')}
                    options={WAREHOUSE_IMPORT_STATUS_OPTIONS}
                    getOptionValue={(opt) => opt?.id}
                    getOptionLabel={(opt) => t(opt?.text)}
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <Field.DateRangePicker
                    name="planDate"
                    label={t('movements.movementDateRange')}
                    placeholder={t('movements.movementDateRange')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      color="grayF4"
                      sx={{ ml: 'auto', mr: '8px' }}
                      onClick={() => {
                        handleReset()
                        setFilters(initialValues)
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

export default WarehouseImportFilter
