import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineShelfActions from '~/modules/wmsx/redux/actions/define-shelf'

const useDefineShelf = () => {
  const data = useSelector((state) => get(state, 'wmsx.defineShelf'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineShelfActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineShelf
