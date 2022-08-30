import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import reasonManagementAction from '~/modules/wmsx/redux/actions/reason-management'

const useReasonManagement = () => {
  const data = useSelector((state) => get(state, 'wmsx.reasonManagement'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(reasonManagementAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useReasonManagement
