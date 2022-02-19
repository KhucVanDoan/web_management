import React, { useState } from 'react'

import { DatePicker as MuiDatePicker } from '@mui/lab'
import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  InputAdornment,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import clsx from 'clsx'
import { PropTypes } from 'prop-types'

import Icon from '~/components/Icon'
import TextField from '~/components/TextField'
import { useClasses } from '~/themes'

import style from './style'

const DatePicker = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled,
  helperText,
  vertical,
  required,
  labelWidth,
  ...props
}) => {
  const classes = useClasses(style)
  const theme = useTheme()
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
        <MuiDatePicker
          open={open}
          onClose={() => setOpen(false)}
          label={label}
          value={value}
          onChange={onChange}
          PaperProps={{
            classes: {
              root: classes.paper,
            },
          }}
          PopperProps={{
            placement: 'bottom-start',
          }}
          renderInput={(params) => {
            return (
              <Box ref={params.inputRef}>
                <TextField
                  onClick={() => {
                    if (!disabled) setOpen(true)
                  }}
                  value={params.inputProps.value}
                  disabled={disabled}
                  readOnly
                  vertical
                  placeholder={placeholder}
                  error={error}
                  endAdornment={
                    <InputAdornment
                      position="end"
                      sx={{
                        pr: '10px',
                        cursor: disabled ? 'unset' : 'pointer',
                      }}
                    >
                      <Icon name="calendar" />
                    </InputAdornment>
                  }
                  sx={{
                    '& input': {
                      cursor: disabled ? 'unset' : 'pointer',
                    },
                    '& fieldset': {
                      borderColor: error
                        ? `${theme.palette.error.main} !important`
                        : open
                        ? `${theme.palette.borderField} !important`
                        : theme.palette.grayF4.main,
                    },
                    ...(!error &&
                      (open
                        ? {}
                        : {
                            '&:hover fieldset': {
                              borderColor: `${theme.palette.borderField} !important`,
                            },
                          })),
                  }}
                />
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

DatePicker.defaultProps = {
  placeholder: '',
  label: '',
  value: null,
  onChange: null,
  error: false,
  helperText: '',
  disabled: false,
  vertical: false,
  required: false,
  labelWidth: 160,
}

DatePicker.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.shape(),
  onChange: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  vertical: PropTypes.bool,
  required: PropTypes.bool,
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default DatePicker
