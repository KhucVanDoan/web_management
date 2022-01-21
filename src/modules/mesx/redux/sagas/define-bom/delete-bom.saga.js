import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import addNotification from 'utils/toast'
import {
  deleteBOMFailed,
  deleteBOMSuccess,
  DELETE_BOM_START,
} from 'modules/mesx/redux/actions/define-bom.action'
import { NOTIFICATION_TYPE } from 'common/constants'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteBOMApi = (params) => {
  const uri = `/v1/produces/boms/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteBOM(action) {
  try {
    const response = yield call(deleteBOMApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteBOMSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification('defineBOM.deleteBOMSuccess', NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteBOMFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteBOM() {
  yield takeLatest(DELETE_BOM_START, doDeleteBOM)
}
