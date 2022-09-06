import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateExpenditureTypeFailed,
  updateExpenditureTypeSuccess,
  UPDATE_EXPENDITURE_TYPE_START,
} from '~/modules/wmsx/redux/actions/define-expenditure-type'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateExpenditureTypeApi = (params) => {
  const uri = `/v1/sales/cost-types/${params?.id}`
  return api.put(uri, params)
}

function* doUpdateExpenditureType(action) {
  try {
    const response = yield call(updateExpenditureTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateExpenditureTypeSuccess(response.results))

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
    yield put(updateExpenditureTypeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateExpenditureType() {
  yield takeLatest(UPDATE_EXPENDITURE_TYPE_START, doUpdateExpenditureType)
}
