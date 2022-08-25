import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmBusinessTypeByIdFailed,
  confirmBusinessTypeByIdSuccess,
  CONFIRM_BUSINESS_TYPE_START,
} from '~/modules/wmsx/redux/actions/business-type-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmBusinessTypeApi = (params) => {
  const uri = `/v1/warehouses/bussiness-types/${params}/confirm`
  return api.put(uri)
}

function* doConfirmBusinessType(action) {
  try {
    const response = yield call(confirmBusinessTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmBusinessTypeByIdSuccess(response.payload))

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
    yield put(confirmBusinessTypeByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmBusinessType() {
  yield takeLatest(CONFIRM_BUSINESS_TYPE_START, doConfirmBusinessType)
}
