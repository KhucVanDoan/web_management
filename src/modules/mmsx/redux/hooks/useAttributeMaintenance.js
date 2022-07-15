import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import attributeMaintenanceActions from '~/modules/mmsx/redux/actions/attribute-maintenance'

function useAttributeMaintenance() {
  const data = useSelector((state) => get(state, 'mmsx.attributeMaintenance'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(attributeMaintenanceActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useAttributeMaintenance
