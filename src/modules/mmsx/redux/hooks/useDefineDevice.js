import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineDeviceActions from '~/modules/mmsx/redux/actions/define-device'

function useDefineDevice() {
  const data = useSelector((state) => get(state, 'mmsx.defineDevice'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineDeviceActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useDefineDevice
