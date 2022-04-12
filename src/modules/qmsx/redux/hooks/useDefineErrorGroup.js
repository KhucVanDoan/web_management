import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineErrorGroupActions from '~/modules/qmsx/redux/actions/define-error-group'

export const useDefineErrorGroup = () => {
  const data = useSelector((state) => state.defineErrorGroup)

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineErrorGroupActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineErrorGroup
