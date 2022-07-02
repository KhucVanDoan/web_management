import { call, put, takeLatest } from 'redux-saga/effects'

import { api } from '~/services/api'

import {
  getItemUnitsSuccess,
  getItemUnitsFailed,
  GET_ITEM_UNITS_START,
} from '../../actions/common'
const getAllItemUnit = () => {
  const url = `v1/mms/item-unit/supplies/list`
  return api.get(url)
}

function* doGetAllItemUnit(action) {
  try {
    const response = yield call(getAllItemUnit)
    if (response.statusCode === 200) {
      yield put(getItemUnitsSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getItemUnitsFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetAllItemUnit() {
  yield takeLatest(GET_ITEM_UNITS_START, doGetAllItemUnit)
}
