import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineErrorGroupActions from '~/modules/qmsx/redux/actions/define-error-group'

export const useDefineErrorGroup = () => {
  const data = useSelector((state) => get(state, 'qmsx.defineErrorGroup'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineErrorGroupActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineErrorGroup
