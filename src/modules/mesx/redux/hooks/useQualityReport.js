import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import qualityReportActions from '../actions/quality-report'

const useQualityReport = () => {
  const data = useSelector((state) => get(state, 'mesx.qualityReport'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(qualityReportActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useQualityReport
