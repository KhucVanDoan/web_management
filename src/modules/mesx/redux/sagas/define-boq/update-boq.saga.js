import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import addNotification from 'utils/toast'
import {
  updateBOQFailed,
  updateBOQSuccess,
  UPDATE_BOQ_START,
} from 'modules/mesx/redux/actions/define-boq.action'
import { NOTIFICATION_TYPE } from 'common/constants'

/**
 * Update BOQ API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateBOQApi = (params) => {
  const uri = `/v1/produces/boqs/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateBOQ(action) {
  try {
    const response = yield call(updateBOQApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateBOQSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification('defineBOQ.updateBOQSuccess', NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateBOQFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search production-orders
 */
export default function* watchUpdateBOQ() {
  yield takeLatest(UPDATE_BOQ_START, doUpdateBOQ)
}
