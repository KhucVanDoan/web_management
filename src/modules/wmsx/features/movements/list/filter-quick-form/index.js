import React from 'react'

import { Grid, Box } from '@mui/material'
import { add, sub } from 'date-fns'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import { ORDER_STATUS } from '~/modules/wmsx/constants'
import { searchWarehouseExportReceiptApi } from '~/modules/wmsx/redux/sagas/warehouse-export-receipt/search'
import { convertFilterParams } from '~/utils'

const MovementsFilter = ({
  setQuickFilters,
  defaultFilter,
  movementTypeOpts,
  setExportReceiptList,
  setMovement,
  warehouse,
}) => {
  const { t } = useTranslation(['wmsx'])
  const onSubmit = async (values) => {
    if (values?.movementType === 'export') {
      let createdAt = ''
      if (values?.createdAt[0] && !values?.createdAt[1]) {
        createdAt = `${values?.createdAt[0]?.toISOString()}|${add(
          values?.createdAt[0],
          {
            years: 0,
            months: 0,
            weeks: 0,
            days: 0,
            hours: 23,
            minutes: 59,
            seconds: 59,
          },
        )?.toISOString()}`
      } else if (values?.createdAt[1] && !values?.createdAt[0]) {
        createdAt = `${sub(values?.createdAt[1], {
          years: 0,
          months: 0,
          weeks: 0,
          days: 1,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })?.toISOString()}|${values?.createdAt[1]?.toISOString()}`
      } else if (values?.createdAt[0] && values?.createdAt[1]) {
        createdAt = `${values?.createdAt[0]?.toISOString()}|${values?.createdAt[1]?.toISOString()}`
      } else {
        createdAt = null
      }
      const response = await searchWarehouseExportReceiptApi({
        filter: convertFilterParams({
          status: [
            ORDER_STATUS.IN_COLLECTING,
            ORDER_STATUS.COLLECTED,
            ORDER_STATUS.COMPLETED,
          ],
          createdAt: createdAt,
        }),
      })
      setMovement('export')
      setExportReceiptList(response?.data?.items)
    } else {
      setMovement('')
      setExportReceiptList([])
      setQuickFilters({
        createdAt: values?.createdAt,
        movementType: values?.movementType,
      })
    }
  }

  return (
    <Formik
      initialValues={defaultFilter}
      onSubmit={onSubmit}
      enableReinitialize
    >
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
                      label={t('movements.importExport.executeDate')}
                      placeholder={t('movements.importExport.executeDate')}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="warehouseId"
                      label={t('movements.importExport.warehouseName')}
                      value={warehouse?.name}
                      disabled
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="movementType"
                      label={t('movements.importExport.movementType')}
                      placeholder={t('movements.importExport.movementType')}
                      options={movementTypeOpts}
                      getOptionValue={(opt) => opt?.type || opt?.id}
                      getOptionLabel={(opt) => t(opt?.text)}
                      clearIcon={false}
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

export default MovementsFilter
