import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateShelfFailed,
  updateShelfSuccess,
  UPDATE_SHELF_START,
} from '~/modules/wmsx/redux/actions/define-shelf'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateShelfApi = (params) => {
  /* @TODO update api */
  const uri = `/v1/warehouse-layouts/locations/${params?.id}`
  return api.put(uri, params)
}

function* doUpdateShelf(action) {
  try {
    const response = yield call(updateShelfApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateShelfSuccess(response.results))

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
    yield put(updateShelfFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateShelf() {
  yield takeLatest(UPDATE_SHELF_START, doUpdateShelf)
}
