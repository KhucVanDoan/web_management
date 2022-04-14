import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import productivityCompareAction from '../actions/productivity-compare'

const useProductivityCompare = () => {
  const data = useSelector((state) =>
    get(state, 'mesx.productivityCompareReport'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(productivityCompareAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useProductivityCompare
