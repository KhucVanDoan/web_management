import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  deleteUnitFail,
  deleteUnitSuccess,
  MMSX_DELETE_UNIT_START,
} from '../../actions/defineUnit'

const apiUrl = () => {
  const url = ``
  return api.delete(url)
}

function* doDeleteUnit(action) {
  try {
    const response = yield call(apiUrl, action?.payload)
    if (response.statusCode === 200) {
      yield put(deleteUnitSuccess(action.payload))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(deleteUnitFail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(deleteUnitFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteUnit() {
  yield takeLatest(MMSX_DELETE_UNIT_START, doDeleteUnit)
}
