import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmConstructionItemsByIdFailed,
  confirmConstructionItemsByIdSuccess,
  CONFIRM_CONSTRUCTION_ITEMS_START,
} from '~/modules/wmsx/redux/actions/construction-items-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmConstructionItemsApi = (params) => {
  const uri = `/v1/sales/construction-categories/${params}/confirm`
  return api.put(uri)
}

function* doConfirmConstructionItems(action) {
  try {
    const response = yield call(confirmConstructionItemsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmConstructionItemsByIdSuccess(response.payload))

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
    yield put(confirmConstructionItemsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmConstructionItems() {
  yield takeLatest(CONFIRM_CONSTRUCTION_ITEMS_START, doConfirmConstructionItems)
}
