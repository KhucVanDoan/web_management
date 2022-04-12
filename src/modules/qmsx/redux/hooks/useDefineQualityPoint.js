import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineQualityPointActions from '~/modules/qmsx/redux/actions/define-quality-point'

export const useDefineQualityPoint = () => {
  const data = useSelector((state) => state.defineQualityPoint)

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineQualityPointActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineQualityPoint
