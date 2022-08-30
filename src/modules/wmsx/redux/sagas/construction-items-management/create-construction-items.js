import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createConstructionItemsFailed,
  createConstructionItemsSuccess,
  CREATE_CONSTRUCTION_ITEMS_START,
} from '~/modules/wmsx/redux/actions/construction-items-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createConstructionItemsApi = (body) => {
  const uri = `/v1/sales/construction-categories/create`
  return api.post(uri, body)
}

function* doCreateConstructionItems(action) {
  try {
    const response = yield call(createConstructionItemsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createConstructionItemsSuccess(response.data))

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
    yield put(createConstructionItemsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateConstructionItems() {
  yield takeLatest(CREATE_CONSTRUCTION_ITEMS_START, doCreateConstructionItems)
}
