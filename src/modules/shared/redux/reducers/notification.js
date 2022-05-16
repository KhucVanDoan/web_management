import {
  GET_NOTIFICATIONS_FAILED,
  GET_NOTIFICATIONS_START,
  GET_NOTIFICATIONS_SUCCESS,
  SEEN_ONE_NOTIFICATION_SUCCESS,
  SEEN_ONE_NOTIFICATION_FAILED,
  SEEN_ONE_NOTIFICATION_START,
  SEEN_ALL_NOTIFICATIONS_SUCCESS,
  SEEN_ALL_NOTIFICATIONS_FAILED,
  SEEN_ALL_NOTIFICATIONS_START,
  ADD_NOTIFICATION,
} from '../actions/notification'

const initialState = {
  items: [],
  total: 11,
  totalUnread: 0,
  isLoading: false,
}

export default function notification(state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATIONS_START:
    case SEEN_ONE_NOTIFICATION_START:
    case SEEN_ALL_NOTIFICATIONS_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_NOTIFICATIONS_FAILED:
    case SEEN_ONE_NOTIFICATION_FAILED:
    case SEEN_ALL_NOTIFICATIONS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        items: [...state.items, action.payload?.items],
        total: action.payload?.meta?.total,
        totalUnread: action.payload?.meta?.totalUnread,
        isLoading: false,
      }
    case SEEN_ONE_NOTIFICATION_SUCCESS:
      let newItems = [...state.items]

      const index = state.items.findIndex(
        (item) => item?.notificationId === action.payload?.notificationId,
      )

      if (index !== -1) {
        newItems = [
          ...newItems.slice(0, index - 1),
          action.payload,
          ...newItems.slice(index + 1),
        ]
      }
      return {
        ...state,
        items: newItems,
        totalUnread: state.totalUnread - 1,
        isLoading: false,
      }
    case SEEN_ALL_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        items: state.items.map((item) => ({
          ...item,
          readAt: item.readAt || new Date().toISOString(),
        })),
        totalUnread: 0,
        isLoading: false,
      }
    case ADD_NOTIFICATION:
      return {
        ...state,
        items: [action.payload, ...state.items],
        totalUnread: state.totalUnread + 1,
      }
    default:
      return state
  }
}
