import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import suppliesRequestAction from '~/modules/mmsx/redux/actions/supplies-request'

function useSuppliesRequest() {
  const data = useSelector((state) => get(state, 'mmsx.suppliesRequest'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(suppliesRequestAction, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useSuppliesRequest
