import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineCustomerAction from '~/modules/wmsx/redux/actions/define-customer'

const useDefineCustomer = () => {
  const data = useSelector((state) => get(state, 'wmsx.defineCustomer'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineCustomerAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineCustomer
