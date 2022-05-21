import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import commonManagementAction from '~/modules/wmsx/redux/actions/common'

const useCommonManagement = () => {
  const data = useSelector((state) => get(state, 'wmsx.commonManagement'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(commonManagementAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useCommonManagement
