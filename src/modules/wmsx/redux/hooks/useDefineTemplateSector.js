import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import templateSectorActions from '../actions/define-template-sector'

export const useTemplateSector = () => {
  const data = useSelector((state) => get(state, 'wmsx.templateSector'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(templateSectorActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}
