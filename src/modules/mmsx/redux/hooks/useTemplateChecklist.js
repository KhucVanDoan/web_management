import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import templateChecklistAction from '~/modules/mmsx/redux/actions/template-checklist'

function useTemplateChecklist() {
  const data = useSelector((state) => get(state, 'mmsx.templateChecklist'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(templateChecklistAction, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useTemplateChecklist
