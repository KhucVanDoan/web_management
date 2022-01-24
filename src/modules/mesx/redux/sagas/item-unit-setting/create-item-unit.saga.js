import { call, put, takeLatest } from 'redux-saga/effects'


import { NOTIFICATION_TYPE } from '~/common/constants'
import { getAppStore } from '~/modules/auth/redux/actions/app-store'
import {
  createItemUnitFailed,
  createItemUnitSuccess,
  CREATE_ITEM_UNIT_START,
} from '~/modules/mesx/redux/actions/item-unit-setting.action'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} body Params will be sent to server
 * @returns {Promise}
 */
const createItemUnitApi = (body) => {
  const uri = `/v1/items/item-unit-settings/create`
  return api.post(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateItemUnit(action) {
  try {
    const response = yield call(createItemUnitApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createItemUnitSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      yield put(getAppStore())

      addNotification(
        'itemUnitSetting.createItemUnitSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createItemUnitFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateItemUnit() {
  yield takeLatest(CREATE_ITEM_UNIT_START, doCreateItemUnit)
}
