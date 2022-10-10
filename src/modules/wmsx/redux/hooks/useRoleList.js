import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import roleListActions from '~/modules/wmsx/redux/actions/role-list'

const useRoleList = () => {
  const data = useSelector((state) => get(state, 'wmsx.roleList'))

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
