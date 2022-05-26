import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createTemplateSectorSuccess,
  createTemplateSectorFailed,
  CREATE_TEMPLATE_SECTOR_START,
} from '~/modules/wmsx/redux/actions/define-template-sector'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createTemplateSectorApi = (params) => {
  const uri = `/v1/warehouses/template-sectors`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateTemplateSector(action) {
  try {
    const response = yield call(createTemplateSectorApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(createTemplateSectorSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
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
    yield put(createTemplateSectorFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch create template sector
 */
export default function* watchCreateTemplateSector() {
  yield takeLatest(CREATE_TEMPLATE_SECTOR_START, doCreateTemplateSector)
}
