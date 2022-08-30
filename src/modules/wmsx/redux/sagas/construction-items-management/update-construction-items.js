import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateConstructionItemsFailed,
  updateConstructionItemsSuccess,
  UPDATE_CONSTRUCTION_ITEMS_START,
} from '~/modules/wmsx/redux/actions/construction-items-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateConstructionItemsApi = (params) => {
  const uri = `/v1/sales/construction-categories/${params?.id}`
  return api.put(uri, params)
}

function* doUpdateConstructionItems(action) {
  try {
    const response = yield call(updateConstructionItemsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateConstructionItemsSuccess(response.results))

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
    yield put(updateConstructionItemsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateConstructionItems() {
  yield takeLatest(UPDATE_CONSTRUCTION_ITEMS_START, doUpdateConstructionItems)
}
