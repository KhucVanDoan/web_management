import React, { useEffect, createContext, useCallback, useState } from 'react'

import { ROWS_PER_PAGE_OPTIONS } from '~/common/constants'
import useUserInfo from '~/modules/configuration/redux/hooks/useUserInfo'
import { useNotification } from '~/modules/shared/redux/hooks/useNotification'
import { getLocalItem, isAuth } from '~/utils'

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
  const [refreshKey, setRefreshKey] = useState('')
  const { actions: notiActions } = useNotification()
  const {
    data: { userInfo },
    actions: userActions,
  } = useUserInfo()
  const isAuthenticated = isAuth()

  const canAccess = useCallback(
    (code) => {
      const userPermissions = getLocalItem('userInfo')?.userPermissions || []

      if (!code) return true

      return userPermissions.some((item) => item?.code === code)
    },
    [isAuthenticated],
  )

  useEffect(() => {
    if (isAuthenticated) {
      userActions.getUserInfo()
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (userInfo?.statusNotification) {
      notiActions.getNotifications({ limit: ROWS_PER_PAGE_OPTIONS[0] })
    }
  }, [userInfo?.statusNotification])

  const value = {
    refreshKey,
    setRefreshKey,
    clearRefreshKey: () => setRefreshKey(''),
    canAccess: canAccess,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppContext
