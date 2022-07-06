import { call, put, takeLatest } from 'redux-saga/effects'

import {
  searchTemplateChecklistSuccess,
  searchTemplateChecklistFail,
  SEARCH_TEMPLATE_CHECKLIST_START,
} from '~/modules/mmsx/redux/actions/template-checklist'
import { api } from '~/services/api'

const searchTemplateList = (params) => {
  const url = `v1/mms/check-list-templates`
  return api.get(url, params)
}

function* doSearchTemplateChecklist(action) {
  try {
    const response = yield call(searchTemplateList, action.payload)
    if (response.statusCode === 200) {
      yield put(searchTemplateChecklistSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(searchTemplateChecklistFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchSearchTemplateChecklist() {
  yield takeLatest(SEARCH_TEMPLATE_CHECKLIST_START, doSearchTemplateChecklist)
}
