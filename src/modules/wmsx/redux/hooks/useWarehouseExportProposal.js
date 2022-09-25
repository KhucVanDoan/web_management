import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import warehouseExportProposalAction from '~/modules/wmsx/redux/actions/warehouse-export-proposal'

const useWarehouseExportProposal = () => {
  const data = useSelector((state) =>
    get(state, 'wmsx.warehouseExportProposal'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(warehouseExportProposalAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useWarehouseExportProposal
