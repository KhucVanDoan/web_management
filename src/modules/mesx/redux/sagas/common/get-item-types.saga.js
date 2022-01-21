import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import {
  getItemTypesFailed,
  getItemTypesSuccess,
  GET_ITEM_TYPES_START,
} from 'modules/mesx/redux/actions/common.action'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getItemTypesApi = (params) => {
  const uri = `/v1/users/ping`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetItemTypes(action) {
  try {
    const payload = {
      keyword: '',
      filter: [],
      sort: [],
      isGetAll: 1,
    }
    const response = yield call(getItemTypesApi, payload)

    if (response?.statusCode === 200) {
      yield put(getItemTypesSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getItemTypesFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetItemTypes() {
  yield takeLatest(GET_ITEM_TYPES_START, doGetItemTypes)
}
