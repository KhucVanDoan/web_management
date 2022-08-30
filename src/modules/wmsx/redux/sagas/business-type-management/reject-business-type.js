import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectBusinessTypeByIdFailed,
  rejectBusinessTypeByIdSuccess,
  REJECT_BUSINESS_TYPE_START,
} from '~/modules/wmsx/redux/actions/business-type-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectBusinessTypeApi = (params) => {
  const uri = `/v1/warehouses/bussiness-types/${params}/reject`
  return api.put(uri)
}

function* doRejectBusinessType(action) {
  try {
    const response = yield call(rejectBusinessTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectBusinessTypeByIdSuccess(response.payload))

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
    yield put(rejectBusinessTypeByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRejectBusinessType() {
  yield takeLatest(REJECT_BUSINESS_TYPE_START, doRejectBusinessType)
}
