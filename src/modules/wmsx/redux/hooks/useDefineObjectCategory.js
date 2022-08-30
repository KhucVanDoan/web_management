import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineObjectCategoryActions from '~/modules/wmsx/redux/actions/define-object-category'

const useDefineObjectCategory = () => {
  const data = useSelector((state) => get(state, 'wmsx.defineObjectCategory'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineObjectCategoryActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineObjectCategory
