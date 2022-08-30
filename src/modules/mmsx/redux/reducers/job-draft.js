import {
  GENERATE_JOB_FOR_PLAN_FAIL,
  GENERATE_JOB_FOR_PLAN_START,
  GENERATE_JOB_FOR_PLAN_SUCCESS,
  RESET_GENERATE_JOB_FOR_PLAN,
} from '../actions/job-draft'

const initialState = {
  isLoading: false,
  jobDraftLists: {},
}

export default function jobDraftList(state = initialState, action) {
  switch (action.type) {
    case GENERATE_JOB_FOR_PLAN_START:
      return {
        ...state,
        isLoading: true,
      }
    case GENERATE_JOB_FOR_PLAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobDraftLists: action?.payload,
      }
    case GENERATE_JOB_FOR_PLAN_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case RESET_GENERATE_JOB_FOR_PLAN:
      return {
        ...state,
        jobDraftLists: {},
      }
    default:
      return state
  }
}
