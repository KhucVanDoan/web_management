import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import BOMAction from '../actions/define-bom'

const useBOM = () => {
  const data = useSelector((state) => state.bom)

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(BOMAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useBOM
