import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import {
  getItemDetailsByIdFailed,
  getItemDetailsByIdSuccess,
  GET_ITEM_DETAILS_START,
} from 'modules/mesx/redux/actions/define-item.action'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getItemDetailsApi = (params) => {
  const uri = `/v1/items/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetItemDetails(action) {
  try {
    const response = yield call(getItemDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getItemDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getItemDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetItemDetails() {
  yield takeLatest(GET_ITEM_DETAILS_START, doGetItemDetails)
}
