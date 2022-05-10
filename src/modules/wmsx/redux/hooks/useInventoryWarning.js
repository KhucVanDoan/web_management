import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import inventoryWarningActions from '../actions/inventory-warning'

const useInventoryWarning = () => {
  const data = useSelector((state) => get(state, 'wmsx.inventoryWarning'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(inventoryWarningActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useInventoryWarning
