import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import planReportAction from '../actions/plan-report'

const usePlanReport = () => {
  const data = useSelector((state) => state.planReport)

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
