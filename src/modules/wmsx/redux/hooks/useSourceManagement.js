import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import sourceManagementActions from '~/modules/wmsx/redux/actions/source-management'

const useSourceManagement = () => {
  const data = useSelector((state) => get(state, 'wmsx.sourceManagement'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(sourceManagementActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}

export default useSourceManagement
