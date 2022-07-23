import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import jobDraftAction from '~/modules/mmsx/redux/actions/job-draft'

function useJobDraft() {
  const data = useSelector((state) => get(state, 'mmsx.jobDraftList'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(jobDraftAction, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useJobDraft
