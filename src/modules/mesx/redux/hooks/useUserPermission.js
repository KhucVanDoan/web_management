import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import userPermissionActions from '~/modules/mesx/redux/actions/user-permission'

const useUserPermission = () => {
  const data = useSelector((state) => get(state, 'mesx.userPermission'))

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
