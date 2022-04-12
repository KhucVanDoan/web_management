import {call, put, takeLatest} from 'redux-saga/effects'

import {NOTIFICATION_TYPE} from '~/common/constants'
import {
  GET_RELATED_USER_BY_WAREHOUSE_ID_START,
  getRelatedUserByWarehouseIdFail,
  getRelatedUserByWarehouseIdSuccess,
} from '~/modules/qmsx/redux/actions/define-quality-alert'
import {api} from '~/services/api'
import addNotification from '~/utils/toast'

//@TODO: load list user of Role qc
/**
 * get user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getRelatedUserByWarehouseIdApi = (params) => {
  const uri = `/v1/users/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetRelatedUserByWarehouseId(action) {
  try {
    const payload = {
      keyword: '',
      filter: [],
      sort: [],
      isGetAll: 1,
    }
    const response = yield call(getRelatedUserByWarehouseIdApi, payload)

    if (response?.statusCode === 200) {
      const responseData = response?.data?.items

      yield put(getRelatedUserByWarehouseIdSuccess(responseData))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(responseData)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getRelatedUserByWarehouseIdFail())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch get user
 */
export default function* watchGetRelatedUserByWarehouseId() {
  yield takeLatest(
    GET_RELATED_USER_BY_WAREHOUSE_ID_START,
    doGetRelatedUserByWarehouseId,
  )
}
