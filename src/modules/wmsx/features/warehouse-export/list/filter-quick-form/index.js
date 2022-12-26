import React from 'react'

import { Grid, Box } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import {
  WAREHOUSE_EXPORT_TYPE,
  WAREHOUSE_EXPORT_TYPE_OPTIONS,
} from '~/modules/wmsx/constants'
import { searchWarehouseApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouse'
import { convertSortParams } from '~/utils'

const WarehouseExportFilter = ({
  setQuickFilters,
  quickFilters,
  defaultFilter,
  setMomentsType,
}) => {
  const { t } = useTranslation(['wmsx'])

  const onSubmit = async (values) => {
    setQuickFilters(values)
  }

  const getMovementTypeList = (values) => {
    const orderType = values?.orderType
    switch (orderType) {
      case WAREHOUSE_EXPORT_TYPE.SO:
        return [
          {
            id: 'export',
            text: 'movementType.warehouseExportReceipt',
          },
          {
            id: 5,
            text: 'movementType.picked',
          },
        ]
      case WAREHOUSE_EXPORT_TYPE.INVENTORY:
        return [
          {
            id: 20,
            text: 'movementType.warehouseExportReceipt',
          },
          {
            id: 21,
            text: 'movementType.picked',
          },
        ]
      case WAREHOUSE_EXPORT_TYPE.TRANSFER:
        return [
          {
            id: 7,
            text: 'movementType.export',
          },
        ]
      case WAREHOUSE_EXPORT_TYPE.SWIFT_LOCATOR:
        return [
          {
            id: 17,
            text: 'movementType.picked',
          },
        ]
      default:
        break
    }
  }
  const hanldeChangeOrderType = (val, values, setFieldValue) => {
    if (val) {
      setMomentsType(val)
      switch (val) {
        case WAREHOUSE_EXPORT_TYPE.SO:
          return setFieldValue('movementType', null)
        case WAREHOUSE_EXPORT_TYPE.INVENTORY:
          return setFieldValue('movementType', null)
        case WAREHOUSE_EXPORT_TYPE.TRANSFER:
          return setFieldValue('movementType', 7)
        case WAREHOUSE_EXPORT_TYPE.SWIFT_LOCATOR:
          return setFieldValue('movementType', 17)
        default:
          break
      }
    }
  }
  return (
    <Formik initialValues={quickFilters} onSubmit={onSubmit} enableReinitialize>
      {({ values, resetForm, setFieldValue }) => {
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
                      maxDate={new Date()}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="warehouseId"
                      label={t('movements.importExport.warehouseName')}
                      placeholder={t('movements.importExport.warehouseName')}
                      asyncRequest={(s) =>
                        searchWarehouseApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          sort: convertSortParams({
                            order: 'DESC',
                            orderBy: 'status',
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                      multiple
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="orderType"
                      label={t('movements.importExport.receiptType')}
                      placeholder={t('movements.importExport.receiptType')}
                      options={WAREHOUSE_EXPORT_TYPE_OPTIONS}
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => t(opt?.text)}
                      clearIcon={false}
                      onChange={(val) =>
                        hanldeChangeOrderType(val, values, setFieldValue)
                      }
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="movementType"
                      label={t('movements.importExport.movementType')}
                      placeholder={t('movements.importExport.movementType')}
                      options={getMovementTypeList(values)}
                      getOptionValue={(opt) => opt?.id}
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

export default WarehouseExportFilter
