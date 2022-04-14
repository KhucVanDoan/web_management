import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineErrorReportActions from '~/modules/qmsx/redux/actions/define-error-report'

export const useDefineErrorReport = () => {
  const data = useSelector((state) => get(state, 'qmsx.defineErrorReport'))

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
