import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getCompaniesFailed,
  getCompaniesSuccess,
  GET_COMPANIES_START,
} from '~/modules/database/redux/actions/common'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getCompaniesApi = () => {
  const uri = `/v1/users/companies/list`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetCompanies(action) {
  try {
    const payload = {
      keyword: '',
      filter: [],
      sort: [],
      isGetAll: 1,
    }
    const response = yield call(getCompaniesApi, payload)

    if (response?.statusCode === 200) {
      yield put(getCompaniesSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getCompaniesFailed())
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
