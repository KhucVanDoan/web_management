import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import CommonManagementActions from '../actions/common'

export const useCommonManagement = () => {
  const data = useSelector((state) => get(state, 'mesx.commonManagement'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(CommonManagementActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}
