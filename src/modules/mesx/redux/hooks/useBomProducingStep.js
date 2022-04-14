import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import bomProducingStepActions from '~/modules/mesx/redux/actions/bom-producing-step'

const useBomProducingStep = () => {
  const data = useSelector((state) => get(state, 'mesx.bomProducingStep'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(bomProducingStepActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}

export default useBomProducingStep
