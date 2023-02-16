import { NOTIFICATION_ACTION_ENUM } from '~/common/constants/notification'

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
  CHANGE_NOTIFICATION_ACTION_TO_VIEW,
  CHANGE_NOTIFICATION_STATUS_START,
  CHANGE_NOTIFICATION_STATUS_SUCCESS,
  CHANGE_NOTIFICATION_STATUS_FAILED,
} from '../actions/notification'

const initialState = {
  items: [],
  total: 0,
  totalUnRead: 0,
  isLoading: false,
}

export default function notification(state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATIONS_START:
    case SEEN_ONE_NOTIFICATION_START:
    case SEEN_ALL_NOTIFICATIONS_START:
    case CHANGE_NOTIFICATION_STATUS_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_NOTIFICATIONS_FAILED:
    case SEEN_ONE_NOTIFICATION_FAILED:
    case SEEN_ALL_NOTIFICATIONS_FAILED:
    case CHANGE_NOTIFICATION_STATUS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        items: [...state.items, ...(action.payload?.items || [])],
        total: action.payload?.meta?.total,
        totalUnRead: action.payload?.meta?.totalUnRead,
        isLoading: false,
      }
    case SEEN_ONE_NOTIFICATION_SUCCESS:
      const newItems = (state.items || []).map((item) => {
        if (item?._id === action.payload?._id)
          return { ...item, ...action.payload }

        return item
      })

      return {
        ...state,
        items: newItems,
        totalUnRead: state.totalUnRead - 1,
        isLoading: false,
      }
    case SEEN_ALL_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        items: state.items.map((item) => ({
          ...item,
          readAt: item.readAt || new Date().toISOString(),
        })),
        totalUnRead: 0,
        isLoading: false,
      }
    case ADD_NOTIFICATION:
      return {
        ...state,
        items: [action.payload, ...state.items],
        totalUnRead: state.totalUnRead + 1,
      }

    case CHANGE_NOTIFICATION_ACTION_TO_VIEW:
      const updatedItems = state.items.map((item) => {
        if (item?._id === action.payload) {
          return {
            ...item,
            notificationId: {
              ...item.notificationId,
              action: NOTIFICATION_ACTION_ENUM.VIEW,
            },
          }
        }
        return item
      })

      return {
        ...state,
        items: updatedItems,
      }
    case CHANGE_NOTIFICATION_STATUS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      }
    }
    default:
      return state
  }
}
