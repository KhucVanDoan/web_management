import React, { useEffect } from 'react'

import { Grid, Box } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import useItemType from '~/modules/database/redux/hooks/useItemType'
import useDefineWarehouse from '~/modules/wmsx/redux/hooks/useDefineWarehouse'

const InventoryStatisticFilter = ({
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

  const {
    data: { itemTypeList },
    actions: actionsItemType,
  } = useItemType()

  useEffect(() => {
    warehouseActions.searchWarehouses({ isGetAll: 1 })
    actionsItemType.searchItemTypes({ isGetAll: 1 })
  }, [])

  return (
    <Formik initialValues={quickFilters} onSubmit={onSubmit} enableReinitialize>
      {({ resetForm }) => {
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
                    <Field.DatePicker
                      name="reportDate"
                      label={t('inventoryStatistics.reportDate')}
                      placeholder={t('inventoryStatistics.reportDate')}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="itemTypeId"
                      label={t('inventoryStatistics.itemType')}
                      placeholder={t('inventoryStatistics.itemType')}
                      options={itemTypeList}
                      getOptionValue={(opt) => opt?.id || ''}
                      getOptionLabel={(opt) => opt?.name}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="warehouseId"
                      label={t('inventoryStatistics.warehouseName')}
                      placeholder={t('inventoryStatistics.warehouseName')}
                      options={warehouseList}
                      getOptionValue={(opt) => opt?.id || ''}
                      getOptionLabel={(opt) => opt?.name}
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

export default InventoryStatisticFilter
