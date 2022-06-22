import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import action from '~/modules/wmsx/redux/actions/location-setting'

const useLocationSetting = () => {
  const data = useSelector((state) => get(state, 'wmsx.locationSetting'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(action, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useLocationSetting
