import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  getAttributeTypeListFail,
  getAttributeTypeListSuccess,
  MMSX_GET_ATTRIBUTE_TYPE_LIST_START,
} from '../../actions/attribute-type'

const getAttributeTypeListApi = (params) => {
  const url = `v1/mms/attribute-type`
  return api.get(url, params)
}

function* doGetAttributeTypeList(action) {
  try {
    const response = yield call(getAttributeTypeListApi, action.payload)
    if (response.statusCode === 200) {
      yield put(getAttributeTypeListSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getAttributeTypeListFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetAttributeTypeList() {
  yield takeLatest(MMSX_GET_ATTRIBUTE_TYPE_LIST_START, doGetAttributeTypeList)
}
