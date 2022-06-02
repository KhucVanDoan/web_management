import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteTypeServiceFailed,
  deleteTypeServiceSuccess,
  WMSX_DELETE_TYPE_SERVICE_START,
} from '~/modules/wmsx/redux/actions/define-type-service'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteTypeServiceApi = (params) => {
  const uri = `/v1/warehouse-yard/service-types/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteTypeService(action) {
  try {
    const response = yield call(deleteTypeServiceApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteTypeServiceSuccess(response.results))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteTypeServiceFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteTypeService() {
  yield takeLatest(WMSX_DELETE_TYPE_SERVICE_START, doDeleteTypeService)
}
