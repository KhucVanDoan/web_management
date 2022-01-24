import authRoutes from '~/modules/auth/routes'
import mesxRoutes from '~/modules/mesx/routes'
import publicRoutes from '~/modules/public/routes'
import welcomeRoute from '~/modules/welcome/routes'

const flatten = (arr) => {
  if (!arr) return []

  return arr.reduce((acc, cur) => {
    const { subMenu, ...rest } = cur
    return [...acc, ...(cur.path ? [rest] : []), ...flatten(cur.subMenu)]
  }, [])
}

export const privateRoutes = [...mesxRoutes, welcomeRoute]
export const privateRoutesFlatten = flatten(privateRoutes)

export const appRoutes = [publicRoutes, ...authRoutes, ...privateRoutes]
export const appRoutesFlatten = flatten(appRoutes)
export const appRoutesObj = {
  mesx: mesxRoutes,
  // add other modules here
}
