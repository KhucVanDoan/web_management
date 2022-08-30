import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteConstructionFailed,
  deleteConstructionSuccess,
  DELETE_CONSTRUCTION_START,
} from '~/modules/wmsx/redux/actions/construction-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteConstructionApi = (params) => {
  const uri = `/v1/sales/constructions/${params}`
  return api.delete(uri)
}

function* doDeleteConstruction(action) {
  try {
    const response = yield call(deleteConstructionApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteConstructionSuccess(response.results))

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
    yield put(deleteConstructionFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteConstruction() {
  yield takeLatest(DELETE_CONSTRUCTION_START, doDeleteConstruction)
}
