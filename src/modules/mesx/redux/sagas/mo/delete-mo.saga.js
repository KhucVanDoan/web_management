import { call, put, takeLatest } from 'redux-saga/effects'


import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteMOFailed,
  deleteMOSuccess,
  DELETE_MO_START,
} from '~/modules/mesx/redux/actions/mo.action'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteMOApi = (params) => {
  const uri = `/v1/produces/manufacturing-orders/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteMO(action) {
  try {
    const response = yield call(deleteMOApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteMOSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification('Mo.deleteMOSuccess', NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteMOFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteMO() {
  yield takeLatest(DELETE_MO_START, doDeleteMO)
}
