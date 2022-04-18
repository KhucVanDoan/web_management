import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import userPermissionActions from '~/modules/qmsx/redux/actions/user-permission'

const useUserPermission = () => {
  const data = useSelector((state) => get(state, 'qmsx.userPermission'))

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
