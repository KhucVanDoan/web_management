import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineCheckListActions from '~/modules/qmsx/redux/actions/define-check-list'

export const useDefineCheckList = () => {
  const data = useSelector((state) => get(state, 'qmsx.defineCheckList'))

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
