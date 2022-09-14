import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import movementsActions from '~/modules/wmsx/redux/actions/movements'

const useMovements = () => {
  const data = useSelector((state) => get(state, 'wmsx.movementManagement'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(movementsActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useMovements
