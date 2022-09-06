import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createDrawerFailed,
  createDrawerSuccess,
  CREATE_DRAWER_START,
} from '~/modules/wmsx/redux/actions/define-drawer'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createDrawerApi = (body) => {
  /* @TODO update api */
  const uri = `/v1/items/object-categories/create`
  return api.post(uri, body)
}

function* doCreateDrawer(action) {
  try {
    const response = yield call(createDrawerApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createDrawerSuccess(response.data))

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
    yield put(createDrawerFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateDrawer() {
  yield takeLatest(CREATE_DRAWER_START, doCreateDrawer)
}
