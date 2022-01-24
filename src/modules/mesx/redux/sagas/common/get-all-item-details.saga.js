import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getAllItemDetailsFailed,
  getAllItemDetailsSuccess,
  GET_ALL_ITEM_DETAILS_START,
} from '~/modules/mesx/redux/actions/common.action'
import { api } from '~/services/api'

/**
 * Get all itemDetails API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getItemDetailsApi = (params) => {
  const uri = `/v1/items/item-details/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetItemDetails(action) {
  try {
    const payload = {
      keyword: '',
      filter: [],
      sort: [],
      isGetAll: 1,
    }
    const response = yield call(getItemDetailsApi, payload)

    if (response?.statusCode === 200) {
      yield put(getAllItemDetailsSuccess(response.data.items))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getAllItemDetailsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get all itemDetails
 */
export default function* watchGetAllItemDetails() {
  yield takeLatest(GET_ALL_ITEM_DETAILS_START, doGetItemDetails)
}
