import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  CREATE_MAINTENANCE_TEAM_START,
  createMaintenanceTeamSuccess,
  createMaintenanceTeamError,
} from '~/modules/mmsx/redux/actions/maintenance-team'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Search user API
 * @returns {Promise}
 */
const createMaintenanceTeamApi = (params) => {
  const uri = `v1/mms/maintenance-teams`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateMaintenanceTeam(action) {
  try {
    const response = yield call(createMaintenanceTeamApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createMaintenanceTeamSuccess(response.data))

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
    yield put(createMaintenanceTeamError())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchCreateMaintenanceTeam() {
  yield takeLatest(CREATE_MAINTENANCE_TEAM_START, doCreateMaintenanceTeam)
}
