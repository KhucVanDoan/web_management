import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createShelfFailed,
  createShelfSuccess,
  CREATE_SHELF_START,
} from '~/modules/wmsx/redux/actions/define-shelf'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createShelfApi = (body) => {
  /* @TODO update api */
  const uri = `/v1/items/object-categories/create`
  return api.post(uri, body)
}

function* doCreateShelf(action) {
  try {
    const response = yield call(createShelfApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createShelfSuccess(response.data))

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
    yield put(createShelfFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateShelf() {
  yield takeLatest(CREATE_SHELF_START, doCreateShelf)
}
