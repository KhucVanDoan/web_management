import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineCompanyActions from '~/modules/mesx/redux/actions/define-company'

const useDefineCompany = () => {
  const data = useSelector((state) => state.defineCompany)

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
