import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineCheckListActions from '~/modules/qmsx/redux/actions/define-check-list'

export const useDefineCheckList = () => {
  const data = useSelector((state) => state.defineCheckList)

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineCheckListActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineCheckList
