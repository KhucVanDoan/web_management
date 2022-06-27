import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import commonAction from '~/modules/mmsx/redux/actions/common'

function useCommonInfo() {
  const data = useSelector((state) => get(state, 'mmsx.commonManagement'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(commonAction, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useCommonInfo
