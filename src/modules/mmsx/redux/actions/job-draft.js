export const GENERATE_JOB_FOR_PLAN_START = 'MMSX_GENERATE_JOB_FOR_PLAN_START'
export const GENERATE_JOB_FOR_PLAN_SUCCESS =
  'MMSX_GENERATE_JOB_FOR_PLAN_SUCCESS'
export const GENERATE_JOB_FOR_PLAN_FAIL = 'MMSX_GENERATE_JOB_FOR_PLAN_FAIL'
export const RESET_GENERATE_JOB_FOR_PLAN = 'MMSX_RESET_GENERATE_JOB_FOR_PLAN'

export function generateJobForPlan(payload, onSuccess, onError) {
  return {
    type: GENERATE_JOB_FOR_PLAN_START,
    payload: payload,
    onSuccess,
    onError,
  }
}

export function generateJobForPlanSuccess(payload) {
  return {
    type: GENERATE_JOB_FOR_PLAN_SUCCESS,
    payload,
  }
}

export function generateJobForPlanFail() {
  return {
    type: GENERATE_JOB_FOR_PLAN_FAIL,
  }
}

export function resetGenerateJobForPlan() {
  return {
    type: RESET_GENERATE_JOB_FOR_PLAN,
  }
}

export default {
  generateJobForPlan,
  generateJobForPlanFail,
  generateJobForPlanSuccess,
  resetGenerateJobForPlan,
}
