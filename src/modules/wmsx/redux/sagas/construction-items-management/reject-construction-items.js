import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectConstructionItemsByIdFailed,
  rejectConstructionItemsByIdSuccess,
  REJECT_CONSTRUCTION_ITEMS_START,
} from '~/modules/wmsx/redux/actions/construction-items-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectConstructionItemsApi = (params) => {
  const uri = `/v1/sales/construction-categories/${params}/reject`
  return api.put(uri)
}

function* doRejectConstructionItems(action) {
  try {
    const response = yield call(rejectConstructionItemsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectConstructionItemsByIdSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(rejectConstructionItemsByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRejectConstructionItems() {
  yield takeLatest(REJECT_CONSTRUCTION_ITEMS_START, doRejectConstructionItems)
}
