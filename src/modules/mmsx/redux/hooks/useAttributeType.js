import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import attributeTypeActions from '~/modules/mmsx/redux/actions/attribute-type'

function useAttributeType() {
  const data = useSelector((state) => get(state, 'mmsx.attributeType'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(attributeTypeActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useAttributeType
