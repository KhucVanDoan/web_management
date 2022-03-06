export const GET_LIST_FACTORY_CALENDAR = 'GET_LIST_FACTORY_CALENDAR'
export const GET_LIST_FACTORY_CALENDAR_SUCCESS =
  'GET_LIST_FACTORY_CALENDAR_SUCCESS'
export const GET_LIST_FACTORY_CALENDAR_FAILED =
  'GET_LIST_FACTORY_CALENDAR_FAILED'

export const GET_DETAIL_FACTORY_CALENDAR =
  'GET_DETAIL_FACTORY_CALENDAR_CALENDAR'
export const GET_DETAIL_FACTORY_CALENDAR_SUCCESS =
  'GET_DETAIL_FACTORY_CALENDAR_SUCCESS'
export const GET_DETAIL_FACTORY_CALENDAR_FAILED =
  'GET_DETAIL_FACTORY_CALENDAR_FAILED'

export const UPDATE_FACTORY_CALENDAR = 'UPDATE_FACTORY_CALENDAR'
export const UPDATE_FACTORY_CALENDAR_SUCCESS = 'UPDATE_FACTORY_CALENDAR_SUCCESS'
export const UPDATE_FACTORY_CALENDAR_FAILED = 'UPDATE_FACTORY_CALENDAR_FAILED'

export const CREATE_FACTORY_CALENDAR = 'CREATE_FACTORY_CALENDAR'
export const CREATE_FACTORY_CALENDAR_SUCCESS = 'CREATE_FACTORY_CALENDAR_SUCCESS'
export const CREATE_FACTORY_CALENDAR_FAILED = 'CREATE_FACTORY_CALENDAR_FAILED'

export const getListFactoryCalendar = (payload, onSuccess, onError) => ({
  type: GET_LIST_FACTORY_CALENDAR,
  payload,
  onSuccess,
  onError,
})

export const getListFactoryCalendarSuccess = (payload, onSuccess, onError) => ({
  type: GET_LIST_FACTORY_CALENDAR_SUCCESS,
  payload,
  onSuccess,
  onError,
})

export const getListFactoryCalendarFailed = (payload, onSuccess, onError) => ({
  type: GET_LIST_FACTORY_CALENDAR_FAILED,
  payload,
  onSuccess,
  onError,
})

export const getDetailFactoryCalendar = (payload, onSuccess, onError) => ({
  type: GET_DETAIL_FACTORY_CALENDAR,
  payload,
  onSuccess,
  onError,
})

export const getDetailFactoryCalendarFailed = (
  payload,
  onSuccess,
  onError,
) => ({
  type: GET_DETAIL_FACTORY_CALENDAR_FAILED,
  payload,
  onSuccess,
  onError,
})

export const getDetailFactoryCalendarSuccess = (
  payload,
  onSuccess,
  onError,
) => ({
  type: GET_DETAIL_FACTORY_CALENDAR_SUCCESS,
  payload,
  onSuccess,
  onError,
})

export const updateFactoryCalendar = (payload, onSuccess, onError) => ({
  type: UPDATE_FACTORY_CALENDAR,
  payload,
  onSuccess,
  onError,
})

export const updateFactoryCalendarSuccess = (payload, onSuccess, onError) => ({
  type: UPDATE_FACTORY_CALENDAR_SUCCESS,
  payload,
  onSuccess,
  onError,
})

export const updateFactoryCalendarFailed = (payload, onSuccess, onError) => ({
  type: UPDATE_FACTORY_CALENDAR_FAILED,
  payload,
  onSuccess,
  onError,
})

export const createFactoryCalendar = (payload, onSuccess, onError) => ({
  type: CREATE_FACTORY_CALENDAR,
  payload,
  onSuccess,
  onError,
})

export const createFactoryCalendarSuccess = (payload, onSuccess, onError) => ({
  type: CREATE_FACTORY_CALENDAR_SUCCESS,
  payload,
  onSuccess,
  onError,
})

export const createFactoryCalendarFailed = (payload, onSuccess, onError) => ({
  type: CREATE_FACTORY_CALENDAR_FAILED,
  payload,
  onSuccess,
  onError,
})

export default {
  getListFactoryCalendar,
  getListFactoryCalendarSuccess,
  getListFactoryCalendarFailed,
  getDetailFactoryCalendar,
  getDetailFactoryCalendarSuccess,
  getDetailFactoryCalendarFailed,
  updateFactoryCalendar,
  updateFactoryCalendarSuccess,
  updateFactoryCalendarFailed,
  createFactoryCalendar,
  createFactoryCalendarSuccess,
  createFactoryCalendarFailed,
}
