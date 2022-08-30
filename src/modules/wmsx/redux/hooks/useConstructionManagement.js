import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import constructionManagementActions from '~/modules/wmsx/redux/actions/construction-management'

const useConstructionManagement = () => {
  const data = useSelector((state) => get(state, 'wmsx.constructionManagement'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(constructionManagementActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useConstructionManagement
