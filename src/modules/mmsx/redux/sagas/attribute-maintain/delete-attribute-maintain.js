import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  deleteAttributeMaintenanceFail,
  deleteAttributeMaintenanceSuccess,
  MMSX_DELETE_ATTRIBUTE_MAINTENANCE_START,
} from '../../actions/attribute-maintenance'

const deleteAttributeMaintenance = (params) => {
  const url = `v1/mms/maintenance-attributes/${params}`
  return api.delete(url)
}

function* doDeleteAttributeMaintenance(action) {
  try {
    const response = yield call(deleteAttributeMaintenance, action?.payload)

    if (response.statusCode === 200) {
      yield put(deleteAttributeMaintenanceSuccess())
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteAttributeMaintenanceFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}
export default function* watchDeleteAttributeMaintenance() {
  yield takeLatest(
    MMSX_DELETE_ATTRIBUTE_MAINTENANCE_START,
    doDeleteAttributeMaintenance,
  )
}
