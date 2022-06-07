import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  searchTemplateSectorsSuccess,
  searchTemplateSectorsFailed,
  SEARCH_TEMPLATE_SECTORS_START,
} from '~/modules/wmsx/redux/actions/define-template-sector'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search boq API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchTemplateSectorsApi = (params) => {
  const uri = `/v1/warehouses/template-sectors`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchTemplateSectors(action) {
  try {
    const response = yield call(searchTemplateSectorsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchTemplateSectorsSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(payload)
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchTemplateSectorsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search so export
 */
export default function* watchSearchTemplateSectors() {
  yield takeLatest(SEARCH_TEMPLATE_SECTORS_START, doSearchTemplateSectors)
}
