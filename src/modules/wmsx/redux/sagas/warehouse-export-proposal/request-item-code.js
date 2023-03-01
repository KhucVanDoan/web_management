import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  requestItemCodeFailed,
  requestItemCodeSuccess,
  REQUEST_ITEM_CODE_START,
} from '~/modules/wmsx/redux/actions/warehouse-export-proposal'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const requestItemCodeApi = (params) => {
  const uri = `/v1/warehouses/warehouse-export-proposals/${params?.id}/request-item`
  return api.put(uri, params)
}
export const getAllItemStockAvailable = (params) => {
  const uri = `/v1/items/item-warehouses/all-stock-available`
  return api.post(uri, params)
}
function* doRequestItemCode(action) {
  try {
    const response = yield call(requestItemCodeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(requestItemCodeSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(requestItemCodeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRequestItemCode() {
  yield takeLatest(REQUEST_ITEM_CODE_START, doRequestItemCode)
}
