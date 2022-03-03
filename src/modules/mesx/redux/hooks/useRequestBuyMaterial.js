import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import requestBuyMaterialAction from '../actions/request-by-materials'

const useRequestBuyMaterial = () => {
  const data = useSelector((state) => state.requestBuyMaterial)

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(requestBuyMaterialAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useRequestBuyMaterial
