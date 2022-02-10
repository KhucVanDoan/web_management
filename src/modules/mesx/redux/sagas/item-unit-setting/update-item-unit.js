import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { getAppStore } from '~/modules/auth/redux/actions/app-store'
import {
  updateItemUnitFailed,
  updateItemUnitSuccess,
  UPDATE_ITEM_UNIT_START,
} from '~/modules/mesx/redux/actions/item-unit-setting'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const updateItemUnitApi = (body) => {
  const uri = `/v1/items/item-unit-settings/${body.id}`
  return api.put(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateItemUnit(action) {
  try {
    const response = yield call(updateItemUnitApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateItemUnitSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      yield put(getAppStore())
      addNotification(
        'itemUnitSetting.updateItemUnitSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateItemUnitFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateItemUnit() {
  yield takeLatest(UPDATE_ITEM_UNIT_START, doUpdateItemUnit)
}
