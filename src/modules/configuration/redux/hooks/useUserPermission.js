import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import userPermissionActions from '~/modules/configuration/redux/actions/user-permission'

const useUserPermission = () => {
  const data = useSelector((state) =>
    get(state, 'configuration.userPermission'),
  )

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
