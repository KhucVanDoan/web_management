import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import BOQActions from '../actions/define-boq'

export const useDefineBOQ = () => {
  const data = useSelector((state) => state.defineBOQ)

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(BOQActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}
