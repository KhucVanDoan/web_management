import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  searchPalletsFailed,
  searchPalletsSuccess,
  WMSX_SEARCH_PALLETS_START,
} from '~/modules/wmsx/redux/actions/define-pallet'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search pallets api
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
export const searchPalletsApi = (params) => {
  const uri = `/v1/items/pallets/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchPallets(action) {
  try {
    const response = yield call(searchPalletsApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data.items,
        total: response.data.meta.total,
      }
      yield put(searchPalletsSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      yield put(searchPalletsFailed())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(searchPalletsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search so export
 */
export default function* watchSearchPallets() {
  yield takeLatest(WMSX_SEARCH_PALLETS_START, doSearchPallets)
}
