import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import templateInstallActions from '~/modules/mmsx/redux/actions/template-install'

function useTemplateInstall() {
  const data = useSelector((state) => get(state, 'mmsx.defineInstallTemplate'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(templateInstallActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useTemplateInstall
