import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateBusinessTypeFailed,
  updateBusinessTypeSuccess,
  UPDATE_BUSINESS_TYPE_START,
} from '~/modules/wmsx/redux/actions/business-type-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateBusinessTypeApi = (params) => {
  const uri = `/v1/warehouses/bussiness-types/${params?.id}`
  return api.put(uri, params)
}

function* doUpdateBusinessType(action) {
  try {
    const response = yield call(updateBusinessTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateBusinessTypeSuccess(response.results))

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
    yield put(updateBusinessTypeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateBusinessType() {
  yield takeLatest(UPDATE_BUSINESS_TYPE_START, doUpdateBusinessType)
}
