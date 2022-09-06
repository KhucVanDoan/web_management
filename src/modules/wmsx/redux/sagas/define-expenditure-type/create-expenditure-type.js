import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createExpenditureTypeFailed,
  createExpenditureTypeSuccess,
  CREATE_EXPENDITURE_TYPE_START,
} from '~/modules/wmsx/redux/actions/define-expenditure-type'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createExpenditureTypeApi = (body) => {
  const uri = `/v1/sales/cost-types/create`
  return api.post(uri, body)
}

function* doCreateExpenditureType(action) {
  try {
    const response = yield call(createExpenditureTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createExpenditureTypeSuccess(response.data))

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
    yield put(createExpenditureTypeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateExpenditureType() {
  yield takeLatest(CREATE_EXPENDITURE_TYPE_START, doCreateExpenditureType)
}
