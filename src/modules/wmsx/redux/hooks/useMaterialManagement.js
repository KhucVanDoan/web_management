import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import materialManagementActions from '~/modules/wmsx/redux/actions/material-management'

const useMaterialManagement = () => {
  const data = useSelector((state) => get(state, 'wmsx.materialManagement'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(materialManagementActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useMaterialManagement
