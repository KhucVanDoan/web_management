import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import addNotification from 'utils/toast'
import {
  deleteBOQFailed,
  deleteBOQSuccess,
  DELETE_BOQ_START,
} from 'modules/mesx/redux/actions/define-boq.action'
import { NOTIFICATION_TYPE } from 'common/constants'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteBOQApi = (params) => {
  const uri = `/v1/produces/boqs/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteBOQ(action) {
  try {
    const response = yield call(deleteBOQApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteBOQSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification('defineBOQ.deleteBOQSuccess', NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteBOQFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteBOQ() {
  yield takeLatest(DELETE_BOQ_START, doDeleteBOQ)
}
