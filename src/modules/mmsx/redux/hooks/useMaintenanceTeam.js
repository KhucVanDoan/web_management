import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import maintenanceTeamAction from '~/modules/mmsx/redux/actions/maintenance-team'

function useMaintenanceTeam() {
  const data = useSelector((state) => get(state, 'mmsx.maintenanceTeam'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(maintenanceTeamAction, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useMaintenanceTeam
