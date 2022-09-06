import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineAssemblyActions from '~/modules/wmsx/redux/actions/define-assembly'

const useDefineAssembly = () => {
  const data = useSelector((state) => get(state, 'wmsx.defineAssembly'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineAssemblyActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineAssembly
