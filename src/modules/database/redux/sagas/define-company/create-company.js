import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createCompanyFailed,
  createCompanySuccess,
  CREATE_COMPANY_START,
} from '~/modules/database/redux/actions/define-company'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createCompanyApi = (params) => {
  const uri = `/v1/users/companies/create`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateCompany(action) {
  try {
    const response = yield call(createCompanyApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createCompanySuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createCompanyFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateCompany() {
  yield takeLatest(CREATE_COMPANY_START, doCreateCompany)
}
