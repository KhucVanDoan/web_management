import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import productivityReportAction from '../actions/productivity-report'

const useProductivityReport = () => {
  const data = useSelector((state) => state.productivityReport)

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(productivityReportAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useProductivityReport
