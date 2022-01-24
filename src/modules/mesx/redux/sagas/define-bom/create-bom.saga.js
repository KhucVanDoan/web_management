import { call, put, takeLatest } from 'redux-saga/effects'


import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createBOMFailed,
  createBOMSuccess,
  CREATE_BOM_START,
} from '~/modules/mesx/redux/actions/define-bom.action'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createBOMApi = (params) => {
  const uri = `/v1/produces/boms/create`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateBOM(action) {
  try {
    const response = yield call(createBOMApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createBOMSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification('defineBOM.createBOMSuccess', NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createBOMFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateBOM() {
  yield takeLatest(CREATE_BOM_START, doCreateBOM)
}
