import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteConstructionItemsFailed,
  deleteConstructionItemsSuccess,
  DELETE_CONSTRUCTION_ITEMS_START,
} from '~/modules/wmsx/redux/actions/construction-items-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteConstructionItemsApi = (params) => {
  const uri = `/v1/sales/construction-categories/${params}`
  return api.delete(uri)
}

function* doDeleteConstructionItems(action) {
  try {
    const response = yield call(deleteConstructionItemsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteConstructionItemsSuccess(response.results))

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
    yield put(deleteConstructionItemsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteConstructionItems() {
  yield takeLatest(DELETE_CONSTRUCTION_ITEMS_START, doDeleteConstructionItems)
}
