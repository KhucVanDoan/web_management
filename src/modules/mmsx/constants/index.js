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

export const DEVICE_STATUS_OPTION = [
  {
    text: 'deviceList.status.pending',
    id: 0,
    color: 'pending',
  },
  {
    text: 'deviceList.status.confirm',
    id: 1,
    color: 'confirmed',
  },
]

export const DEVICE_STATUS = {
  PENDING: 0,
  CONFIRM: 1,
}

export const DEVICE_STATUS_MAP = {
  [DEVICE_STATUS.PENDING]: 'deviceList.status.pending',
  [DEVICE_STATUS.CONFIRM]: 'deviceList.status.confirm',
}

export const SUPPLIES_ACCESSORY = {
  ACCESSORY: 1,
  SUPPLIES: 0,
}

export const SUPPLIES_ACCESSORY_OPTION = [
  { value: 0, text: 'deviceList.type.supplies' },
  { value: 1, text: 'deviceList.type.accessory' },
]

export const SUPPLIES_ACCESSORY_OPTION_MAP = {
  [SUPPLIES_ACCESSORY.SUPPLIES]: 'general.supplies',
  [SUPPLIES_ACCESSORY.ACCESSORY]: 'general.accessory',
}

export const TYPE = {
  PASSFAIL: 0,
}

export const TYPE_MAP = {
  [TYPE.PASSFAIL]: 'checkType.passFail',
}

//dùng trong màn deviceList
export const TYPE_ITEM = {
  ACCESSORY: 1,
  SUPPLIES: 0,
  DEVICE: 2,
}

export const TYPE_ITEM_MAP = {
  [TYPE_ITEM.SUPPLIES]: 'deviceList.type.supplies',
  [TYPE_ITEM.ACCESSORY]: 'deviceList.type.accessory',
  [TYPE_ITEM.DEVICE]: 'deviceList.type.device',
}

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
export const SUPPLIES_STATUS_OPTION = [
  {
    text: 'supplies.status.pending',
    id: 0,
    color: 'pending',
  },
  {
    text: 'supplies.status.confirmed',
    id: 1,
    color: 'confirmed',
  },
]
export const SUPPLIES_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
}

export const SUPPLIES_STATUS_MAP = {
  [SUPPLIES_STATUS.PENDING]: 'pending',
  [SUPPLIES_STATUS.CONFIRMED]: 'confirmed',
}

export const SUPPLIES_TYPE = [
  {
    text: 'common.supplies',
    id: 0,
  },
  {
    text: 'common.accessary',
    id: 1,
  },
]
export const PRE_FIX_CODE = '02'

export const MAINTENANCE_TEAM_TYPE = {
  OUTER: 0,
  INNER: 1,
}

export const MAINTENANCE_TEAM_TYPE_MAP = {
  [MAINTENANCE_TEAM_TYPE.OUTER]: 'maintenanceTeam.outer',
  [MAINTENANCE_TEAM_TYPE.INNER]: 'maintenanceTeam.inner',
}

export const MAINTENANCE_TEAM_TYPE_OPTIONS = [
  {
    id: 0,
    text: 'maintenanceTeam.outer',
  },
  {
    id: 1,
    text: 'maintenanceTeam.inner',
  },
]

export const ROLE_ENUM = {
  LEADER: 0,
  MEMBER: 1,
}

export const ROLE_ENUM_MAP = {
  [ROLE_ENUM.LEADER]: 'maintenanceTeam.leader',
  [ROLE_ENUM.MEMBER]: 'maintenanceTeam.member',
}

export const ROLE_ENUM_OPTIONS = [
  {
    id: 0,
    text: 'maintenanceTeam.leader',
  },
  {
    id: 1,
    text: 'maintenanceTeam.member',
  },
]

export const SUPPLIES_CATEGORY_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
}

export const SUPPLIES_CATEGORY_STATUS_MAP = {
  [SUPPLIES_CATEGORY_STATUS.PENDING]: 'suppliesCategory.status.pending',
  [SUPPLIES_CATEGORY_STATUS.CONFIRMED]: 'suppliesCategory.status.confirmed',
}

export const SUPPLIES_CATEGORY_STATUS_OPTIONS = [
  {
    text: 'suppliesCategory.status.pending',
    id: 0,
    color: 'pending',
  },
  {
    text: 'suppliesCategory.status.confirmed',
    id: 1,
    color: 'confirmed',
  },
]

export const CHECK_TYPE = {
  PASSFAIL: 0,
}

export const CHECK_TYPE_MAP = {
  [CHECK_TYPE.PASSFAIL]: 'templateChecklist.checkType.passFail',
}

export const CHECK_TYPE_OPTIONS = [
  {
    id: 0,
    text: 'templateChecklist.checkType.passFail',
  },
]
