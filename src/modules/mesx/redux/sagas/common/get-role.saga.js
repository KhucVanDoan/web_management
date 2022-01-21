import { call, put, takeLatest } from 'redux-saga/effects'
import { api } from 'services/api'
import {
  GET_ROLES_START,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILED,
} from 'modules/mesx/redux/actions/common.action'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getRolesApi = (params) => {
  const uri = `/v1/users/role/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetRoles(action) {
  try {
    const payload = {
      keyword: '',
      filter: [],
      sort: [],
      isGetAll: 1,
    }
    const response = yield call(getRolesApi, payload)

    if (response?.statusCode === 200) {
      yield put({
        type: GET_ROLES_SUCCESS,
        payload: response.data,
      })

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put({
      type: GET_ROLES_FAILED,
    })
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetRoles() {
  yield takeLatest(GET_ROLES_START, doGetRoles)
}
