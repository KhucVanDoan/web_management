import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchCompaniesFailed,
  searchCompaniesSuccess,
  SEARCH_COMPANIES_START,
} from '~/modules/wmsx/redux/actions/company-management'
import { api } from '~/services/api'

/**
 * Search factory API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchCompaniesApi = (params) => {
  const uri = `/v1/users/companies/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchCompanies(action) {
  try {
    const response = yield call(searchCompaniesApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchCompaniesSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchCompaniesFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search factorys
 */
export default function* watchSearchCompanies() {
  yield takeLatest(SEARCH_COMPANIES_START, doSearchCompanies)
}
