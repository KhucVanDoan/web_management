import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import planReportAction from '../actions/plan-report'

const usePlanReport = () => {
  const data = useSelector((state) => get(state, 'mesx.planReport'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(planReportAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default usePlanReport
