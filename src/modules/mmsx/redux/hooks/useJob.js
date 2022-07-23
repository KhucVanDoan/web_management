import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import jobAction from '~/modules/mmsx/redux/actions/job'

function useJob() {
  const data = useSelector((state) => get(state, 'mmsx.job'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(jobAction, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useJob
