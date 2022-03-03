import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmRequestBuyMaterialByIdFailed,
  confirmRequestBuyMaterialByIdSuccess,
  CONFIRM_REQUEST_BUY_MATERIAL_START,
} from '~/modules/mesx/redux/actions/request-by-materials'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Confirm production order
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const confirmRequestBuyMaterialApi = (params) => {
  const url = `v1/produces/material-request-warnings/${params}/confirm`
  return api.put(url)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doConfirmRequestBuyMaterial(action) {
  try {
    const response = yield call(confirmRequestBuyMaterialApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmRequestBuyMaterialByIdSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'requestBuyMaterial.confirmRequestBuyMaterialSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmRequestBuyMaterialByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchConfirmRequestBuyMaterial() {
  yield takeLatest(
    CONFIRM_REQUEST_BUY_MATERIAL_START,
    doConfirmRequestBuyMaterial,
  )
}
