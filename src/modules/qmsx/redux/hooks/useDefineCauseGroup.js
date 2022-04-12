import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineCauseGroupActions from '~/modules/qmsx/redux/actions/define-cause-group'

export const useDefineCauseGroup = () => {
  const data = useSelector((state) => state.defineCauseGroup)

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineCauseGroupActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineCauseGroup
