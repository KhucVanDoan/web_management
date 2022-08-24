import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import constructionItemsManagementActions from '~/modules/wmsx/redux/actions/construction-items-management'

const useConstructionItemsManagement = () => {
  const data = useSelector((state) =>
    get(state, 'wmsx.constructionItemsManagement'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(constructionItemsManagementActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useConstructionItemsManagement
