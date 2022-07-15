import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  MMSX_SEARCH_ATTRIBUTE_MAINTENANCE_START,
  searchAttributeMaintenanceFail,
  searchAttributeMaintenanceSuccess,
} from '../../actions/attribute-maintenance'

const searchListAttributeMaintain = (params) => {
  const url = `v1/mms/maintenance-attributes/list`
  return api.get(url, params)
}

function* doSearchAttributeMaintain(action) {
  try {
    const response = yield call(searchListAttributeMaintain, action?.payload)
    if (response.statusCode === 200) {
      yield put(searchAttributeMaintenanceSuccess(response?.data))

      if (action?.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchAttributeMaintenanceFail())
    if (action?.onError) {
      yield action.onError()
    }
  }
}

export default function* watchSearchAttributeMaintenance() {
  yield takeLatest(
    MMSX_SEARCH_ATTRIBUTE_MAINTENANCE_START,
    doSearchAttributeMaintain,
  )
}
