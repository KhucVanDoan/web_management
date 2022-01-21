import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import authActions from '../actions/auth'

export const useAuth = () => {
  const isLoading = useSelector((state) => state.auth.isLoading)
  const userInfo = useSelector((state) => state.auth.userInfo)

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
