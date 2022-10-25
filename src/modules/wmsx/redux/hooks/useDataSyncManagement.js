import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import dataSyncManagementActions from '~/modules/wmsx/redux/actions/data-sync-management'

const useDataSyncManagement = () => {
  const data = useSelector((state) => get(state, 'wmsx.dataSyncManagement'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(dataSyncManagementActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDataSyncManagement
