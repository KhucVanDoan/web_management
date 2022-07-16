import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import deviceAssignActions from '~/modules/mmsx/redux/actions/device-assign'

function useDeviceAssign() {
  const data = useSelector((state) => get(state, 'mmsx.deviceAssign'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(deviceAssignActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useDeviceAssign
