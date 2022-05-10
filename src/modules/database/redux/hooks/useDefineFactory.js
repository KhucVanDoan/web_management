import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineFactoryActions from '~/modules/database/redux/actions/factory'

const useDefineFactory = () => {
  const data = useSelector((state) => get(state, 'database.defineFactory'))

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
