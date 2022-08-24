import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  updateUnitFail,
  updateUnitSuccess,
  MMSX_UPDATE_UNIT_START,
} from '../../actions/defineUnit'

const updateUnitApi = () => {
  const url = ``
  return api.put(url)
}

function* doUpdateUnit(action) {
  try {
    const response = yield call(updateUnitApi, action.payload)
    if (response.statusCode === 200) {
      yield put(updateUnitSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateUnitFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchUpdateUnit() {
  yield takeLatest(MMSX_UPDATE_UNIT_START, doUpdateUnit)
}
