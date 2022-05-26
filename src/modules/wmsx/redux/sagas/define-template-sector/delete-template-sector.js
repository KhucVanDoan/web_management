import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteTemplateSectorSuccess,
  deleteTemplateSectorFailed,
  DELETE_TEMPLATE_SECTOR_START,
} from '~/modules/wmsx/redux/actions/define-template-sector'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteTemplateSectorApi = (params) => {
  const uri = `/v1/warehouses/template-sectors/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteTemplateSector(action) {
  try {
    const response = yield call(deleteTemplateSectorApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteTemplateSectorSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteTemplateSectorFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch delete template sector
 */
export default function* watchDeleteTemplateSector() {
  yield takeLatest(DELETE_TEMPLATE_SECTOR_START, doDeleteTemplateSector)
}
