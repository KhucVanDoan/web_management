import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineActionGroupActions from '~/modules/qmsx/redux/actions/define-action-group'

export const useDefineActionGroup = () => {
  const data = useSelector((state) => state.defineActionGroup)

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
