import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import warningSystemAction from '~/modules/mmsx/redux/actions/warning-system'

function useWarningSystem() {
  const data = useSelector((state) => get(state, 'mmsx.warningSystem'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(warningSystemAction, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useWarningSystem
