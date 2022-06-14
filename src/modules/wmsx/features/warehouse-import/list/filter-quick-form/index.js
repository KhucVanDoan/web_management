import React, { useEffect } from 'react'

import { Grid, createFilterOptions, Box } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import { WAREHOUSE_IMPORT_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useDefineWarehouse from '~/modules/wmsx/redux/hooks/useDefineWarehouse'

const WarehouseImportFilter = ({
  setQuickFilters,
  quickFilters,
  defaultFilter,
}) => {
  const { t } = useTranslation(['wmsx'])

  const onSubmit = (values) => {
    setQuickFilters(values)
  }
  const {
    data: { warehouseList },
    actions: warehouseActions,
  } = useDefineWarehouse()

  useEffect(() => {
    warehouseActions.searchWarehouses({ isGetAll: 1 })
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
                    <Field.DateRangePicker
                      name="createdAt"
                      label={t('movements.importExport.movementDate')}
                      placeholder={t('movements.importExport.movementDate')}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="warehouseId"
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
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="movementType"
                      label={t('movements.importExport.orderType')}
                      placeholder={t('movements.importExport.orderType')}
                      options={WAREHOUSE_IMPORT_STATUS_OPTIONS}
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => t(opt?.text)}
                    />
                  </Grid>

                  <Grid item lg={6} xs={12}>
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

export default WarehouseImportFilter
