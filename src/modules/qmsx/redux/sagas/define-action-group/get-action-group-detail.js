import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getActionGroupDetailByIdFail,
  getActionGroupDetailByIdSuccess,
  GET_ACTION_GROUP_DETAIL_START,
} from '~/modules/qmsx/redux/actions/define-action-group'
import { api } from '~/services/api'

/**
 * Get Action-Group detail
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getActionGroupDetailApi = (params) => {
  const uri = `/v1/quality-controls/action-categories/${params?.id}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetActionGroupDetail(action) {
  try {
    const response = yield call(getActionGroupDetailApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getActionGroupDetailByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getActionGroupDetailByIdFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError(error)
    }
  }
}

/**
 * Watch get detail Action
 */
export default function* watchGetActionDetail() {
  yield takeLatest(GET_ACTION_GROUP_DETAIL_START, doGetActionGroupDetail)
}
