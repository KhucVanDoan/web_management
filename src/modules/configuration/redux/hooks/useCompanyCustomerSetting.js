import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import companyCustomerSettingActions from '~/modules/configuration/redux/actions/company-customer-setting'

const useCompanyCustomerSetting = () => {
  const data = useSelector((state) =>
    get(state, 'configuration.companyCustomerSetting'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(companyCustomerSettingActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}

export default useCompanyCustomerSetting
