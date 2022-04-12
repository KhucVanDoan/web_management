import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineFactoryActions from '~/modules/mesx/redux/actions/factory'

const useDefineFactory = () => {
  const data = useSelector((state) => state.defineFactory)

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineFactoryActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}

export default useDefineFactory
