import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createTemplateShelfFailed,
  createTemplateShelfSuccess,
  CREATE_TEMPLATE_SHELF_START,
} from '~/modules/wmsx/redux/actions/define-template-shelf'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'
/**
 * Create template shelf API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const createTemplateShelfApi = (params) => {
  const uri = `/v1/warehouses/template-shelfs`
  return api.post(uri, params)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doCreateTemplateShelf(action) {
  try {
    const response = yield call(createTemplateShelfApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(createTemplateShelfSuccess(response.data))
      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(
        'templateShelf.createTemplateShelfSuccess',
        NOTIFICATION_TYPE.SUCCESS,
      )
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createTemplateShelfFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch create template shelf
 */
export default function* watchCreateTemplateShelf() {
  yield takeLatest(CREATE_TEMPLATE_SHELF_START, doCreateTemplateShelf)
}
