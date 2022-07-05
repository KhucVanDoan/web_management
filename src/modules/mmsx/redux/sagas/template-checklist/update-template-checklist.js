import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateTemplateChecklistSuccess,
  updateTemplateChecklistFail,
  UPDATE_TEMPLATE_CHECKLIST_START,
} from '~/modules/mmsx/redux/actions/template-checklist'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateTemplateChecklistApi = (params) => {
  const url = `v1/mms/check-list-templates/${params.id}`
  return api.put(url, params)
}

function* doUpdateTemplateChecklist(action) {
  try {
    const response = yield call(updateTemplateChecklistApi, action.payload)
    if (response.statusCode === 200) {
      yield put(updateTemplateChecklistSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateTemplateChecklistFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchUpdateTemplateChecklist() {
  yield takeLatest(UPDATE_TEMPLATE_CHECKLIST_START, doUpdateTemplateChecklist)
}
