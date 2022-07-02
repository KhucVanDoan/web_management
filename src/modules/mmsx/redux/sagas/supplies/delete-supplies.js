import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteSuppliesSuccess,
  deleteSuppliesFail,
  DELETE_SUPPLIES_START,
} from '~/modules/mmsx/redux/actions/define-supplies'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteSuppliesApi = (params) => {
  const url = `v1/mms/supplies/${params}`
  return api.delete(url)
}

function* doDeleteSupplies(action) {
  try {
    const response = yield call(deleteSuppliesApi, action?.payload)

    if (response.statusCode === 200) {
      yield put(deleteSuppliesSuccess())

      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteSuppliesFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteSupplies() {
  yield takeLatest(DELETE_SUPPLIES_START, doDeleteSupplies)
}
