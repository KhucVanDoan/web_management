import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineQualityPointActions from '~/modules/qmsx/redux/actions/define-quality-point'

export const useDefineQualityPoint = () => {
  const data = useSelector((state) => get(state, 'qmsx.defineQualityPoint'))

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
