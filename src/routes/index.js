import { omit } from 'lodash'

import authRoutes from '~/modules/auth/routes'
import configurationRoutes from '~/modules/configuration/routes'
import homeRoute from '~/modules/home/routes'
import publicRoutes from '~/modules/public/routes'
import wmsxRoutes from '~/modules/wmsx/routes'

const flatten = (arr) => {
  if (!arr) return []

  return arr.reduce(
    (acc, cur) => [
      ...acc,
      ...(cur.path ? [omit(cur, 'subMenu')] : []),
      ...flatten(cur.subMenu),
    ],
    [],
  )
}

export const privateRoutes = [homeRoute, ...configurationRoutes, ...wmsxRoutes]
export const privateRoutesFlatten = flatten(privateRoutes)
export const appRoutes = [...publicRoutes, ...authRoutes, ...privateRoutes]
export const appRoutesFlatten = flatten(appRoutes)
export const appRoutesObj = {
  wmsx: wmsxRoutes,
  configuration: configurationRoutes,
}
