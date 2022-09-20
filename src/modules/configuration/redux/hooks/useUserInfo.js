import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import userInfoActions from '~/modules/configuration/redux/actions/user-info'

const useUserInfo = () => {
  const data = useSelector((state) => get(state, 'configuration.userInfo'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(userInfoActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}

export default useUserInfo
