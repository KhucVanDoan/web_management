import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineQualityAlertActions from '~/modules/qmsx/redux/actions/define-quality-alert'

export const useDefineQualityAlert = () => {
  const data = useSelector((state) => get(state, 'qmsx.defineQualityAlert'))

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
