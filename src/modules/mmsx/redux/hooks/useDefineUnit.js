import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import unitActions from '~/modules/mmsx/redux/actions/defineUnit'

function useDefineUnit() {
  const data = useSelector((state) => get(state, 'mmsx.defineUnit'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(unitActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useDefineUnit
