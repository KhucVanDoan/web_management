import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  MMSX_SEARCH_DEFECT_LIST_START,
  searchDefectListFail,
  searchDefectListSuccess,
} from '../../actions/defect-list'

const { call, put, takeLatest } = require('redux-saga/effects')

const searchDefectListApi = (params) => {
  const url = `v1/mms/defects`
  return api.get(url, params)
}

function* doSearchDefectList(action) {
  try {
    const response = yield call(searchDefectListApi, action.payload)
    if (response.statusCode === 200) {
      yield put(searchDefectListSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchDefectListFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchSearchDefectList() {
  yield takeLatest(MMSX_SEARCH_DEFECT_LIST_START, doSearchDefectList)
}
