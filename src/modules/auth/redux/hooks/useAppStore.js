import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import appStoreActions from '../actions/app-store'

export const useAppStore = () => {
  const appStore = useSelector((state) => get(state, 'appStore'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(appStoreActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    appStore,
  }
}
