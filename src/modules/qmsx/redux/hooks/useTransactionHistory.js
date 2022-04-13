import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import transactionHistoryActions from '~/modules/qmsx/redux/actions/transaction-history'

export const useTransactionHistory = () => {
  const data = useSelector((state) => state.transactionHistory)

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(transactionHistoryActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useTransactionHistory
