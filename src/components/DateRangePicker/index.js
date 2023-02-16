import React, { useEffect, useRef, useState } from 'react'

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
  onTouch,
  disabled,
  error,
  helperText,
  vertical,
  required,
  labelWidth,
  showDaysOutsideCurrentMonth,
  ...props
}) => {
  const { t } = useTranslation()
  const classes = useClasses(style)
  const [open, setOpen] = useState(false)
  const ref = useRef(false)

  useEffect(() => {
    if (ref.current !== open) {
      if (ref.current) {
        onTouch(true)
        return
      }
      ref.current = open
    }
  }, [open])

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
          sx={{
            ...(vertical ? {} : { width: labelWidth }),
          }}
        >
          {label}
        </FormLabel>
      )}
      <Box
        sx={(theme) => ({
          flex: 1,
          minWidth: 0,
          '.hiddenInput:focus + div .fakeInput': {
            borderColor: theme.palette.primary.main,
          },
        })}
      >
        <input
          className="hiddenInput"
          style={{
            opacity: 0,
            width: 0,
            height: 0,
            margin: 0,
            padding: 0,
            overflow: 'hidden',
            position: 'absolute',
            pointerEvents: 'none',
          }}
          onBlur={() => onTouch(true)}
        />

        <MuiDateRangePicker
          open={open}
          onClose={() => setOpen(false)}
          value={value}
          onChange={(newValue) => onChange(newValue)}
          showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
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
                  [classes.focus]: open && !error,
                  fakeInput: !disabled && !error,
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
                  {value?.some((val) => !!val) && (
                    <Icon
                      name="close"
                      size={12}
                      sx={{ display: 'flex', opacity: 0, pr: '10px' }}
                      onClick={(e) => {
                        e.stopPropagation()
                        onChange([null, null])
                      }}
                    />
                  )}
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
  onChange: () => {},
  onTouch: () => {},
  disabled: false,
  error: false,
  helperText: '',
  vertical: false,
  required: false,
  labelWidth: 160,
  showDaysOutsideCurrentMonth: true,
}

DateRangePicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.array,
  onChange: PropTypes.func,
  onTouch: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  vertical: PropTypes.bool,
  required: PropTypes.bool,
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  showDaysOutsideCurrentMonth: PropTypes.bool,
}

export default DateRangePicker
