import React from 'react'

import {
  FormControl,
  FormHelperText,
  OutlinedInput,
  FormLabel,
  Box,
} from '@mui/material'
import clsx from 'clsx'
import { PropTypes } from 'prop-types'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { useClasses } from '~/themes'

import style from './style'

const TextField = ({
  label,
  helperText,
  className,
  error,
  required,
  multiline,
  disabled,
  InputProps,
  sx,
  vertical,
  labelWidth,
  readOnly,
  onBlur,
  onChange,
  allow,
  ...props
}) => {
  const classes = useClasses(style(readOnly))

  const handleChange = (e) => {
    let val = e.target.value
    if (allow === 'phone') {
      const truncatedVal = (e.target.value || '').slice(
        0,
        TEXTFIELD_REQUIRED_LENGTH.PHONE.MAX,
      )
      val = truncatedVal.replace(/[^0-9]/g, '')
    }
    onChange(val)
  }

  return (
    <FormControl
      className={clsx(className, classes.root, {
        [classes.disabled]: disabled,
        [classes.vertical]: vertical,
        [classes.horizontal]: !vertical && !!label,
        [classes.normal]: !error,
      })}
      fullWidth
      error={error}
      sx={sx}
    >
      {label && (
        <FormLabel
          required={required}
          sx={{ ...(vertical ? {} : { width: labelWidth }) }}
        >
          {label}
        </FormLabel>
      )}

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <OutlinedInput
          multiline={multiline}
          disabled={disabled}
          readOnly={readOnly}
          onBlur={onBlur}
          onChange={handleChange}
          fullWidth
          {...InputProps}
          {...props}
        />
        {error && !!helperText && (
          <FormHelperText error>{helperText}</FormHelperText>
        )}
      </Box>
    </FormControl>
  )
}

TextField.defaultProps = {
  className: '',
  label: '',
  helperText: '',
  error: false,
  readOnly: false,
  required: false,
  multiline: false,
  disabled: false,
  InputProps: {},
  sx: {},
  vertical: false,
  labelWidth: 160,
  onBlur: () => {},
  onChange: () => {},
}

TextField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  multiline: PropTypes.bool,
  disabled: PropTypes.bool,
  InputProps: PropTypes.shape(),
  sx: PropTypes.shape(),
  vertical: PropTypes.bool,
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  type: PropTypes.string,
}

export default TextField
