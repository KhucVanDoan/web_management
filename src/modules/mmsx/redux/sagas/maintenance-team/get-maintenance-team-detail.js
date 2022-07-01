import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_DETAIL_MAINTENANCE_TEAM_START,
  getDetailMaintenanceTeamSuccess,
  getDetailMaintenanceTeamError,
} from '~/modules/mmsx/redux/actions/maintenance-team'
import { api } from '~/services/api'

/**
 * Search user API
 * @returns {Promise}
 */
const getDetailMaintenanceTeamApi = (id) => {
  const uri = `v1/mms/maintenance-teams/${id}`
  return api.get(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetDetailMaintenanceTeam(action) {
  try {
    const response = yield call(getDetailMaintenanceTeamApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(getDetailMaintenanceTeamSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDetailMaintenanceTeamError())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search users
 */
export default function* watchGetDetailMaintenanceTeam() {
  yield takeLatest(
    GET_DETAIL_MAINTENANCE_TEAM_START,
    doGetDetailMaintenanceTeam,
  )
}
