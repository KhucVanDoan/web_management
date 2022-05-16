import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import inventoryDeadlineWarningActions from '../actions/inventory-deadline-warning'

const useInventoryDeadlineWarning = () => {
  const data = useSelector((state) =>
    get(state, 'wmsx.inventoryDeadlineWarning'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(inventoryDeadlineWarningActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useInventoryDeadlineWarning
