import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateSuppliesCategorySuccess,
  updateSuppliesCategoryFail,
  UPDATE_SUPPLIES_CATEGORY_START,
} from '~/modules/mmsx/redux/actions/supplies-category'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateSuppliesCategory = (params) => {
  const url = `v1/mms/supply-groups/${params.id}`
  return api.put(url, params)
}

function* doUpdateSuppliesCategory(action) {
  try {
    const response = yield call(updateSuppliesCategory, action?.payload)
    if (response.statusCode === 200) {
      yield put(updateSuppliesCategorySuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateSuppliesCategoryFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateSuppliesCategory() {
  yield takeLatest(UPDATE_SUPPLIES_CATEGORY_START, doUpdateSuppliesCategory)
}
