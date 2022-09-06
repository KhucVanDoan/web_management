import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteBinFailed,
  deleteBinSuccess,
  DELETE_BIN_START,
} from '~/modules/wmsx/redux/actions/define-bin'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteBinApi = (params) => {
  /* @TODO update api */
  const uri = `/v1/items/object-categories/${params}`
  return api.delete(uri)
}

function* doDeleteBin(action) {
  try {
    const response = yield call(deleteBinApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteBinSuccess(response.results))

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
    yield put(deleteBinFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteBin() {
  yield takeLatest(DELETE_BIN_START, doDeleteBin)
}
