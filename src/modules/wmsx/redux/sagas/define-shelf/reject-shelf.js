import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectShelfByIdFailed,
  rejectShelfByIdSuccess,
  REJECT_SHELF_START,
} from '~/modules/wmsx/redux/actions/define-shelf'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectShelfApi = (params) => {
  /* @TODO update api */
  const uri = `/v1/items/object-categories/${params}/reject`
  return api.put(uri)
}

function* doRejectShelf(action) {
  try {
    const response = yield call(rejectShelfApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectShelfByIdSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(rejectShelfByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRejectShelf() {
  yield takeLatest(REJECT_SHELF_START, doRejectShelf)
}
