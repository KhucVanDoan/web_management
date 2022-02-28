import {
  GET_LIST_FACTORY_CALENDAR,
  GET_LIST_FACTORY_CALENDAR_SUCCESS,
  GET_LIST_FACTORY_CALENDAR_FAILED,
  UPDATE_FACTORY_CALENDAR,
  CREATE_FACTORY_CALENDAR,
} from '~/modules/mesx/redux/actions/calendar'

const initialState = {
  isLoading: false,
  factoryCalendar: [],
}

export default function calendar(state = initialState, action) {
  switch (action.type) {
    case GET_LIST_FACTORY_CALENDAR:
    case UPDATE_FACTORY_CALENDAR:
    case CREATE_FACTORY_CALENDAR:
      return {
        ...state,
        isLoading: true,
      }
    case GET_LIST_FACTORY_CALENDAR_SUCCESS:
      return {
        ...state,
        factoryCalendar: action.payload,
        isLoading: false,
      }
    case GET_LIST_FACTORY_CALENDAR_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
