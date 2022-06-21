import { combineReducers } from 'redux'

import authReducers from '~/modules/auth/redux/reducers'
import configurationReducers from '~/modules/configuration/redux/reducers'
import databaseReducers from '~/modules/database/redux/reducers'
import mesxReducers from '~/modules/mesx/redux/reducers'
import mmsxReducers from '~/modules/mmsx/redux/reducers'
import qmsxReducers from '~/modules/qmsx/redux/reducers'
import sharedReducers from '~/modules/shared/redux/reducers'
import wmsxReducers from '~/modules/wmsx/redux/reducers'

export default combineReducers({
  ...authReducers,
  shared: sharedReducers,
  mesx: mesxReducers,
  qmsx: qmsxReducers,
  wmsx: wmsxReducers,
  database: databaseReducers,
  configuration: configurationReducers,
  mmsx: mmsxReducers,
})
