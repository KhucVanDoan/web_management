import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import addNotification from 'utils/toast'
import { NOTIFICATION_TYPE } from 'common/constants'

import {
  createBOQFailed,
  createBOQSuccess,
  CREATE_BOQ_START,
} from 'modules/mesx/redux/actions/define-boq.action'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createBOQApi = (params) => {
  const uri = `v1/produces/boqs/create`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateBOQ(action) {
  try {
    const response = yield call(createBOQApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createBOQSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification('defineBOQ.createBOQSuccess', NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createBOQFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateBOQ() {
  yield takeLatest(CREATE_BOQ_START, doCreateBOQ)
}
