import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import progressDetailReportAction from '../actions/progress-detail-report'
const useProgressDetailReport = () => {
  const data = useSelector((state) => get(state, 'mesx.progressDetailReport'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(progressDetailReportAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useProgressDetailReport
