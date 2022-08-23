import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createConstructionFailed,
  createConstructionSuccess,
  CREATE_CONSTRUCTION_START,
} from '~/modules/wmsx/redux/actions/construction-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createConstructionApi = (body) => {
  const uri = `/v1/sales/constructions/create`
  return api.post(uri, body)
}

function* doCreateConstruction(action) {
  try {
    const response = yield call(createConstructionApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createConstructionSuccess(response.data))

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
    yield put(createConstructionFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateConstruction() {
  yield takeLatest(CREATE_CONSTRUCTION_START, doCreateConstruction)
}
