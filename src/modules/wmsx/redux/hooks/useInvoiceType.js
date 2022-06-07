import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import invoiceTypeActions from '~/modules/wmsx/redux/actions/invoice-type'

const useInvoiceType = () => {
  const data = useSelector((state) => get(state, 'wmsx.invoiceType'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(invoiceTypeActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useInvoiceType
