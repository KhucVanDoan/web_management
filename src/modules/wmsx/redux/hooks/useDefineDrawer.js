import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineDrawerActions from '~/modules/wmsx/redux/actions/define-drawer'

const useDefineDrawer = () => {
  const data = useSelector((state) => get(state, 'wmsx.defineDrawer'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineDrawerActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineDrawer
