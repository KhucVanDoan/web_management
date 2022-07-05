import {
  GET_TEMPLATE_CHECKLIST_FAIL,
  GET_TEMPLATE_CHECKLIST_START,
  GET_TEMPLATE_CHECKLIST_SUCCESS,
  SEARCH_TEMPLATE_CHECKLIST_FAIL,
  SEARCH_TEMPLATE_CHECKLIST_START,
  SEARCH_TEMPLATE_CHECKLIST_SUCCESS,
  RESET_TEMPLATE_CHECKLIST,
} from '~/modules/mmsx/redux/actions/template-checklist'

const initialState = {
  templateChecklistList: [],
  templateChecklistDetail: {},
  isLoading: false,
}

export default function templateCheckList(state = initialState, action) {
  switch (action.type) {
    case SEARCH_TEMPLATE_CHECKLIST_START:
    case GET_TEMPLATE_CHECKLIST_START:
      return {
        ...state,
        isLoading: true,
      }
    case SEARCH_TEMPLATE_CHECKLIST_SUCCESS:
      return {
        ...state,
        templateChecklistList: action?.payload?.items,
        isLoading: false,
      }
    case GET_TEMPLATE_CHECKLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        templateChecklistDetail: action?.payload,
      }
    case SEARCH_TEMPLATE_CHECKLIST_FAIL:
    case GET_TEMPLATE_CHECKLIST_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_TEMPLATE_CHECKLIST:
      return {
        ...state,
        templateChecklistDetail: {},
      }
    default:
      return state
  }
}
