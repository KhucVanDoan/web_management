import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import definePalletActions from '~/modules/wmsx/redux/actions/define-pallet'

const useDefinePallet = () => {
  const data = useSelector((state) => get(state, 'wmsx.definePallet'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(definePalletActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefinePallet
