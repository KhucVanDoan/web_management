import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineErrorReportActions from '~/modules/qmsx/redux/actions/define-error-report'

export const useDefineErrorReport = () => {
  const data = useSelector((state) => state.defineErrorReport)

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineErrorReportActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineErrorReport
