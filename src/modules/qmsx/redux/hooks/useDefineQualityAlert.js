import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineQualityAlertActions from '~/modules/qmsx/redux/actions/define-quality-alert'

export const useDefineQualityAlert = () => {
  const data = useSelector((state) => state.defineQualityAlert)

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineQualityAlertActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineQualityAlert
