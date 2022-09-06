import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import inventorySettingAction from '~/modules/wmsx/redux/actions/inventory-setting'

const useInventorySetting = () => {
  const data = useSelector((state) => get(state, 'wmsx.inventorySetting'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(inventorySettingAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useInventorySetting
