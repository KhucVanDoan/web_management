/**
 * handel onChange TextField's value in component
 * @param {component} component
 * @param {event} event
 */
export const onChangeTextField = (component, event) => {
  component.setState({
    [event.currentTarget.name]: event.target.value,
  })
}

/**
 * handel onChange CheckBox's value in component
 * @param {component} component
 * @param {event} event
 */
export const onChangeCheckBox = (component, event) => {
  component.setState({
    [event.currentTarget.name]: event.target.checked,
  })
}

/**
 * handle onChange SelectBox's value in component
 * @param {component} component
 * @param {event} event
 */
export const onChangeSelect = (component, event) => {
  component.setState({
    [event.target.name]: event.target.value,
  })
}

/**
 *
 * @param {*} component
 * @param {*} name
 * @param {*} value
 */
export const onChangeMultiSelect = (component, name, values) => {
  component.setState({
    [name]: values,
  })
}

/**
 * Handle change date
 * @param {*} component
 * @param {*} name
 * @param {*} date
 */
export const onChangeDate = (component, name, date) => {
  component.setState({
    [name]: date,
  })
}

/**
 * handel onChange TextField's value in component
 * @param {component} component
 * @param {event} event
 */
export const onChangeCodeField = (
  component,
  event,
  maxLength = 0,
  prefix = '',
  filledCharacter = '0',
) => {
  if (prefix) {
    const prefixLength = prefix.length
    const restLength = maxLength - prefixLength
    const currentValue = component.state[event.currentTarget.name]
    const temporalValue = event.target.value
    let newValue = currentValue
    if (
      temporalValue.length < maxLength &&
      event.target.selectionStart === maxLength - 1
    ) {
      newValue =
        prefix +
        filledCharacter +
        temporalValue.substr(prefixLength, restLength)
    } else if (event.target.selectionStart === maxLength + 1) {
      const newCharacter = temporalValue.slice(-1)[0]
      const regex = /[a-z,A-Z,0-9]/
      if (
        regex.test(newCharacter) &&
        currentValue[prefixLength] === filledCharacter
      ) {
        newValue = prefix + temporalValue.substr(prefixLength + 1, restLength)
      }
    }
    component.setState({
      [event.currentTarget.name]: newValue,
    })
  }
}

export const formatInput = (component, event) => {
  component.setState({
    [event.currentTarget.name]: event.target.value.trim(),
  })
}

/**
 * Round number with two digits after point
 * @param {number} number
 */
export const normalizeDecimal = (number) => {
  return Math.round(number * 100) / 100
}
