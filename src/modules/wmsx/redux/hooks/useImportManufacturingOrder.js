import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import importManufacturingOrderAction from '~/modules/wmsx/redux/actions/import-manufacturing-order'

const useImportManufacturingOrder = () => {
  const data = useSelector((state) =>
    get(state, 'wmsx.importManufacturingOrder'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(importManufacturingOrderAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useImportManufacturingOrder
