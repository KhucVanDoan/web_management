import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateConstructionFailed,
  updateConstructionSuccess,
  UPDATE_CONSTRUCTION_START,
} from '~/modules/wmsx/redux/actions/construction-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateConstructionApi = (params) => {
  const uri = `/v1/sales/constructions/${params?.id}`
  return api.put(uri, params)
}

function* doUpdateConstruction(action) {
  try {
    const response = yield call(updateConstructionApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateConstructionSuccess(response.results))

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
    yield put(updateConstructionFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateConstruction() {
  yield takeLatest(UPDATE_CONSTRUCTION_START, doUpdateConstruction)
}
