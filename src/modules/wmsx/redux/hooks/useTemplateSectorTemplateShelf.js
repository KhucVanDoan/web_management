import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import templateSectorTemplateShelfActions from '~/modules/wmsx/redux/actions/template-sector-template-shelf'

const useTemplateSectorTemplateShelf = () => {
  const data = useSelector((state) =>
    get(state, 'wmsx.templateSectorTemplateShelf'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(templateSectorTemplateShelfActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useTemplateSectorTemplateShelf
