import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineDetailActions from '~/modules/wmsx/redux/actions/define-detail'

const useDefineDetail = () => {
  const data = useSelector((state) => get(state, 'wmsx.defineDetail'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineDetailActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineDetail
