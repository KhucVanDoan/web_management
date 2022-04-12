import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createMOFailed,
  createMOSuccess,
  CREATE_MO_START,
} from '~/modules/mesx/redux/actions/mo'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createMOApi = (params) => {
  const uri = `v1/produces/manufacturing-orders/create-by-plan`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateMO(action) {
  try {
    const response = yield call(createMOApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createMOSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createMOFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateMO() {
  yield takeLatest(CREATE_MO_START, doCreateMO)
}
