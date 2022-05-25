import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineServiceAction from '~/modules/wmsx/redux/actions/define-service'

const useDefineService = () => {
  const data = useSelector((state) => get(state, 'wmsx.defineService'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineServiceAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineService
