import React from 'react'

import { Grid, Box } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import { TRANSFER_STATUS_OPTIONS } from '~/modules/wmsx/constants'

const WarehouseTransferFilter = ({
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
                    <Field.TextField
                      name="code"
                      label={t('warehouseTransfer.code')}
                      placeholder={t('warehouseTransfer.code')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('warehouseTransfer.name')}
                      placeholder={t('warehouseTransfer.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="status"
                      label={t('warehouseTransfer.status')}
                      placeholder={t('warehouseTransfer.status')}
                      options={TRANSFER_STATUS_OPTIONS}
                      getOptionValue={(opt) => opt?.id?.toString()}
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

export default WarehouseTransferFilter