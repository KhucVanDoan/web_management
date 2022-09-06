import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import storagePeriodActions from '~/modules/wmsx/redux/actions/set-storage-period'

const useSetStoragePeriod = () => {
  const data = useSelector((state) => get(state, 'wmsx.setStoragePeriod'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(storagePeriodActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useSetStoragePeriod
