import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getDetailAttributeMaintenanceFail,
  getDetailAttributeMaintenanceSuccess,
  MMSX_GET_ATTRIBUTE_MAINTENANCE_START,
} from '../../actions/attribute-maintenance'

const getAttributeMaintenance = (params) => {
  const url = `v1/mms/maintenance-attributes/${params}`
  return api.get(url)
}

function* doGetAttributeMaintenance(action) {
  try {
    const response = yield call(getAttributeMaintenance, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDetailAttributeMaintenanceSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDetailAttributeMaintenanceFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetDetailAttributeMaintenance() {
  yield takeLatest(
    MMSX_GET_ATTRIBUTE_MAINTENANCE_START,
    doGetAttributeMaintenance,
  )
}
