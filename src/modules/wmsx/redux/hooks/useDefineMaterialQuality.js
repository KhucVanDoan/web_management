import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import materialQualityActions from '~/modules/wmsx/redux/actions/define-material-quality'

const useDefineMaterialQuality = () => {
  const data = useSelector((state) => get(state, 'wmsx.defineMaterialQuality'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(materialQualityActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineMaterialQuality
