import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineBlockItemLocation from '~/modules/wmsx/redux/actions/block-item-location'

const useBlockItemLocation = () => {
  const data = useSelector((state) => get(state, 'wmsx.blockItemLocation'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineBlockItemLocation, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useBlockItemLocation
