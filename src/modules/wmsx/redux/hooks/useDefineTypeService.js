import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineTypeServiceAction from '~/modules/wmsx/redux/actions/define-type-service'

const useDefineTypeService = () => {
  const data = useSelector((state) => get(state, 'wmsx.defineTypeService'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineTypeServiceAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineTypeService
