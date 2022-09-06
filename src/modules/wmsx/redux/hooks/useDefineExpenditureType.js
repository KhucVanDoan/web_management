import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import expenditureTypeActions from '~/modules/wmsx/redux/actions/define-expenditure-type'

const useDefineExpenditureType = () => {
  const data = useSelector((state) => get(state, 'wmsx.defineExpenditureType'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(expenditureTypeActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineExpenditureType
