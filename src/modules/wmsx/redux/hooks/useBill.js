import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineBillActions from '~/modules/wmsx/redux/actions/define-bill'

const useBill = () => {
  const data = useSelector((state) => get(state, 'wmsx.bill'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineBillActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useBill
