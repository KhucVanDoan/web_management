import React, {
  //  useEffect,
  createContext,
  useCallback,
  useState,
} from 'react'

// import { ROWS_PER_PAGE_OPTIONS } from '~/common/constants'
// import { useAuth } from '~/modules/auth/redux/hooks/useAuth'
// import { useNotification } from '~/modules/shared/redux/hooks/useNotification'
import { getLocalItem, isAuth } from '~/utils'

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
  const [refreshKey, setRefreshKey] = useState('')
  // const { actions: authActions, userInfo } = useAuth()
  // const { actions: notiActions } = useNotification()
  const isAuthenticated = isAuth()

  const canAccess = useCallback(
    (code) => {
      const userPermissions = getLocalItem('userInfo')?.userPermissions || []

      if (!code) return true

      return userPermissions.some((item) => item?.code === code)
    },
    [isAuthenticated],
  )

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     authActions.getUserMe()
  //   }
  // }, [isAuthenticated])

  // useEffect(() => {
  //   if (userInfo?.statusNotification) {
  //     notiActions.getNotifications({ limit: ROWS_PER_PAGE_OPTIONS[0] })
  //   }
  // }, [userInfo?.statusNotification])

  const value = {
    refreshKey,
    setRefreshKey,
    clearRefreshKey: () => setRefreshKey(''),
    canAccess: canAccess,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppContext
