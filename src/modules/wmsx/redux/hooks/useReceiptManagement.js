import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import receiptManagementActions from '../actions/receipt-management'

const useReceiptManagement = () => {
  const data = useSelector((state) => get(state, 'wmsx.receiptManagement'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(receiptManagementActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useReceiptManagement
