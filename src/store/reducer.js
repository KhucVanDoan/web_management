import { combineReducers } from 'redux'

import authReducers from '~/modules/auth/redux/reducers'
import configurationReducers from '~/modules/configuration/redux/reducers'
import mesxReducers from '~/modules/mesx/redux/reducers'
import publicReducers from '~/modules/public/redux/reducers'
import sharedReducers from '~/modules/shared/redux/reducers'
import wmsxReducers from '~/modules/wmsx/redux/reducers'

export default combineReducers({
  ...authReducers,
  shared: sharedReducers,
  mesx: mesxReducers,
  wmsx: wmsxReducers,
  configuration: configurationReducers,
  public: publicReducers,
})
