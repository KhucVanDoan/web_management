import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import returnOrderActions from '~/modules/wmsx/redux/actions/return-order'

const useReturnOrder = () => {
  const data = useSelector((state) => get(state, 'wmsx.returnOrder'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(returnOrderActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}

export default useReturnOrder
