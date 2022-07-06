import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import maintainRequestAction from '~/modules/mmsx/redux/actions/maintain-request'

function useMaintainRequest() {
  const data = useSelector((state) => get(state, 'mmsx.maintainRequest'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(maintainRequestAction, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useMaintainRequest
