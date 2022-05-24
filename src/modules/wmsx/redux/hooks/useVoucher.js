import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import vouchersActions from '~/modules/wmsx/redux/actions/voucher'

const useVoucher = () => {
  const data = useSelector((state) => get(state, 'wmsx.voucher'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(vouchersActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useVoucher
