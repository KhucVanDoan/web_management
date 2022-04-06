import { NOTIFICATION_TYPE } from 'common/constant'
import addNotification from 'common/toast'
import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'

import {
  createRequestBuyMaterialFailed,
  createRequestBuyMaterialSuccess,
  CREATE_REQUEST_BUY_MATERIAL_START,
} from '~/modules/mesx/redux/actions/request-by-materials'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createRequestBuyMaterialApi = (params) => {
  const uri = `/v1/produces/material-request-warnings/create`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateRequestBuyMaterial(action) {
  try {
    const response = yield call(createRequestBuyMaterialApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createRequestBuyMaterialSuccess(response.data))

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
    yield put(createRequestBuyMaterialFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateRequestBuyMaterial() {
  yield takeLatest(
    CREATE_REQUEST_BUY_MATERIAL_START,
    doCreateRequestBuyMaterial,
  )
}
