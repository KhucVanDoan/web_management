import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import PlanActions from '../actions/plan'

export const useDefinePlan = () => {
  const data = useSelector((state) => get(state, 'mesx.definePlan'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(PlanActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}
