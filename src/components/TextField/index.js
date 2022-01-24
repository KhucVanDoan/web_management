import React from 'react'

import {
  FormControl,
  FormHelperText,
  OutlinedInput,
  FormLabel as MuiFormLabel,
  Box,
} from '@mui/material'
import clsx from 'clsx'
import { PropTypes } from 'prop-types'

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
  ...props
}) => {
  const classes = useClasses(style)

  return (
    <FormControl
      className={clsx(className, classes.root, {
        [classes.disabled]: disabled,
        [classes.vertical]: vertical,
        [classes.horizontal]: !vertical,
        [classes.normal]: !error,
      })}
      fullWidth
      error={error}
      sx={sx}
    >
      {label && <MuiFormLabel required={required}>{label} </MuiFormLabel>}

      <Box sx={{ flex: 1 }}>
        <OutlinedInput
          multiline={multiline}
          disabled={disabled}
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
  required: false,
  multiline: false,
  disabled: false,
  InputProps: {},
  sx: {},
  vertical: false,
}

TextField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  required: PropTypes.bool,
  multiline: PropTypes.bool,
  disabled: PropTypes.bool,
  InputProps: PropTypes.shape(),
  sx: PropTypes.shape(),
  vertical: PropTypes.bool,
}

export default TextField
