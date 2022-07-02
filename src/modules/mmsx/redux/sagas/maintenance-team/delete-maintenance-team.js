import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  DELETE_MAINTENANCE_TEAM_START,
  deleteMaintenanceTeamSuccess,
  deleteMaintenanceTeamError,
} from '~/modules/mmsx/redux/actions/maintenance-team'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Search user API
 * @returns {Promise}
 */
const deleteMaintenanceTeamApi = (id) => {
  const uri = `v1/mms/maintenance-teams/${id}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteMaintenanceTeam(action) {
  try {
    const response = yield call(deleteMaintenanceTeamApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteMaintenanceTeamSuccess({ id: action.payload }))

      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteMaintenanceTeamError())
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchDeleteMaintenanceTeam() {
  yield takeLatest(DELETE_MAINTENANCE_TEAM_START, doDeleteMaintenanceTeam)
}
