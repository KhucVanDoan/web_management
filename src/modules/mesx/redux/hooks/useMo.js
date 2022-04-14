import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as MoActions from '../actions/mo'

export const useMo = () => {
  const data = useSelector((state) => get(state, 'mesx.Mo'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(MoActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}
