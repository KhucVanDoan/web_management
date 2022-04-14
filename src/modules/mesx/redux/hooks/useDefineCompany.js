import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineCompanyActions from '~/modules/mesx/redux/actions/define-company'

const useDefineCompany = () => {
  const data = useSelector((state) => get(state, 'mesx.defineCompany'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineCompanyActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}

export default useDefineCompany
