import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  GET_JOB_LIST_SUPPLY,
  getJobListInSuppliesRequestFail,
  getJobListInSuppliesRequestSuccess,
} from '~/modules/mmsx/redux/actions/supplies-request'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
const getJobListApi = (params) => {
  const url = `v1/mms/jobs/create-supply-request`
  return api.get(url, params)
}

function* doGetJobList(action) {
  try {
    const response = yield call(getJobListApi, action?.payload)

    if (response.statusCode === 200) {
      yield put(getJobListInSuppliesRequestSuccess(response?.data))

      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(getJobListInSuppliesRequestFail())
    }
  } catch (error) {
    yield put(getJobListInSuppliesRequestFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetJobListSupplies() {
  yield takeLatest(GET_JOB_LIST_SUPPLY, doGetJobList)
}
