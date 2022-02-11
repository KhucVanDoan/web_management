import React, { useState } from 'react'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { DateRangePicker as MuiDateRangePicker } from '@mui/lab'
import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Typography,
} from '@mui/material'
import clsx from 'clsx'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import Icon from '~/components/Icon'
import { useClasses } from '~/themes'

import style from './style'

const DateRangePicker = ({
  label,
  value,
  onChange,
  disabled,
  error,
  helperText,
  vertical,
  required,
  labelWidth,
  ...props
}) => {
  const { t } = useTranslation()
  const classes = useClasses(style)
  const [open, setOpen] = useState(false)

  return (
    <FormControl
      className={clsx(classes.formControl, {
        [classes.vertical]: vertical,
        [classes.horizontal]: !vertical && !!label,
      })}
      fullWidth
      error={error}
    >
      {label && (
        <FormLabel
          required={required}
          sx={{ ...(vertical ? {} : { width: labelWidth }) }}
        >
          {label}
        </FormLabel>
      )}
      <Box sx={{ flex: 1 }}>
        <MuiDateRangePicker
          open={open}
          onClose={() => setOpen(false)}
          value={value}
          onChange={(newValue) => onChange(newValue)}
          className={classes.paper}
          PopperProps={{
            placement: 'bottom-start',
          }}
          renderInput={(startProps, endProps) => {
            const startValue = startProps.inputProps.value
            const endValue = endProps.inputProps.value
            return (
              <Box
                className={clsx(classes.root, {
                  [classes.disabled]: disabled,
                  [classes.error]: error,
                })}
                sx={{ ...(disabled ? { pointerEvents: 'none' } : {}) }}
                onClick={() => {
                  if (!disabled) setOpen(true)
                }}
              >
                <Box className={classes.textField}>
                  <Typography
                    component="span"
                    noWrap
                    sx={{ color: startValue ? 'text.main' : 'text.a4' }}
                  >
                    {startValue || t('dateRangePicker.from')}
                  </Typography>
                  <ArrowForwardIcon
                    sx={{ width: 18, height: 18, mx: 1 }}
                    color="disabled"
                  />
                  <Typography
                    component="span"
                    noWrap
                    sx={{ color: endValue ? 'text.main' : 'text.a4' }}
                  >
                    {endValue || t('dateRangePicker.to')}
                  </Typography>
                </Box>
                <Box className={classes.iconCalendar}>
                  <Icon name="calendar" />
                </Box>
              </Box>
            )
          }}
          {...props}
        />
        {error && !!helperText && (
          <FormHelperText error>{helperText}</FormHelperText>
        )}
      </Box>
    </FormControl>
  )
}

DateRangePicker.defaultProps = {
  label: '',
  value: null,
  onChange: null,
  disabled: false,
  error: false,
  helperText: '',
  vertical: false,
  required: false,
  labelWidth: 1 / 3,
}

DateRangePicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.array,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  vertical: PropTypes.bool,
  required: PropTypes.bool,
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default DateRangePicker
