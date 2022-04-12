import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import workCenterActions from '../actions/work-center'

const useWorkCenter = () => {
  const data = useSelector((state) => state.workCenter)

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
