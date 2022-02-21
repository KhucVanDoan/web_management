import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createWorkCenterFailed,
  createWorkCenterSuccess,
  CREATE_WORK_CENTER_START,
} from '~/modules/mesx/redux/actions/work-center'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * create work center api
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createWorkCenterApi = (params) => {
  const uri = `v1/produces/work-centers/create`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateWorkCenter(action) {
  try {
    const response = yield call(createWorkCenterApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createWorkCenterSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'workCenter.createWorkCenterSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createWorkCenterFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateWorkCenter() {
  yield takeLatest(CREATE_WORK_CENTER_START, doCreateWorkCenter)
}
