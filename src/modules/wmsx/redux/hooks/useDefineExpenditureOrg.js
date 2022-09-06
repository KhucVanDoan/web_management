import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import expenditureOrgActions from '~/modules/wmsx/redux/actions/define-expenditure-org'

const useDefineExpenditureOrg = () => {
  const data = useSelector((state) => get(state, 'wmsx.defineExpenditureOrg'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(expenditureOrgActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineExpenditureOrg
