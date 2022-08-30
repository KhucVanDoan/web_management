import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import managementUnitAction from '~/modules/wmsx/redux/actions/management-unit'

const useManagementUnit = () => {
  const data = useSelector((state) => get(state, 'wmsx.managementUnit'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(managementUnitAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useManagementUnit
