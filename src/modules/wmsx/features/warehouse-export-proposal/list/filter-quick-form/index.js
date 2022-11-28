import React, { useState } from 'react'

import { Grid, Box } from '@mui/material'
import { endOfMonth, format, startOfMonth } from 'date-fns'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import DatePicker from '~/components/DatePicker'
import { Field } from '~/components/Formik'
import { WAREHOUSE_EXPORT_PROPOSAL_EXPORT_WAREHOUSE_STATUS_OPTION } from '~/modules/wmsx/constants'

const QuickFilter = ({ setQuickFilters, quickFilters, defaultFilter }) => {
  const { t } = useTranslation(['wmsx'])
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [selectedDate, setSelectedDate] = useState()

  const handleChangeSelect = (value) => {
    setSelectedDate(value)
    setStartDate(`${format(startOfMonth(value), 'yyyy-MM-dd')}T00:00:00.000Z`)
    setEndDate(`${format(endOfMonth(value), 'yyyy-MM-dd')}T23:59:59.999Z`)
  }
  const onSubmit = (values) => {
    setQuickFilters({
      ...quickFilters,
      startDate: startDate,
      endDate: endDate,
      exportStatus: values?.exportStatus,
    })
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
                    <DatePicker
                      views={['year', 'month']}
                      name="time"
                      value={selectedDate}
                      label={t('warehouseExportProposal.time')}
                      placeholder={t('warehouseExportProposal.time')}
                      onChange={handleChangeSelect}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="exportStatus"
                      label={t('warehouseExportProposal.statusWarehouseExport')}
                      placeholder={t(
                        'warehouseExportProposal.statusWarehouseExport',
                      )}
                      options={
                        WAREHOUSE_EXPORT_PROPOSAL_EXPORT_WAREHOUSE_STATUS_OPTION
                      }
                      getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
                      getOptionValue={(opt) => opt?.id?.toString()}
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
                          setStartDate('')
                          setEndDate('')
                          setSelectedDate('')
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

export default QuickFilter
