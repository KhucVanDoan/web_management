import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import BOMAction from '../actions/define-bom'

const useBOM = () => {
  const data = useSelector((state) => get(state, 'mesx.bom'))

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
