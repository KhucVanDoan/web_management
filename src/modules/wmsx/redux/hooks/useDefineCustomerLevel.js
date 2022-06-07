import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineCustomerLevelActions from '~/modules/wmsx/redux/actions/define-customer-level'

const useDefineCustomerLevel = () => {
  const data = useSelector((state) => get(state, 'wmsx.defineCustomerLevel'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineCustomerLevelActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineCustomerLevel
