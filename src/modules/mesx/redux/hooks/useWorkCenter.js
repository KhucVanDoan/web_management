import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import workCenterActions from '../actions/work-center'

const useWorkCenter = () => {
  const data = useSelector((state) => get(state, 'mesx.workCenter'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(workCenterActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useWorkCenter
