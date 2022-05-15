import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import inventoryActions from '../actions/inventory'

const useInventory = () => {
  const data = useSelector((state) => get(state, 'wmsx.inventory'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(inventoryActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useInventory
