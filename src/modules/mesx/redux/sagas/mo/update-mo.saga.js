import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import addNotification from 'utils/toast'
import {
  updateMOFailed,
  updateMOSuccess,
  UPDATE_MO_START,
} from 'modules/mesx/redux/actions/mo.action'
import { NOTIFICATION_TYPE } from 'common/constants'

/**
 * Update MO API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateMOApi = (params) => {
  const uri = `/v1/produces/manufacturing-orders/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateMO(action) {
  try {
    const response = yield call(updateMOApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateMOSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification('Mo.updateMOSuccess', NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateMOFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search production-orders
 */
export default function* watchUpdateMO() {
  yield takeLatest(UPDATE_MO_START, doUpdateMO)
}
