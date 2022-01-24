import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getProductsFailed,
  getProductsSuccess,
  GET_PRODUCTS_START,
} from '~/modules/mesx/redux/actions/common.action'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getProductsApi = (params) => {
  const uri = `/v1/items/list`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetProducts(action) {
  try {
    const payload = {
      keyword: '',
      filter: [],
      sort: [],
      isGetAll: 1,
    }
    const response = yield call(getProductsApi, payload)

    if (response?.statusCode === 200) {
      // filter type is product
      const data = response.data.items?.filter(
        (item) => item?.itemTypeCode === 1,
      )
      yield put(getProductsSuccess(data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getProductsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetProducts() {
  yield takeLatest(GET_PRODUCTS_START, doGetProducts)
}
