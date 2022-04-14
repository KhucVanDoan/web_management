import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import producingStepAction from '../actions/product-step'

const useProducingStep = () => {
  const data = useSelector((state) => get(state, 'mesx.producingStep'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(producingStepAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useProducingStep
