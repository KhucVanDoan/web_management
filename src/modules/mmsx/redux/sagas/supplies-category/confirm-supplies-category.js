import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmSuppliesCategoryFail,
  confirmSuppliesCategorySuccess,
  CONFIRM_SUPPLIES_CATEGORY_START,
} from '~/modules/mmsx/redux/actions/supplies-category'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmSuppliesCategoryApi = (params) => {
  const url = `v1/mms/supply-groups/${params}/confirmed`
  return api.put(url)
}

function* doComfirmSuppliesCategory(action) {
  try {
    const response = yield call(confirmSuppliesCategoryApi, action.payload)
    if (response.statusCode === 200) {
      yield put(confirmSuppliesCategorySuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmSuppliesCategoryFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchConfirmSuppliesCategory() {
  yield takeLatest(CONFIRM_SUPPLIES_CATEGORY_START, doComfirmSuppliesCategory)
}
