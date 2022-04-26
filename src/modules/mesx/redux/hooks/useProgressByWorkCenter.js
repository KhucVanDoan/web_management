import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import progressManufacturingByWorkCenterActions from '~/modules/mesx/redux/actions/progress-by-work-center'

const useProgressManufacturingByWorkCenter = () => {
  const data = useSelector((state) => get(state, 'mesx.progressByWorkCenter'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () =>
      bindActionCreators(progressManufacturingByWorkCenterActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}

export default useProgressManufacturingByWorkCenter
