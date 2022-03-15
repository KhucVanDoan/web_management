import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getAllListSuccess,
  searchRequestBuyMaterialsFailed,
  searchRequestBuyMaterialsSuccess,
  SEARCH_REQUEST_BUY_MATERIALS_START,
} from '~/modules/mesx/redux/actions/request-by-materials'
import { api } from '~/services/api'

/**
 * Search inventory-calendar API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchRequestBuyMaterialsApi = (params) => {
  const url = '/v1/produces/material-request-warnings/list'
  return api.get(url, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchRequestBuyMaterials(action) {
  try {
    const response = yield call(searchRequestBuyMaterialsApi, action?.payload)
    const responseAll = yield call(searchRequestBuyMaterialsApi, {
      isGetAll: 1,
    })

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchRequestBuyMaterialsSuccess(payload))
      yield put(getAllListSuccess(responseAll?.data?.items))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchRequestBuyMaterialsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search inventory-calendars
 */
export default function* watchSearchRequestBuyMaterials() {
  yield takeLatest(
    SEARCH_REQUEST_BUY_MATERIALS_START,
    doSearchRequestBuyMaterials,
  )
}
