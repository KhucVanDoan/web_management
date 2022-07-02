import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  deleteTemplateInstallFail,
  deleteTemplateInstallSuccess,
  DELETE_TEMPLATE_INSTALL_START,
} from '../../actions/define-installation-template'

const getApiUrl = (params) => {
  const url = `v1/mms/installation-template/${params}`
  return api.delete(url)
}

function* doDeleteTemplateInstall(action) {
  try {
    const response = yield call(getApiUrl, action.payload)
    if (response.statusCode === 200) {
      yield put(deleteTemplateInstallSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteTemplateInstallFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchDeleteTemplateInstall() {
  yield takeLatest(DELETE_TEMPLATE_INSTALL_START, doDeleteTemplateInstall)
}
