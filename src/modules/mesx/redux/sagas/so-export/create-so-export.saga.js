import { call, put, takeLatest } from 'redux-saga/effects'


import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createSOExportFailed,
  createSOExportSuccess,
  CREATE_SO_EXPORT_START,
} from '~/modules/mesx/redux/actions/so-export.action'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createSOExportsApi = (params) => {
  const uri = `/v1/sales/sale-order-exports/create`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateSOExport(action) {
  try {
    const response = yield call(createSOExportsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createSOExportSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'soExport.createSOExportSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createSOExportFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateSOExport() {
  yield takeLatest(CREATE_SO_EXPORT_START, doCreateSOExport)
}
