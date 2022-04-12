import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getAppStoreFailed,
  getAppStoreSuccess,
  GET_APP_STORE_START,
} from '../actions/app-store'

/**
 * Get app store API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getAppStoreApi = (params) => {
  const uri = `/v1/app/env`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetAppStore(action) {
  try {
    const response = yield call(getAppStoreApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getAppStoreSuccess(response?.data))
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getAppStoreFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get app store
 */
export default function* watchGetAppStore() {
  yield takeLatest(GET_APP_STORE_START, doGetAppStore)
}
