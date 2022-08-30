import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import producingCountryActions from '~/modules/wmsx/redux/actions/define-producing-country'

const useDefineProducingCountry = () => {
  const data = useSelector((state) => get(state, 'wmsx.defineProducingCountry'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(producingCountryActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineProducingCountry
