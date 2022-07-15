import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_UPDATE_ATTRIBUTE_MAINTENANCE_START,
  updateAttributeMaintenanceSuccess,
} from '../../actions/attribute-maintenance'
import { updateDetailDeviceCategoryfail } from '../../actions/device-category'

const updateAttributeMaintenance = (params) => {
  const url = `v1/mms/maintenance-attributes/${params?.id}`
  return api.put(url, params)
}

function* doUpdateAttributeMaintenance(action) {
  try {
    const response = yield call(updateAttributeMaintenance, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateAttributeMaintenanceSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)

      yield put(updateDetailDeviceCategoryfail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(updateDetailDeviceCategoryfail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateAttributeMaintenance() {
  yield takeLatest(
    MMSX_UPDATE_ATTRIBUTE_MAINTENANCE_START,
    doUpdateAttributeMaintenance,
  )
}
