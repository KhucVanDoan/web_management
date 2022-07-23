import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import deviceStatusAction from '~/modules/mmsx/redux/actions/device-status'

function useDeviceStatus() {
  const data = useSelector((state) => get(state, 'mmsx.deviceStatus'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(deviceStatusAction, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useDeviceStatus
