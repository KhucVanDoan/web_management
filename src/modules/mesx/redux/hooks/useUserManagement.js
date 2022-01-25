import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import userManagementActions from '../actions/user-management'

export const useUserManagement = () => {
  const isLoading = useSelector((state) => state.userManagement.isLoading)
  const userList = useSelector((state) => state.userManagement.userList)
  const userDetails = useSelector((state) => state.userManagement.userDetails)
  const total = useSelector((state) => state.userManagement.total)

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(userManagementActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    isLoading,
    userList,
    userDetails,
    total,
  }
}
