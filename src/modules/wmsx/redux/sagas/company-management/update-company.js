import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateCompanyFailed,
  updateCompanySuccess,
  UPDATE_COMPANY_START,
} from '~/modules/wmsx/redux/actions/company-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search factory API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateCompanyApi = (params) => {
  const uri = `/v1/users/companies/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateCompany(action) {
  try {
    const response = yield call(updateCompanyApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateCompanySuccess(response.data))

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
    yield put(updateCompanyFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search factorys
 */
export default function* watchUpdateCompany() {
  yield takeLatest(UPDATE_COMPANY_START, doUpdateCompany)
}