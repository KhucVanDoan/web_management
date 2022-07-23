import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import deviceStatusActions from '~/modules/mmsx/redux/actions/device-status-report'

function useDeviceStatus() {
  const data = useSelector((state) => get(state, 'mmsx.deviceStatusReport'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(deviceStatusActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useDeviceStatus
