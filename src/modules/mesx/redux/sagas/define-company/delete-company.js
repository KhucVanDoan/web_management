import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteCompanyFailed,
  deleteCompanySuccess,
  DELETE_COMPANY_START,
} from '~/modules/mesx/redux/actions/define-company'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteCompanyApi = (params) => {
  const uri = `/v1/users/companies/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteCompany(action) {
  try {
    const response = yield call(deleteCompanyApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteCompanySuccess(response.results))

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
    yield put(deleteCompanyFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteCompany() {
  yield takeLatest(DELETE_COMPANY_START, doDeleteCompany)
}
