import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import qrCodeActions from '~/modules/wmsx/redux/actions/qr-code'

const useQrCode = () => {
  const data = useSelector((state) => get(state, 'wmsx.qrCode'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(qrCodeActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useQrCode
