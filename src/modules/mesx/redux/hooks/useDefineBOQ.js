import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import BOQActions from '../actions/define-boq'

export const useDefineBOQ = () => {
  const data = useSelector((state) => get(state, 'mesx.defineBOQ'))

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
