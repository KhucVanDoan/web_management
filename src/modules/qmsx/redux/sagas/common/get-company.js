import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_COMPANIES_START,
  GET_COMPANIES_SUCCESS,
  GET_COMPANIES_FAILED,
} from '~/modules/qmsx/redux/actions/common'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getCompaniesApi = () => {
  return {
    statusCode: 200,
    data: [{ id: 1, name: 'doieie' }],
  }
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetCompanies(action) {
  try {
    const response = yield call(getCompaniesApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put({
        type: GET_COMPANIES_SUCCESS,
        payload: response.data,
      })

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put({
      type: GET_COMPANIES_FAILED,
    })
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetCompanies() {
  yield takeLatest(GET_COMPANIES_START, doGetCompanies)
}
