import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import qualityReportActions from '~/modules/qmsx/redux/actions/quality-report'

export const useQualityReport = () => {
  const data = useSelector((state) => get(state, 'qmsx.qualityReport'))

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
