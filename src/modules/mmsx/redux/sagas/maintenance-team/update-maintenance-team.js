import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  UPDATE_MAINTENANCE_TEAM_START,
  updateMaintenanceTeamSuccess,
  updateMaintenanceTeamError,
} from '~/modules/mmsx/redux/actions/maintenance-team'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @returns {Promise}
 */
const updateMaintenanceTeamApi = (params) => {
  const uri = `v1/mms/maintenance-teams/${params.id}`
  return api.put(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateMaintenanceTeam(action) {
  try {
    const response = yield call(updateMaintenanceTeamApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateMaintenanceTeamSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateMaintenanceTeamError())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchUpdateMaintenanceTeam() {
  yield takeLatest(UPDATE_MAINTENANCE_TEAM_START, doUpdateMaintenanceTeam)
}
