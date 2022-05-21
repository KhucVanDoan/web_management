import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineTypeUnitAction from '~/modules/wmsx/redux/actions/define-type-unit'

const useDefineTypeUnit = () => {
  const data = useSelector((state) => get(state, 'wmsx.defineTypeUnit'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineTypeUnitAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineTypeUnit
