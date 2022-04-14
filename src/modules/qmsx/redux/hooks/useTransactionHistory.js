import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import transactionHistoryActions from '~/modules/qmsx/redux/actions/transaction-history'

export const useTransactionHistory = () => {
  const data = useSelector((state) => get(state, 'qmsx.transactionHistory'))

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
