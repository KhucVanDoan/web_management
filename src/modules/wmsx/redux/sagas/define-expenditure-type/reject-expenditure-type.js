import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectExpenditureTypeByIdFailed,
  rejectExpenditureTypeByIdSuccess,
  REJECT_EXPENDITURE_TYPE_START,
} from '~/modules/wmsx/redux/actions/define-expenditure-type'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectExpenditureTypeApi = (params) => {
  const uri = `/v1/sales/cost-types/${params}/reject`
  return api.put(uri)
}

function* doRejectExpenditureType(action) {
  try {
    const response = yield call(rejectExpenditureTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectExpenditureTypeByIdSuccess(response.payload))

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
    yield put(rejectExpenditureTypeByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRejectExpenditureType() {
  yield takeLatest(REJECT_EXPENDITURE_TYPE_START, doRejectExpenditureType)
}
