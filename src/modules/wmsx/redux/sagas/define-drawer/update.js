import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateDrawerFailed,
  updateDrawerSuccess,
  UPDATE_DRAWER_START,
} from '~/modules/wmsx/redux/actions/define-drawer'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateDrawerApi = (params) => {
  /* @TODO update api */
  const uri = `/v1/items/object-categories/${params?.id}`
  return api.put(uri, params)
}

function* doUpdateDrawer(action) {
  try {
    const response = yield call(updateDrawerApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateDrawerSuccess(response.results))

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
    yield put(updateDrawerFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateDrawer() {
  yield takeLatest(UPDATE_DRAWER_START, doUpdateDrawer)
}
