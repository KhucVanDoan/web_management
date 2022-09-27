import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteAssemblyFailed,
  deleteAssemblySuccess,
  DELETE_ASSEMBLY_START,
} from '~/modules/wmsx/redux/actions/define-assembly'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteAssemblyApi = (params) => {
  const uri = `/v1/warehouse-layouts/locations/${params}`
  return api.delete(uri)
}

function* doDeleteAssembly(action) {
  try {
    const response = yield call(deleteAssemblyApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteAssemblySuccess(response.results))

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
    yield put(deleteAssemblyFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteAssembly() {
  yield takeLatest(DELETE_ASSEMBLY_START, doDeleteAssembly)
}
