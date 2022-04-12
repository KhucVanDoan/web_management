import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineCustomerActions from '~/modules/mesx/redux/actions/define-customer'

const useDefineCustomer = () => {
  const data = useSelector((state) => state.defineCustomer)

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineCustomerActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}

export default useDefineCustomer
