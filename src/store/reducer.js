import { combineReducers } from 'redux'

import authReducers from '~/modules/auth/redux/reducers'
import mesxReducers from '~/modules/mesx/redux/reducers'
import qmsxReducers from '~/modules/qmsx/redux/reducers'

const rootReducer = combineReducers({
  ...authReducers,
  ...mesxReducers,
  ...qmsxReducers,
})

export default rootReducer
