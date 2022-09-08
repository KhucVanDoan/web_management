import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import locationManagementActions from '~/modules/wmsx/redux/actions/location-management'

const useLocationManagement = () => {
  const data = useSelector((state) => get(state, 'wmsx.locationManagement'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(locationManagementActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useLocationManagement
