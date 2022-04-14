import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import authActions from '../actions/auth'

export const useAuth = () => {
  const isLoading = useSelector((state) => get(state, 'auth.isLoading'))
  const userInfo = useSelector((state) => get(state, 'auth.userInfo'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(authActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    isLoading,
    userInfo,
  }
}
