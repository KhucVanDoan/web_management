import { combineReducers } from 'redux'

import authReducers from '~/modules/auth/redux/reducers'
import mesxReducers from '~/modules/mesx/redux/reducers'

const rootReducer = combineReducers({
  ...authReducers,
  ...mesxReducers,
})

export default rootReducer
