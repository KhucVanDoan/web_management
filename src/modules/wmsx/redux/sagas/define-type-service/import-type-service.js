import { call, put, takeLatest } from 'redux-saga/effects'

import {
  importTypeServiceFailed,
  importTypeServiceSuccess,
  WMSX_IMPORT_TYPE_SERVICE_START,
} from '~/modules/wmsx/redux/actions/define-type-service'
import { api } from '~/services/api'

/**
 * import customer
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const importTypeServiceApi = (body) => {
  const uri = `/v1/warehouse-yard/service-types/import`
  let formData = new FormData()
  formData.append('file', body.originFileObj)
  return api.postMultiplePart(uri, formData)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doImportTypeService(action) {
  try {
    const response = yield call(importTypeServiceApi, action?.payload)

    if (response) {
      yield put(importTypeServiceSuccess(response))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      } else {
        throw new Error(response?.message)
      }
    }
  } catch (error) {
    yield put(importTypeServiceFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch import item group
 */
export default function* watchImportTypeService() {
  yield takeLatest(WMSX_IMPORT_TYPE_SERVICE_START, doImportTypeService)
}
