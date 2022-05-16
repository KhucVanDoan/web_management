import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getCompanyDetailsByIdFailed,
  getCompanyDetailsByIdSuccess,
  GET_COMPANY_DETAILS_START,
} from '~/modules/database/redux/actions/define-company'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getCompanyDetailsApi = (params) => {
  const uri = `/v1/users/companies/${params}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetCompanyDetails(action) {
  try {
    const response = yield call(getCompanyDetailsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getCompanyDetailsByIdSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getCompanyDetailsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetCompanyDetails() {
  yield takeLatest(GET_COMPANY_DETAILS_START, doGetCompanyDetails)
}
