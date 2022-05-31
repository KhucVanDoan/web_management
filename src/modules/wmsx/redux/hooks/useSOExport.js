import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import soExportActions from '~/modules/wmsx/redux/actions/so-export'

const useSOExport = () => {
  const data = useSelector((state) => get(state, 'wmsx.soExport'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(soExportActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useSOExport
