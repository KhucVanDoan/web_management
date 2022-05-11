import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineTemplateShelfActions from '~/modules/wmsx/redux/actions/define-template-shelf'

const useDefineTemplateShelf = () => {
  const data = useSelector((state) => get(state, 'wmsx.defineTemplateShelf'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineTemplateShelfActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineTemplateShelf
