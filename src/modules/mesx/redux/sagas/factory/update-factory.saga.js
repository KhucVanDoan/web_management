import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import addNotification from 'utils/toast'
import {
  updateFactoryFailed,
  updateFactorySuccess,
  UPDATE_FACTORY_START,
} from 'modules/mesx/redux/actions/factory.action'
import { NOTIFICATION_TYPE } from 'common/constants'
import { getAppStore } from 'modules/auth/redux/actions/app-store'

/**
 * Search factory API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const updateFactoryApi = (params) => {
  const uri = `/v1/users/factories/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateFactory(action) {
  try {
    const response = yield call(updateFactoryApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateFactorySuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      yield put(getAppStore())
      addNotification(
        'defineFactory.updateFactorySuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateFactoryFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search factorys
 */
export default function* watchUpdateFactory() {
  yield takeLatest(UPDATE_FACTORY_START, doUpdateFactory)
}
