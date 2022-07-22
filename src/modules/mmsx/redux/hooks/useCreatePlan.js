import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import createPlanActions from '~/modules/mmsx/redux/actions/create-plan'

function useCreatePlan() {
  const data = useSelector((state) => get(state, 'mmsx.createPlanList'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(createPlanActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useCreatePlan
