import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import reportExportActions from '~/modules/wmsx/redux/actions/report-export'

const useReportExport = () => {
  const data = useSelector((state) => get(state, 'wmsx.reportExport'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(reportExportActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useReportExport
