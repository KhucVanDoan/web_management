import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import addNotification from 'utils/toast'
import {
  updateItemFailed,
  updateItemSuccess,
  UPDATE_ITEM_START,
} from 'modules/mesx/redux/actions/define-item.action'
import { NOTIFICATION_TYPE } from 'common/constants'

/**
 * Search item API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateItemApi = (params) => {
  const uri = `/v1/items/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateItem(action) {
  try {
    const response = yield call(updateItemApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateItemSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification('defineItem.updateItemSuccess', NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateItemFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search items
 */
export default function* watchUpdateItem() {
  yield takeLatest(UPDATE_ITEM_START, doUpdateItem)
}
