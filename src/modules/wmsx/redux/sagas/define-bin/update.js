import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateBinFailed,
  updateBinSuccess,
  UPDATE_BIN_START,
} from '~/modules/wmsx/redux/actions/define-bin'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateBinApi = (params) => {
  /* @TODO update api */
  const uri = `/v1/items/object-categories/${params?.id}`
  return api.put(uri, params)
}

function* doUpdateBin(action) {
  try {
    const response = yield call(updateBinApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateBinSuccess(response.results))

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
    yield put(updateBinFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateBin() {
  yield takeLatest(UPDATE_BIN_START, doUpdateBin)
}
