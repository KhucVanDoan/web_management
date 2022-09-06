import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineBinActions from '~/modules/wmsx/redux/actions/define-bin'

const useDefineBin = () => {
  const data = useSelector((state) => get(state, 'wmsx.defineBin'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineBinActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineBin
