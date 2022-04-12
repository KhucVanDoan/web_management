import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import qualityReportActions from '~/modules/qmsx/redux/actions/quality-report'

export const useQualityReport = () => {
  const data = useSelector((state) => state.qualityReport)

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
