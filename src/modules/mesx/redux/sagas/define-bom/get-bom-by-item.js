import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getBomByItemFailed,
  getBomByItemSuccess,
  GET_BOM_BY_ITEM_START,
} from '~/modules/mesx/redux/actions/define-bom'
import { api } from '~/services/api'

/**
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getBomByItemApi = (params) => {
  const uri = `/v1/produces/boms/get-by-item/${params}`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetBomByItem(action) {
  try {
    const response = yield call(getBomByItemApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getBomByItemSuccess(response.data.items))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getBomByItemFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search boms
 */
export default function* watchGetBomByItem() {
  yield takeLatest(GET_BOM_BY_ITEM_START, doGetBomByItem)
}
