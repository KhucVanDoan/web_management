import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  validateAttributeTypeCodeSuccess,
  validateAttributeTypeCodeFail,
  MMSX_VALIDATE_ATTRIBUTE_TYPE,
} from '../../actions/attribute-type'

const validateAttributeTypeCode = (params) => {
  const url = `v1/mms/validate-attribute-type`
  return api.post(url, params)
}

function* doValidateAttributeTypeCode(action) {
  try {
    const response = yield call(validateAttributeTypeCode, action.payload)
    if (response.statusCode === 200) {
      yield put(validateAttributeTypeCodeSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      } else {
        yield put(validateAttributeTypeCodeFail())
        if (action.onError) {
          yield action.onError()
        }
      }
    }
  } catch (error) {
    yield put(validateAttributeTypeCodeFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchValidateAttributeTypeCode() {
  yield takeLatest(MMSX_VALIDATE_ATTRIBUTE_TYPE, doValidateAttributeTypeCode)
}
