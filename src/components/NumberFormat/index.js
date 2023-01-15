import * as React from 'react'

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
        if (val?.floatValue === undefined) return true
        if (typeof numberProps?.isAllowed === 'function') {
          return val?.floatValue < 1e18 && numberProps?.isAllowed(val)
        }
        return val?.floatValue < 1e18
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

export const NumberFormatText = ({ value, numberProps, formatter }) => (
  <NumberFormat
    value={value}
    displayType="text"
    isNumericString
    {...config(formatter)}
    {...numberProps}
  />
)

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
