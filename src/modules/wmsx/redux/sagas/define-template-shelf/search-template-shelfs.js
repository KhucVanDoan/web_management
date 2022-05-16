import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  searchTemplateShelfsFailed,
  searchTemplateShelfsSuccess,
  SEARCH_TEMPLATE_SHELFS_START,
} from '~/modules/wmsx/redux/actions/define-template-shelf'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search template shelfs api
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchTemplateShelfsApi = (params) => {
  const uri = `/v1/warehouses/template-shelfs`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchTemplateShelfs(action) {
  try {
    const response = yield call(searchTemplateShelfsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchTemplateShelfsSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchTemplateShelfsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search so export
 */
export default function* watchSearchTemplateShelfs() {
  yield takeLatest(SEARCH_TEMPLATE_SHELFS_START, doSearchTemplateShelfs)
}
