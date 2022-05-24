import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineCurrencyUnitAction from '~/modules/wmsx/redux/actions/define-currency-unit'

const useDefineCurrencyUnit = () => {
  const data = useSelector((state) => get(state, 'wmsx.defineCurrencyUnit'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineCurrencyUnitAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineCurrencyUnit
