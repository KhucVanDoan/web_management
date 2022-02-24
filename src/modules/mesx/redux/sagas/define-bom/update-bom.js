import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateBOMFailed,
  updateBOMSuccess,
  UPDATE_BOM_START,
} from '~/modules/mesx/redux/actions/define-bom'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Update BOM API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateBOMApi = (params) => {
  const uri = `/v1/produces/boms/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateBOM(action) {
  try {
    const response = yield call(updateBOMApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateBOMSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification('defineBOM.updateBOMSuccess', NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateBOMFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search production-orders
 */
export default function* watchUpdateBOM() {
  yield takeLatest(UPDATE_BOM_START, doUpdateBOM)
}