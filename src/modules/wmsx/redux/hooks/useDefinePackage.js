import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import definePackageActions from '~/modules/wmsx/redux/actions/define-package'

const useDefinePackage = () => {
  const data = useSelector((state) => get(state, 'wmsx.definePackage'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(definePackageActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefinePackage
