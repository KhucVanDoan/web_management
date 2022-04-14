import { combineReducers } from 'redux'

import authReducers from '~/modules/auth/redux/reducers'
import mesxReducers from '~/modules/mesx/redux/reducers'
import qmsxReducers from '~/modules/qmsx/redux/reducers'

export default combineReducers({
  ...authReducers,
  mesx: mesxReducers,
  qmsx: qmsxReducers,
})
