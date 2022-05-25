import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineWarehousePalletfAction from '~/modules/wmsx/redux/actions/define-warehouse-pallet'

const useDefineWarehousePallet = () => {
  const data = useSelector((state) => get(state, 'wmsx.defineWarehousePallet'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineWarehousePalletfAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineWarehousePallet
