import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import companyManagementActions from '~/modules/wmsx/redux/actions/company-management'

const useCompanyManagement = () => {
  const data = useSelector((state) => get(state, 'wmsx.companyManagement'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(companyManagementActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}

export default useCompanyManagement
