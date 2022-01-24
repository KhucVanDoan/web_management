/* eslint-disable import/order */
import React from 'react'

import { Box, FormControl, FormHelperText } from '@mui/material'
import withStyles from '@mui/styles/withStyles'
// import { DatePicker } from '@material-ui/pickers' // @TODO: use mui v5 instead;

import { isAfter } from 'date-fns'
import { isBefore } from 'date-fns/esm'
import { withTranslation } from 'react-i18next'
import { formatDateTimeUtc } from '~/utils'

import useStyles from './style'

/**
 * Date range picker
 * @param {object} props
 * @returns
 */
const DateRangePicker = ({
  t,
  from,
  to,
  fromName = 'from',
  toName = 'to',
  isRequiredFrom = true,
  isRequiredTo = true,
  minDate = null,
  maxDate = null,
  onChangeFrom,
  onChangeTo,
  isSubmitForm,
  isDisabled,
  format = 'MM/dd/yyyy',
}) => {
  return (
    <FormControl fullWidth>
      <Box display="flex" justifyContent="center">
        <Box>
          {/* <DatePicker
            name={fromName}
            inputVariant="outlined"
            format={format}
            margin="dense"
            size="small"
            value={from}
            error={false}
            disabled={isDisabled}
            onChange={onChangeFrom}
          /> */}
        </Box>

        <Box mx={1} display="flex" alignItems="center">
          {t('form.to')}
        </Box>
        <Box>
          {/* <DatePicker
            name={toName}
            inputVariant="outlined"
            format={format}
            margin="dense"
            size="small"
            value={to}
            error={false}
            disabled={isDisabled}
            onChange={onChangeTo}
          /> */}
        </Box>
      </Box>

      {/* check isValid to show messages */}
      {isSubmitForm && isRequiredFrom && !from && (
        <FormHelperText error>{t('form.required')}</FormHelperText>
      )}

      {isSubmitForm && isRequiredTo && from && !to && (
        <FormHelperText error>{t('form.required')}</FormHelperText>
      )}

      {from &&
        minDate &&
        !maxDate &&
        isSubmitForm &&
        isBefore(from, minDate) && (
          <FormHelperText error>
            {t('form.minDate', { from: formatDateTimeUtc(minDate, format) })}
          </FormHelperText>
        )}

      {to && maxDate && !minDate && isSubmitForm && isAfter(to, maxDate) && (
        <FormHelperText error>
          {t('form.maxDate', { to: formatDateTimeUtc(maxDate, format) })}
        </FormHelperText>
      )}

      {from && to && isAfter(from, to) && (
        <FormHelperText error>{t('form.invalidDateRange')}</FormHelperText>
      )}
    </FormControl>
  )
}

export default withTranslation()(withStyles(useStyles)(DateRangePicker))
