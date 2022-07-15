import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createAttributeMaintenanceFail,
  createAttributeMaintenanceSuccess,
  MMSX_CREATE_ATTRIBUTE_MAINTENANCE_START,
} from '../../actions/attribute-maintenance'

const createAttributeMaintenance = (params) => {
  const url = 'v1/mms/maintenance-attributes'
  return api.post(url, params)
}

function* doCreateAttributeMaintenance(action) {
  try {
    const response = yield call(createAttributeMaintenance, action?.payload)
    if (response.statusCode === 200) {
      yield put(createAttributeMaintenanceSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createAttributeMaintenanceFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateAtributeMaintenance() {
  yield takeLatest(
    MMSX_CREATE_ATTRIBUTE_MAINTENANCE_START,
    doCreateAttributeMaintenance,
  )
}
