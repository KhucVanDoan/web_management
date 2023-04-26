import * as React from 'react'

import { isNil } from 'lodash'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'

const config = (formatter) => {
  const cfg = {
    thousandSeparator: ' ',
    decimalSeparator: ',',
    allowNegative: false,
  }

  if (formatter === 'quantity') return { ...cfg, decimalScale: 5 }
  if (formatter === 'price') return { ...cfg, decimalScale: 2 }
  return cfg
}

export const NumberFormatInput = React.forwardRef(function NumberFormatInput(
  props,
  ref,
) {
  const { onChange, numberProps, formatter, ...other } = props

  const validMaxLength = (val) => {
    if (!val) return true
    return val.toString().length <= 18
  }

  return (
    <NumberFormat
      {...other}
      type="text"
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values?.floatValue ?? '',
          },
        })
      }}
      {...config(formatter)}
      {...numberProps}
      isAllowed={(val) => {
        if (typeof numberProps?.isAllowed === 'function') {
          return validMaxLength(val.value) && numberProps?.isAllowed(val)
        }
        return validMaxLength(val.value)
      }}
    />
  )
})

NumberFormatInput.defaultProps = {
  onChange: () => {},
  numberProps: {},
}

NumberFormatInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  numberProps: PropTypes.shape(),
  formatter: PropTypes.oneOf(['quantity', 'price']),
}

export const NumberFormatText = ({ value, numberProps, formatter }) => {
  if (isNil(value)) return ''

  const convertedValue = formatter
    ? (+Number(value || 0).toFixed(
        config(formatter)?.decimalScale || 0,
      )).toString()
    : value

  const quantityValue = formatter
    ? Number(value || 0).toFixed(config(formatter)?.decimalScale || 0)
    : value

  return (
    <NumberFormat
      value={convertedValue}
      displayType="text"
      isNumericString
      {...config(formatter)}
      {...(formatter === 'quantity' && Number(value - parseInt(value)) === 0
        ? { value: quantityValue, decimalScale: 2 }
        : {})}
      {...numberProps}
    />
  )
}

NumberFormatText.defaultProps = {
  value: '',
  numberProps: {},
}

NumberFormatText.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  numberProps: PropTypes.shape(),
  formatter: PropTypes.oneOf(['quantity', 'price']),
}

export default NumberFormatText
