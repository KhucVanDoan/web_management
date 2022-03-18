import { first } from 'lodash'

import {
  GET_LIST_FACTORY_CALENDAR,
  GET_LIST_FACTORY_CALENDAR_FAILED,
  UPDATE_FACTORY_CALENDAR,
  CREATE_FACTORY_CALENDAR,
  CREATE_FACTORY_CALENDAR_SETUP,
  CREATE_FACTORY_CALENDAR_SETUP_SUCCESS,
  CREATE_FACTORY_CALENDAR_SETUP_FAILED,
  GET_LIST_FACTORY_EVENT,
  GET_LIST_FACTORY_EVENT_SUCCESS,
  GET_LIST_FACTORY_EVENT_FAILED,
  GET_DETAIL_FACTORY_CALENDAR_FAILED,
  GET_DETAIL_FACTORY_CALENDAR,
  GET_DETAIL_FACTORY_CALENDAR_SUCCESS,
} from '~/modules/mesx/redux/actions/calendar'

const initialState = {
  isLoading: false,
  factoryCalendar: [],
  factoryEvent: [],
  detailCalendar: null,
}

export default function calendar(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_FACTORY_CALENDAR:
    case GET_LIST_FACTORY_EVENT:
    case GET_DETAIL_FACTORY_CALENDAR:
    case UPDATE_FACTORY_CALENDAR:
    case CREATE_FACTORY_CALENDAR:
    case CREATE_FACTORY_CALENDAR_SETUP:
      return {
        ...state,
        isLoading: true,
      }
    case GET_LIST_FACTORY_EVENT_SUCCESS:
      return {
        ...state,
        factoryEvent: action.payload,
        isLoading: false,
      }
    case GET_DETAIL_FACTORY_CALENDAR_SUCCESS:
      return {
        ...state,
        detailCalendar: first(action.payload),
        isLoading: false,
      }
    case GET_DETAIL_FACTORY_CALENDAR_FAILED:
    case GET_LIST_FACTORY_EVENT_FAILED:
    case GET_LIST_FACTORY_CALENDAR_FAILED:
    case CREATE_FACTORY_CALENDAR_SETUP_SUCCESS:
    case CREATE_FACTORY_CALENDAR_SETUP_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
