import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineItemActions from '~/modules/mesx/redux/actions/define-item'

const useDefineItem = () => {
  const data = useSelector((state) => state.defineItem)

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineItemActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineItem
