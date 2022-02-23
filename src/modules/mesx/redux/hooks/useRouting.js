import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import routingActions from '~/modules/mesx/redux/actions/routing'

const useRouting = () => {
  const data = useSelector((state) => state.defineRouting)

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(routingActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}

export default useRouting
