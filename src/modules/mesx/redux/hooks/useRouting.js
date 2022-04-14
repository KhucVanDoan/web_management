import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import routingActions from '~/modules/mesx/redux/actions/routing'

const useRouting = () => {
  const data = useSelector((state) => get(state, 'mesx.defineRouting'))

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
