import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import CommonManagementActions from '../actions/common'

export const useCommonManagement = () => {
  const data = useSelector((state) => state.commonManagement)

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

export default useCommonManagement
