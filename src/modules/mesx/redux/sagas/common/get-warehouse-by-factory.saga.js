import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_WAREHOUSES_BY_FACTORIES_START,
  GET_WAREHOUSES_BY_FACTORIES_SUCCESS,
  GET_WAREHOUSES_BY_FACTORIES_FAILED,
} from '~/modules/mesx/redux/actions/common'
import { api } from '~/services/api'
/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getWarehousesByFactoriesApi = (params) => {
  const uri = `/v1/users/ping`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetWarehousesByFactories(action) {
  try {
    const response = yield call(getWarehousesByFactoriesApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put({
        type: GET_WAREHOUSES_BY_FACTORIES_SUCCESS,
        payload: response.data,
      })

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put({
      type: GET_WAREHOUSES_BY_FACTORIES_FAILED,
    })
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetWarehousesByFactories() {
  yield takeLatest(
    GET_WAREHOUSES_BY_FACTORIES_START,
    doGetWarehousesByFactories,
  )
}
