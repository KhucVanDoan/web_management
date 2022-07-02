import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineSuppliesAction from '~/modules/mmsx/redux/actions/define-supplies'

function useDefineSupplies() {
  const data = useSelector((state) => get(state, 'mmsx.supplies'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineSuppliesAction, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useDefineSupplies
