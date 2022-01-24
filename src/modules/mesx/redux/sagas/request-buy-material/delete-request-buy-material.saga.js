import { call, put, takeLatest } from 'redux-saga/effects'


import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteRequestBuyMaterialFailed,
  deleteRequestBuyMaterialSuccess,
  DELETE_REQUEST_BUY_MATERIAL_START,
} from '~/modules/mesx/redux/actions/request-by-materials.action'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteRequestBuyMaterialApi = (params) => {
  const uri = `/v1/produces/work-orders/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteRequestBuyMaterial(action) {
  try {
    const response = yield call(deleteRequestBuyMaterialApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteRequestBuyMaterialSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(
        'requestBuyMaterial.deleteRequestBuyMaterialSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteRequestBuyMaterialFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteRequestBuyMaterial() {
  yield takeLatest(
    DELETE_REQUEST_BUY_MATERIAL_START,
    doDeleteRequestBuyMaterial,
  )
}
