import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import departmentListActions from '~/modules/configuration/redux/actions/department-list'

const useDepartmentList = () => {
  const data = useSelector((state) =>
    get(state, 'configuration.departmentList'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(departmentListActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}

export default useDepartmentList
