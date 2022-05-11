import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getTemplateShelfDetailByIdFailed,
  getTemplateShelfDetailByIdSuccess,
  GET_TEMPLATE_SHELF_DETAIL_START,
} from '~/modules/wmsx/redux/actions/define-template-shelf'
import { api } from '~/services/api'
/**
 * Search TemplateShelf API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getTemplateShelfDetailsApi = (params) => {
  const uri = `/v1/warehouses/template-shelfs/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetTemplateShelfDetails(action) {
  try {
    const response = yield call(getTemplateShelfDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getTemplateShelfDetailByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getTemplateShelfDetailByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search TemplateShelf details
 */
export default function* watchGetTemplateShelfDetail() {
  yield takeLatest(GET_TEMPLATE_SHELF_DETAIL_START, doGetTemplateShelfDetails)
}
