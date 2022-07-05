import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteTemplateChecklistSuccess,
  deleteTemplateChecklistFail,
  DELETE_TEMPLATE_CHECKLIST_START,
} from '~/modules/mmsx/redux/actions/template-checklist'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteTemplateChecklistApi = (params) => {
  const url = `v1/mms/check-list-templates/${params}`
  return api.delete(url)
}

function* doDeleteTemplateChecklist(action) {
  try {
    const response = yield call(deleteTemplateChecklistApi, action.payload)
    if (response.statusCode === 200) {
      yield put(deleteTemplateChecklistSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(deleteTemplateChecklistFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchDeleteTemplateChecklist() {
  yield takeLatest(DELETE_TEMPLATE_CHECKLIST_START, doDeleteTemplateChecklist)
}
