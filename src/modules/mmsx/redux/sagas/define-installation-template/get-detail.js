import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  getDetailTemplateInstallFail,
  getDetailTemplateInstallSuccess,
  GET_DETAIL_TEMPLATE_INSTALL_START,
} from '../../actions/define-installation-template'

const getApiUrl = (params) => {
  const url = `v1/mms/installation-template/${params}`
  return api.get(url)
}

function* doGetTemplateInstall(action) {
  try {
    const response = yield call(getApiUrl, action.payload)
    if (response.statusCode === 200) {
      yield put(getDetailTemplateInstallSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDetailTemplateInstallFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetTemplateInstall() {
  yield takeLatest(GET_DETAIL_TEMPLATE_INSTALL_START, doGetTemplateInstall)
}
