import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getTemplateSectorDetailByIdSuccess,
  getTemplateSectorDetailByIdFailed,
  GET_TEMPLATE_SECTOR_DETAIL_START,
} from '~/modules/wmsx/redux/actions/define-template-sector'
import { api } from '~/services/api'

/**
 * Search BOQ API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getTemplateSectorDetailsApi = (params) => {
  const uri = `/v1/warehouses/template-sectors/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetTemplateSectorDetails(action) {
  try {
    const response = yield call(getTemplateSectorDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getTemplateSectorDetailByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getTemplateSectorDetailByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search TemplateSector details
 */
export default function* watchGetTemplateSectorDetail() {
  yield takeLatest(GET_TEMPLATE_SECTOR_DETAIL_START, doGetTemplateSectorDetails)
}
