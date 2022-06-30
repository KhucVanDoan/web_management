import { useMemo } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineInstallationTemplateAction from '~/modules/mmsx/redux/actions/define-installation-template'

function useDefineInstallationTemplate() {
  const data = useSelector((state) => get(state, 'mmsx.defineInstallTemplate'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineInstallationTemplateAction, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}
export default useDefineInstallationTemplate
