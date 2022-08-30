import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import businessTypeManagementActions from '~/modules/wmsx/redux/actions/business-type-management'

const useBusinessTypeManagement = () => {
  const data = useSelector((state) => get(state, 'wmsx.businessTypeManagement'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(businessTypeManagementActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useBusinessTypeManagement
