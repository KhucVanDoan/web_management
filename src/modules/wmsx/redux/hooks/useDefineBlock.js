import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineBlockActions from '~/modules/wmsx/redux/actions/define-block'

const useDefineBlock = () => {
  const data = useSelector((state) => get(state, 'wmsx.defineBlock'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineBlockActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineBlock
