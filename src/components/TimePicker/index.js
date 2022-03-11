import React, { useEffect, useRef, useState } from 'react'

import AccessTimeIcon from '@mui/icons-material/AccessTime'
import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  ClickAwayListener,
} from '@mui/material'
import clsx from 'clsx'
import { PropTypes } from 'prop-types'
import TimeInput from 'react-time-picker-input'

import { useClasses } from '~/themes'

import style from './style'
import 'react-time-picker-input/dist/components/TimeInput.css'

const TimePicker = ({
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
}) => {
  const classes = useClasses(style)

  const [open, setOpen] = useState(false)
  const ref = useRef(false)
  const refInput = useRef(null)

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
    <>
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
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Box
            sx={{ flex: 1, minWidth: 0 }}
            onClick={() => {
              if (!disabled) {
                setOpen(true)
                refInput.current.getElementsByTagName('input')[0].focus()
              }
            }}
          >
            <Box
              className={clsx(classes.root, {
                [classes.disabled]: disabled,
                [classes.error]: error,
                [classes.focus]: open && !error,
              })}
              sx={{ ...(disabled ? { pointerEvents: 'none' } : {}) }}
            >
              <Box ref={refInput} className={classes.textField}>
                <TimeInput allowDelete value={value} onChange={onChange} />
              </Box>
              <Box className={classes.iconCalendar}>
                <AccessTimeIcon fontSize="small" />
              </Box>
            </Box>
            {error && !!helperText && (
              <FormHelperText error>{helperText}</FormHelperText>
            )}
          </Box>
        </ClickAwayListener>
      </FormControl>
    </>
  )
}

TimePicker.defaultProps = {
  label: '',
  value: '',
  onChange: () => {},
  onTouch: () => {},
  disabled: false,
  error: false,
  helperText: '',
  vertical: false,
  required: false,
  labelWidth: 160,
}

TimePicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onTouch: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  vertical: PropTypes.bool,
  required: PropTypes.bool,
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default TimePicker
