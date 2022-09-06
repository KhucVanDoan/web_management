import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmExpenditureTypeByIdFailed,
  confirmExpenditureTypeByIdSuccess,
  CONFIRM_EXPENDITURE_TYPE_START,
} from '~/modules/wmsx/redux/actions/define-expenditure-type'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmExpenditureTypeApi = (params) => {
  const uri = `/v1/sales/cost-types/${params}/confirm`
  return api.put(uri)
}

function* doConfirmExpenditureType(action) {
  try {
    const response = yield call(confirmExpenditureTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmExpenditureTypeByIdSuccess(response.payload))

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
    yield put(confirmExpenditureTypeByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmExpenditureType() {
  yield takeLatest(CONFIRM_EXPENDITURE_TYPE_START, doConfirmExpenditureType)
}
