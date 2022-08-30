import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineUomActions from '~/modules/wmsx/redux/actions/define-uom'

const useDefineUom = () => {
  const data = useSelector((state) => get(state, 'wmsx.defineUom'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineUomActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineUom
