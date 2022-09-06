import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import receiptDepartmentManagementActions from '~/modules/wmsx/redux/actions/receipt-department-management'

const useReceiptDepartmentManagement = () => {
  const data = useSelector((state) =>
    get(state, 'wmsx.receiptDepartmentManagement'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(receiptDepartmentManagementActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useReceiptDepartmentManagement
