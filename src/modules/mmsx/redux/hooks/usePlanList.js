import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import planListAction from '~/modules/mmsx/redux/actions/plan-list'

function usePlanList() {
  const data = useSelector((state) => get(state, 'mmsx.planList'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(planListAction, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default usePlanList
