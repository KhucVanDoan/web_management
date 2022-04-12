import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import userPermissionActions from '~/modules/mesx/redux/actions/user-permission'

const useUserPermission = () => {
  const data = useSelector((state) => state.userPermission)

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(userPermissionActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}

export default useUserPermission
