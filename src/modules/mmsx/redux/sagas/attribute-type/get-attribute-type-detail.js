import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  getAttributeTypeFail,
  getAttributeTypeSuccess,
  MMSX_GET_ATTRIBUTE_TYPE_START,
} from '../../actions/attribute-type'

const getAttributeTypeDetailApi = (params) => {
  const url = `v1/mms/attribute-type/${params}`
  return api.get(url, params)
}

function* doGetAttributeTypeDetail(action) {
  try {
    const response = yield call(getAttributeTypeDetailApi, action.payload)
    if (response.statusCode === 200) {
      yield put(getAttributeTypeSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getAttributeTypeFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetAttributeTypeDetail() {
  yield takeLatest(MMSX_GET_ATTRIBUTE_TYPE_START, doGetAttributeTypeDetail)
}
