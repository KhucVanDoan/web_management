import { omit } from 'lodash'

import authRoutes from '~/modules/auth/routes'
import databaseRoutes from '~/modules/database/routes'
import mesxRoutes from '~/modules/mesx/routes'
import publicRoutes from '~/modules/public/routes'
import qmsxRoutes from '~/modules/qmsx/routes'
import welcomeRoute from '~/modules/welcome/routes'
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

export const privateRoutes = [
  welcomeRoute,
  ...mesxRoutes,
  ...qmsxRoutes,
  ...databaseRoutes,
  ...wmsxRoutes,
]
export const privateRoutesFlatten = flatten(privateRoutes)

export const appRoutes = [publicRoutes, ...authRoutes, ...privateRoutes]
export const appRoutesFlatten = flatten(appRoutes)
export const appRoutesObj = {
  mesx: mesxRoutes,
  qmsx: qmsxRoutes,
  wmsx: wmsxRoutes,
  database: databaseRoutes,
}
