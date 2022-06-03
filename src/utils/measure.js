import { CM_TO_PIXEL, UNIT_ENUM } from '~/modules/wmsx/constants'

export const convertToCm = (unit, value) => {
  if (unit === UNIT_ENUM.M) {
    return 100 * value
  } else if (unit === UNIT_ENUM.DM) {
    return 10 * value
  } else {
    return value
  }
}

export const convertToUnit = (fromUnit, toUnit, value) => {
  const valueInCm = convertToCm(fromUnit, value)
  if (toUnit === UNIT_ENUM.M) {
    return valueInCm / 100
  } else if (toUnit === UNIT_ENUM.DM) {
    return valueInCm / 10
  } else {
    return valueInCm
  }
}

export const convertActualDimensiontoCanvasDimension = (unit, value, ratio) => {
  const valueInCm = convertToCm(unit, value)
  return valueInCm * CM_TO_PIXEL * ratio
}

export const convertCanvasDimensionToActualDimension = (
  unit,
  valueInPixel,
  ratio,
) => {
  return valueInPixel / CM_TO_PIXEL / ratio
}
