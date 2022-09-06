import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteShelfFailed,
  deleteShelfSuccess,
  DELETE_SHELF_START,
} from '~/modules/wmsx/redux/actions/define-shelf'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteShelfApi = (params) => {
  /* @TODO update api */
  const uri = `/v1/items/object-categories/${params}`
  return api.delete(uri)
}

function* doDeleteShelf(action) {
  try {
    const response = yield call(deleteShelfApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteShelfSuccess(response.results))

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
    yield put(deleteShelfFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteShelf() {
  yield takeLatest(DELETE_SHELF_START, doDeleteShelf)
}
