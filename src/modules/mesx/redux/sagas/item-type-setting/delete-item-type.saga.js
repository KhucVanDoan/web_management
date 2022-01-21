import { NOTIFICATION_TYPE } from 'common/constants'
import addNotification from 'utils/toast'
import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import { getAppStore } from 'modules/auth/redux/actions/app-store'
import {
  deleteItemTypeFailed,
  deleteItemTypeSuccess,
  DELETE_ITEM_TYPE_START,
} from 'modules/mesx/redux/actions/item-type-setting.action'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const deleteItemTypeApi = (params) => {
  const uri = `/v1/items/item-type-settings/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteItemType(action) {
  try {
    const response = yield call(deleteItemTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteItemTypeSuccess(response.results))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      yield put(getAppStore())

      addNotification(
        'itemTypeSetting.deleteItemTypeSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteItemTypeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteItemType() {
  yield takeLatest(DELETE_ITEM_TYPE_START, doDeleteItemType)
}
