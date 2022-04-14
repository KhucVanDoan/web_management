import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineActionGroupActions from '~/modules/qmsx/redux/actions/define-action-group'

export const useDefineActionGroup = () => {
  const data = useSelector((state) => get(state, 'qmsx.defineActionGroup'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineActionGroupActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineActionGroup
