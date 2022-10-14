import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import licenseActions from '~/modules/public/redux/actions/license'

function useLicense() {
  const data = useSelector((state) => get(state, 'public.license'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(licenseActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useLicense
