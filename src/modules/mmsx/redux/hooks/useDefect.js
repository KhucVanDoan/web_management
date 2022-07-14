import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import defectActions from '~/modules/mmsx/redux/actions/defect-list'

function useDefect() {
  const data = useSelector((state) => get(state, 'mmsx.defectList'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defectActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useDefect
