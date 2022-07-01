import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import suppliesCategoryAction from '~/modules/mmsx/redux/actions/supplies-category'

function useSuppliesCategory() {
  const data = useSelector((state) => get(state, 'mmsx.suppliesCategory'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(suppliesCategoryAction, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useSuppliesCategory
