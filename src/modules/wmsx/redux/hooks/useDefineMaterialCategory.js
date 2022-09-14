import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import materialCategoryActions from '~/modules/wmsx/redux/actions/define-material-category'

const useDefineMaterialCategory = () => {
  const data = useSelector((state) => get(state, 'wmsx.defineMaterialCategory'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(materialCategoryActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineMaterialCategory
