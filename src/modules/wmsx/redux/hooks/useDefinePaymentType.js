import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import definePaymentTypeActions from '~/modules/wmsx/redux/actions/define-payment-type'

const useDefinePaymentType = () => {
  const data = useSelector((state) => get(state, 'wmsx.definePaymentType'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(definePaymentTypeActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefinePaymentType
