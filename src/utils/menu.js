import { appRoutesObj } from '../routes'

export const getCurrentModule = (locationPathName = '') => {
  const firstParam = locationPathName.split('/')?.[1]?.toLowerCase()

  if (appRoutesObj[firstParam] !== undefined) return firstParam
  return undefined
}
