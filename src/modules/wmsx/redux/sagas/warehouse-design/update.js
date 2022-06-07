import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  updateWarehouseDesignFailed,
  updateWarehouseDesignSuccess,
  UPDATE_WAREHOUSE_DESIGN_START,
} from '../../actions/warehouse-design'

/**
 * update warehouse design
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateWarehouseDesignApi = (params) => {
  const uri = `/v1/warehouses/${params.id}/design`
  return api.put(uri, params)
}

/**
 * Handle update data
 * @param {object} action
 */
function* doUpdateWarehouseDesign(action) {
  try {
    const response = yield call(updateWarehouseDesignApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateWarehouseDesignSuccess(response.data))

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
    yield put(updateWarehouseDesignFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateWarehouseDesign() {
  yield takeLatest(UPDATE_WAREHOUSE_DESIGN_START, doUpdateWarehouseDesign)
}
