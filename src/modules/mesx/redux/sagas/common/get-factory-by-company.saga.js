import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_FACTORIES_BY_COMPANY_START,
  GET_FACTORIES_BY_COMPANY_SUCCESS,
  GET_FACTORIES_BY_COMPANY_FAILED,
} from '~/modules/mesx/redux/actions/common.action'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getFactoriesByCompanyApi = (params) => {
  const uri = `/v1/users/company/${params}/factory/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetFactoriesByCompany(action) {
  try {
    const response = yield call(getFactoriesByCompanyApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put({
        type: GET_FACTORIES_BY_COMPANY_SUCCESS,
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
      type: GET_FACTORIES_BY_COMPANY_FAILED,
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
export default function* watchGetFactoriesByCompany() {
  yield takeLatest(GET_FACTORIES_BY_COMPANY_START, doGetFactoriesByCompany)
}
