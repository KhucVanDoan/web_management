import React, { useEffect } from 'react'

import { Grid, Box } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import useDefineWarehouse from '~/modules/wmsx/redux/hooks/useDefineWarehouse'
import useWarehouseSpaceReport from '~/modules/wmsx/redux/hooks/useWarehouseSpaceReport'
import { convertFilterParams } from '~/utils'

function FilterForm() {
  const { t } = useTranslation('wmsx')

  const initialValues = {
    factoryId: '',
    warehouseId: '',
  }

  const {
    data: { factories },
    actions,
  } = useWarehouseSpaceReport()

  const {
    data: { warehouseList },
    actions: actionsWarehouseList,
  } = useDefineWarehouse()

  useEffect(() => {
    const params = { isGetAll: 1 }
    actions.getFactories(params)
  }, [])

  const onSubmit = (values) => {
    if (!values?.warehouseId) return

    actions.getDataWarehouseSpaceReport({
      warehouseId: values?.warehouseId,
    })
  }

  const getWarehouseByFactory = (id) => {
    const params = {
      filter: convertFilterParams({ factoryIds: id }),
    }
    actionsWarehouseList.searchWarehouses(params)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ handleReset, setFieldValue }) => (
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
                    name="factoryId"
                    label={t('warehouseSpaceReport.factory')}
                    placeholder={t('warehouseSpaceReport.factory')}
                    options={factories?.items}
                    getOptionValue={(opt) => opt?.id}
                    getOptionLabel={(opt) => opt?.name}
                    onChange={(val) => {
                      if (!val) {
                        setFieldValue('warehouseId', '')
                        actionsWarehouseList.resetWarehouseListState()
                      } else {
                        getWarehouseByFactory(val)
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Field.Autocomplete
                    name="warehouseId"
                    label={t('warehouseSpaceReport.warehouseName')}
                    placeholder={t('warehouseSpaceReport.warehouseName')}
                    options={warehouseList}
                    getOptionValue={(opt) => opt?.id}
                    getOptionLabel={(opt) => opt?.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      color="grayF4"
                      sx={{ ml: 'auto', mr: '8px' }}
                      onClick={() => {
                        handleReset()
                        actionsWarehouseList.resetWarehouseListState()
                        actions.resetWarehouseSpaceReportListState()
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

export default FilterForm
