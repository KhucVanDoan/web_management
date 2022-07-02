import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_LIST_MAINTENANCE_TEAM_START,
  getListMaintenanceTeamSuccess,
  getListMaintenanceTeamError,
} from '~/modules/mmsx/redux/actions/maintenance-team'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
// v1/mms/maintenance-team/list
const getListMaintenanceTeamApi = (params) => {
  const uri = `v1/mms/maintenance-teams/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetMaintenanceTeams(action) {
  try {
    const response = yield call(getListMaintenanceTeamApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getListMaintenanceTeamSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getListMaintenanceTeamError())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetMaintenanceTeams() {
  yield takeLatest(GET_LIST_MAINTENANCE_TEAM_START, doGetMaintenanceTeams)
}
