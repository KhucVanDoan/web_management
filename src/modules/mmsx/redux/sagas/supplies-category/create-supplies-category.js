import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createSuppliesCategorySuccess,
  createSuppliesCategoryFail,
  CREATE_SUPPLIES_CATEGORY_START,
} from '~/modules/mmsx/redux/actions/supplies-category'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createSuppliesCategory = (params) => {
  const url = `v1/mms/supply-groups`
  return api.post(url, params)
}

function* doCreateSuppliesCategory(action) {
  try {
    const response = yield call(createSuppliesCategory, action.payload)

    if (response.statusCode === 200) {
      yield put(createSuppliesCategorySuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createSuppliesCategoryFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateSuppliesCategory() {
  yield takeLatest(CREATE_SUPPLIES_CATEGORY_START, doCreateSuppliesCategory)
}
