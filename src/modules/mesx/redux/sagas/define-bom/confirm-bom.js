import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmBOMByIdFailed,
  // confirmBOMByIdSuccess,
  CONFIRM_BOM_START,
} from '~/modules/mesx/redux/actions/define-bom'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Confirm BOM
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmBOMApi = (params) => {
  const uri = `/v1/produces/boms/${params}/confirm`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmBOM(action) {
  try {
    const response = yield call(confirmBOMApi, action?.payload)

    if (response?.statusCode === 200) {
      // yield put(confirmBOMByIdSuccess(response.payload))

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
    yield put(confirmBOMByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchConfirmBOM() {
  yield takeLatest(CONFIRM_BOM_START, doConfirmBOM)
}
