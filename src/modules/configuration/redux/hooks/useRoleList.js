import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import roleListActions from '~/modules/configuration/redux/actions/role-list'

const useRoleList = () => {
  const data = useSelector((state) => get(state, 'configuration.roleList'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(roleListActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}

export default useRoleList
