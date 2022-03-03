import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import userManagementActions from '~/modules/mesx/redux/actions/user-management'

const useUserManagement = () => {
  const data = useSelector((state) => state.userManagement)

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(userManagementActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}

export default useUserManagement
