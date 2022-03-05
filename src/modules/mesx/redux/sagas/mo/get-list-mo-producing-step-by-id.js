import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getListMoProducingStepByIdSuccess,
  getListMoProducingStepByIdFailed,
  GET_LIST_MO_PRODUCING_STEP_BY_ID,
} from '~/modules/mesx/redux/actions/mo.action'
import { api } from '~/services/api'

/**
 * getBOMProducingStepStructureApi
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getListMoProducingStepByIdApi = (params) => {
  let url = `/v1/produces/manufacturing-orders/${params}/plan/producing-steps/list`
  return api.get(url)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetListMoProducingStepById(action) {
  try {
    const response = yield call(getListMoProducingStepByIdApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(getListMoProducingStepByIdSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        action.onSuccess(response?.data)
      }
    } else {
      yield put(getListMoProducingStepByIdFailed())
      // Call callback action if provided
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(getListMoProducingStepByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

/**
 * Watch search bom Structure
 */
export default function* watchGetListMoProducingStepById() {
  yield takeLatest(
    GET_LIST_MO_PRODUCING_STEP_BY_ID,
    doGetListMoProducingStepById,
  )
}
