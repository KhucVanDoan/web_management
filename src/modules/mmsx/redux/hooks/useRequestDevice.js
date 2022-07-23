import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import requestDeviceActions from '~/modules/mmsx/redux/actions/request-device'

function useRequestDevice() {
  const data = useSelector((state) => get(state, 'mmsx.requestDevice'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(requestDeviceActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useRequestDevice
