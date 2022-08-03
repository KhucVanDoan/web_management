import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getAllConfirmSuppliesCategorySuccess,
  getAllConfirmSuppliesCategoryFail,
  GET_ALL_CONFRIM_SUPPLIES_CATEGORY_START,
} from '~/modules/mmsx/redux/actions/supplies-category'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

export const getAllConfirmSuppliesCategory = () => {
  const url = `v1/mms/supply-groups/list/confirmed`
  return api.get(url)
}

function* doGetAllConfirmSuppliesCategory(action) {
  try {
    const response = yield call(getAllConfirmSuppliesCategory, action?.payload)

    if (response.statusCode === 200) {
      yield put(getAllConfirmSuppliesCategorySuccess(response?.data))

      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getAllConfirmSuppliesCategoryFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetAllConfirmSuppliesCategory() {
  yield takeLatest(
    GET_ALL_CONFRIM_SUPPLIES_CATEGORY_START,
    doGetAllConfirmSuppliesCategory,
  )
}
