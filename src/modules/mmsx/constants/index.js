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
export const WARNING_STATUS_LIST = [
  {
    text: 'warningList.status.pending',
    id: 1,
    color: 'pending',
  },
  {
    text: 'warningList.status.confirmed',
    id: 2,
    color: 'confirmed',
  },
  {
    text: 'warningList.status.rejected',
    id: 3,
    color: 'rejected',
  },
  {
    text: 'warningList.status.inProgress',
    id: 4,
    color: 'inProgress',
  },
  {
    text: 'warningList.status.completed',
    id: 5,
    color: 'completed',
  },
  {
    text: 'warningList.status.notExcute',
    id: 6,
    color: 'notExcute',
  },
  {
    text: 'warningList.status.executed',
    id: 7,
    color: 'executed',
  },
]
export const WARNING_SYSTEM_STATUS = {
  PENDING: 1,
  CONFIRMED: 2,
  REJECTED: 3,
  INPROGRESS: 4,
  COMPLETED: 5,
  NOTEXCUTE: 6,
  EXECUTED: 7,
}

export const WARNING_SYSTEM_STATUS_MAP = {
  [WARNING_SYSTEM_STATUS.PENDING]: 'pending',
  [WARNING_SYSTEM_STATUS.CONFIRMED]: 'confirmed',
  [WARNING_SYSTEM_STATUS.REJECTED]: 'rejected',
  [WARNING_SYSTEM_STATUS.INPROGRESS]: 'inProgress',
  [WARNING_SYSTEM_STATUS.COMPLETED]: 'completed',
  [WARNING_SYSTEM_STATUS.NOTEXCUTE]: 'notExcute',
  [WARNING_SYSTEM_STATUS.EXECUTED]: 'EXECUTED',
}
export const WARNING_TYPE = [
  {
    text: 'warningType.error',
    value: 3,
  },
  {
    text: 'warningType.scheduled',
    value: 2,
  },
  {
    text: 'warningType.checkList',
    value: 4,
  },
]
export const WARNING_TYPE_OPTION = {
  ERROR: 3,
  SCHEDULE: 2,
  CHECKLIST: 4,
}
export const PIORITY_LEVEL_OPTION = [
  {
    title: 'piority.blocker',
    value: 5,
  },
  {
    title: 'piority.critical',
    value: 4,
  },
  {
    title: 'piority.major',
    value: 3,
  },
  {
    title: 'piority.minor',
    value: 2,
  },
  {
    title: 'piority.trivial',
    value: 1,
  },
]
export const WARNING_PIORITY_LEVEL = [
  {
    title: 'piority.blocker',
    value: 2,
  },
  {
    title: 'piority.major',
    value: 1,
  },
]
export const CHECKLIST_RESULT = [
  {
    title: 'fail',
    value: 0,
  },
  {
    title: 'pass',
    value: 1,
  },
]
export const CHECKLIST_CONCLUDE = [
  {
    title: 'replace',
    value: 0,
  },
  {
    title: 'continueMaintain',
    value: 1,
  },
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
