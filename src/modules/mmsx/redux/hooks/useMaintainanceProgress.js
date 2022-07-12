import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import maintainanceProgressAction from '~/modules/mmsx/redux/actions/maintainance-progress'

function useMaintainanceProgress() {
  const data = useSelector((state) => get(state, 'mmsx.maintainanceProgress'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(maintainanceProgressAction, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useMaintainanceProgress
