import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createBinFailed,
  createBinSuccess,
  CREATE_BIN_START,
} from '~/modules/wmsx/redux/actions/define-bin'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createBinApi = (body) => {
  /* @TODO update api */
  const uri = `/v1/items/object-categories/create`
  return api.post(uri, body)
}

function* doCreateBin(action) {
  try {
    const response = yield call(createBinApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createBinSuccess(response.data))

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
    yield put(createBinFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateBin() {
  yield takeLatest(CREATE_BIN_START, doCreateBin)
}
