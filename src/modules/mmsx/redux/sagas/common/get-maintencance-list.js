import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_GET_LIST_MAINTENANCE_TEAM_START,
  getListMaintenanceTeamSuccess,
  getListMaintenanceTeamError,
} from '../../actions/common'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
// v1/mms/maintenance-team/list
const getListMaintenanceApi = (params) => {
  const uri = `v1/mms/maintenance-teams/list`
  return api.get(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetListMaintenanceTeams(action) {
  try {
    const response = yield call(getListMaintenanceApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getListMaintenanceTeamSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
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
export default function* watchGetListMaintenanceTeam() {
  yield takeLatest(
    MMSX_GET_LIST_MAINTENANCE_TEAM_START,
    doGetListMaintenanceTeams,
  )
}
