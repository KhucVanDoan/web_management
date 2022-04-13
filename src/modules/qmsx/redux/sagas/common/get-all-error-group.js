import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getAllErrorGroupFailed,
  getAllErrorGroupSuccess,
  GET_ALL_ERROR_GROUP_START,
} from '~/modules/qmsx/redux/actions/common'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getAllErrorGroupApi = () => {
  const uri = `/v1/quality-controls/check-lists/list-error-group`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetAllErrorGroup(action) {
  try {
    const payload = {
      keyword: '',
      filter: [],
      sort: [],
      isGetAll: 1,
    }
    const response = yield call(getAllErrorGroupApi, payload)

    if (response?.statusCode === 200) {
      yield put(getAllErrorGroupSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getAllErrorGroupFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetAllErrorGroup() {
  yield takeLatest(GET_ALL_ERROR_GROUP_START, doGetAllErrorGroup)
}
