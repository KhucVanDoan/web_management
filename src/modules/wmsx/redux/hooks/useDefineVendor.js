import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineVendorAction from '~/modules/wmsx/redux/actions/define-vendor'

const useDefineVendor = () => {
  const data = useSelector((state) => get(state, 'wmsx.defineVendor'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineVendorAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineVendor
