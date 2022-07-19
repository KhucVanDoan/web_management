import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getPackagesEvenByItemFailed,
  getPackagesEvenByItemSuccess,
  GET_PACKAGES_EVEN_BY_ITEM_START,
} from '~/modules/wmsx/redux/actions/define-package'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getPackagesEvenByItemApi = (params) => {
  const uri = `/v1/items/packages/${params}/evenly`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetPackagesEvenByItem(action) {
  try {
    const response = yield call(getPackagesEvenByItemApi, action?.payload)

    if (response?.statusCode === 200) {
      const payload = {
        list: response.data,
      }
      yield put(getPackagesEvenByItemSuccess(payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getPackagesEvenByItemFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetPackagesEvenByItem() {
  yield takeLatest(GET_PACKAGES_EVEN_BY_ITEM_START, doGetPackagesEvenByItem)
}
