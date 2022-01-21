import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { DateRangePicker as MuiDateRangePicker } from '@mui/lab'
import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Typography,
} from '@mui/material'
import Icon from 'components/Icon'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import clsx from 'clsx'
import { useClasses } from 'themes'
import style from './style'
import { useTranslation } from 'react-i18next'

const DateRangePicker = ({
  label,
  value,
  onChange,
  disabled,
  error,
  helperText,
  vertical,
  required,
  ...props
}) => {
  const { t } = useTranslation()
  const classes = useClasses(style)
  const [open, setOpen] = useState(false)

  return (
    <FormControl
      className={clsx(classes.formControl, {
        [classes.vertical]: vertical,
        [classes.horizontal]: !vertical,
      })}
      fullWidth
      error={error}
    >
      {label && <FormLabel required={required}>{label} </FormLabel>}

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
                  <Typography component="span" noWrap>
                    {startValue ? startValue : t('dateRangePicker.from')}
                  </Typography>
                  <ArrowForwardIcon
                    sx={{ width: 18, height: 18, mx: 1 }}
                    color="disabled"
                  />
                  <Typography component="span" noWrap>
                    {endValue ? endValue : t('dateRangePicker.to')}
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
}

export default DateRangePicker
