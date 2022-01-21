import React from 'react'
import { PropTypes } from 'prop-types'
import { Grid } from '@mui/material'
import { Field } from 'components/Formik'
import { BOQ_STATUS_OPTIONS } from 'common/constants'

const FilterForm = ({ filters, onChangeFilter }) => {
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label="Mã công trình"
          placeholder="Mã công trình"
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label="Tên công trình"
          placeholder="Tên công trình"
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField name="pmName" label="PM" placeholder="PM" />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="planFrom"
          label="Kế hoạch"
          placeholder="Kế hoạch"
          type="date"
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label="Trạng thái"
          placeholder="Trạng thái"
          options={BOQ_STATUS_OPTIONS.map((boq) => ({
            value: boq.id.toString(),
            label: boq.text,
          }))}
        />
      </Grid>
    </Grid>
  )
}

FilterForm.defaultProps = {
  filters: {},
}

FilterForm.propTypes = {
  filters: PropTypes.shape(),
}

export default FilterForm
