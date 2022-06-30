import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import deviceCategoryAction from '~/modules/mmsx/redux/actions/device-category'

function useDeviceCategory() {
  const data = useSelector((state) => get(state, 'mmsx.deviceCategory'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(deviceCategoryAction, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useDeviceCategory
