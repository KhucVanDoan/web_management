import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createTemplateChecklistSuccess,
  createTemplateChecklistFail,
  CREATE_TEMPLATE_CHECKLIST_START,
} from '~/modules/mmsx/redux/actions/template-checklist'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createTemplateChecklist = (params) => {
  const url = `v1/mms/check-list-templates`
  return api.post(url, params)
}

function* doCreateTemplateChecklist(action) {
  try {
    const response = yield call(createTemplateChecklist, action.payload)
    if (response.statusCode === 200) {
      yield put(createTemplateChecklistSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createTemplateChecklistFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchCreateTemplateChecklist() {
  yield takeLatest(CREATE_TEMPLATE_CHECKLIST_START, doCreateTemplateChecklist)
}
