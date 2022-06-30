export const MAINTAINANCE_STATUS_DASHBOARD = [
  'completed',
  'overdue',
  'inprogress',
  'waitForConfirmation',
]
export const REQUEST_STATUS_DASHBOARD = [
  'waitForConfirmation',
  'inprogress',
  'completed',
]
export const PRIORITY_DASHBOARD = [
  '',
  'piority.trivial',
  'piority.minor',
  'piority.major',
  'piority.critical',
  'piority.blocker',
]
export const PIE_CHART_COLORS = [
  '#0761AD',
  '#FF9054',
  '#B2DF8A',
  '#7B61FF',
  '#FF0909',
]
export const DEVICE_CATEGORY_STATUS_OPTION = [
  {
    text: 'deviceCategory.status.pending',
    id: 0,
    color: 'pending',
  },
  {
    text: 'deviceCategory.status.confirmed',
    id: 1,
    color: 'confirmed',
  },
]

export const DEVICE_CATEGORY_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
}

export const DEVICE_CATEGORY_STATUS_MAP = {
  [DEVICE_CATEGORY_STATUS.PENDING]: 'pending',
  [DEVICE_CATEGORY_STATUS.CONFIRMED]: 'confirmed',
}
export const ACTION_HISTORY = {
  CREATED: 0,
  UPDATED: 1,
  DELETE: 2,
  CONFIRM: 3,
  REJECT: 4,
}
export const ACTION_MAP = {
  [ACTION_HISTORY.CREATED]: 'created',
  [ACTION_HISTORY.UPDATED]: 'updated',
  [ACTION_HISTORY.DELETE]: 'delete',
  [ACTION_HISTORY.CONFIRM]: 'confirm',
  [ACTION_HISTORY.REJECT]: 'reject',
}
