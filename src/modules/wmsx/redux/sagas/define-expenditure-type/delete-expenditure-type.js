import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteExpenditureTypeFailed,
  deleteExpenditureTypeSuccess,
  DELETE_EXPENDITURE_TYPE_START,
} from '~/modules/wmsx/redux/actions/define-expenditure-type'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteExpenditureTypeApi = (params) => {
  const uri = `/v1/sales/cost-types/${params}`
  return api.delete(uri)
}

function* doDeleteExpenditureType(action) {
  try {
    const response = yield call(deleteExpenditureTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteExpenditureTypeSuccess(response.results))

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
    yield put(deleteExpenditureTypeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteExpenditureType() {
  yield takeLatest(DELETE_EXPENDITURE_TYPE_START, doDeleteExpenditureType)
}
