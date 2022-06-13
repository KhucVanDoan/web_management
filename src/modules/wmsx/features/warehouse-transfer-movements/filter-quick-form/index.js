import React, { useEffect } from 'react'

import { Grid, Box } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import { TRANSFER_MOVEMENT_TYPE_OPTIONS } from '~/modules/wmsx/constants'
import useInventory from '~/modules/wmsx/redux/hooks/useInventory'

const WarehouseTransferMovementFilter = ({
  setQuickFilters,
  quickFilters,
  defaultFilter,
}) => {
  const { t } = useTranslation(['wmsx'])

  const onSubmit = (values) => {
    setQuickFilters(values)
  }
  const {
    data: { warehouseType },
    actions,
  } = useInventory()
  useEffect(() => {
    actions.getWarehouseType()
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
                      name="postedAt"
                      label={t('warehouseTransferMovement.dateRange')}
                      placeholder={t('warehouseTransferMovement.dateRange')}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="warehouseTypeId"
                      label={t('warehouseTransferMovement.warehouseType')}
                      placeholder={t('warehouseTransferMovement.warehouseType')}
                      options={warehouseType}
                      getOptionValue={(opt) => opt?.id?.toString()}
                      getOptionLabel={(opt) => t(opt?.name)}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="movementType"
                      label={t('warehouseTransferMovement.type')}
                      placeholder={t('warehouseTransferMovement.type')}
                      options={TRANSFER_MOVEMENT_TYPE_OPTIONS}
                      getOptionValue={(opt) => opt?.id?.toString()}
                      getOptionLabel={(opt) => t(opt?.name)}
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

export default WarehouseTransferMovementFilter
