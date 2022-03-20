import * as React from 'react'

import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'

export const NumberFormatInput = React.forwardRef(function NumberFormatInput(
  props,
  ref,
) {
  const { onChange, numberProps, ...other } = props
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
      {...numberProps}
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
}

export const NumberFormatText = ({ value, numberProps }) => (
  <NumberFormat
    value={value}
    {...numberProps}
    displayType="text"
    isNumericString
  />
)

NumberFormatText.defaultProps = {
  value: '',
  numberProps: { thousandSeparator: true, decimalScale: 3 },
}

NumberFormatText.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  numberProps: PropTypes.shape(),
}

export default NumberFormatText
