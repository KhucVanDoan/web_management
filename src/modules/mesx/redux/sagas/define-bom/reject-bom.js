import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectBOMByIdFailed,
  rejectBOMByIdSuccess,
  REJECT_BOM_START,
} from '~/modules/mesx/redux/actions/define-bom'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Reject BOM
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const rejectBOMApi = (params) => {
  const uri = `/v1/produces/boms/${params}/reject`
  return api.put(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doRejectBOM(action) {
  try {
    const response = yield call(rejectBOMApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectBOMByIdSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification('defineBOM.rejectBOMSuccess', NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(rejectBOMByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchRejectBOM() {
  yield takeLatest(REJECT_BOM_START, doRejectBOM)
}
