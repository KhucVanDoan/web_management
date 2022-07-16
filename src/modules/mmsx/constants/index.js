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
  'priority.trivial',
  'priority.minor',
  'priority.major',
  'priority.critical',
  'priority.blocker',
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

export const WARNING_PRIORITY_LEVEL = [
  {
    title: 'priority.blocker',
    value: 2,
  },
  {
    title: 'priority.major',
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

export const WORK_TIME_DATA_SOURCE_TYPE = [
  {
    value: 0,
    text: 'deviceAssign.assign.mes',
  },
  {
    value: 1,
    text: 'deviceAssign.assign.input',
  },
  {
    value: 2,
    text: 'deviceAssign.assign.iot',
  },
]

export const DEVICE_ASSIGN_STATUS_OPTION = [
  {
    text: 'deviceAssign.status.unuse',
    id: 0,
    color: 'pending',
  },
  {
    text: 'deviceAssign.status.inuse',
    id: 1,
    color: 'confirmed',
  },
  {
    text: 'deviceAssign.status.inMaintaining',
    id: 2,
    color: 'confirmed',
  },
  {
    text: 'deviceAssign.status.inCrapping',
    id: 3,
    color: 'confirmed',
  },
  {
    text: 'deviceAssign.status.returned',
    id: 4,
    color: 'confirmed',
  },
  {
    text: 'deviceAssign.status.pending',
    id: 5,
    color: 'pending',
  },
]

export const DEVICE_ASSIGN_STATUS_VALUE = {
  UNUSE: 0,
  INUSE: 1,
  INMAINTAINING: 2,
  INCRAPPING: 3,
  RETURNED: 4,
  PENDING: 5,
}

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

export const PRIORITY_LEVEL = {
  BLOCKER: 5,
  CRITICAL: 4,
  MAJOR: 3,
  MINOR: 2,
  TRIVIAL: 1,
}

export const PRIORITY_LEVEL_MAP = {
  [PRIORITY_LEVEL.BLOCKER]: 'priority.blocker',
  [PRIORITY_LEVEL.CRITICAL]: 'priority.critical',
  [PRIORITY_LEVEL.MAJOR]: 'priority.major',
  [PRIORITY_LEVEL.MINOR]: 'priority.minor',
  [PRIORITY_LEVEL.TRIVIAL]: 'priority.trivial',
}

export const PRIORITY_LEVEL_OPTIONS = [
  {
    title: 'priority.blocker',
    id: 5,
  },
  {
    title: 'priority.critical',
    id: 4,
  },
  {
    title: 'priority.major',
    id: 3,
  },
  {
    title: 'priority.minor',
    id: 2,
  },
  {
    title: 'priority.trivial',
    id: 1,
  },
]

//Request common
export const DEVICE_REQUEST_STATUS_OPTION = [
  {
    text: 'requestDevice.status.pending',
    id: 0,
    color: 'pending',
  },
  {
    text: 'requestDevice.status.awaitingITConfirmation',
    id: 1,
    color: 'active',
  },
  {
    text: 'requestDevice.status.awaitingAssigment',
    id: 3,
    color: 'inReceiving',
  },
  {
    text: 'requestDevice.status.assigned',
    id: 4,
    color: 'active',
  },
  {
    text: 'requestDevice.status.awaitingReturn',
    id: 5,
    color: 'inReceiving',
  },
  {
    text: 'requestDevice.status.returned',
    id: 6,
    color: 'received',
  },
  {
    text: 'requestDevice.status.confirmed',
    id: 2,
    color: 'confirmed',
  },
  {
    text: 'requestDevice.status.rejected',
    id: 7,
    color: 'rejected',
  },
  {
    text: 'requestDevice.status.waittingExport',
    id: 8,
    color: 'exporting',
  },
  {
    text: 'requestDevice.status.installed',
    id: 9,
    color: 'rejected',
  },
]

export const DEVICE_REQUEST_LIST_STATUS = {
  PENDING: 0,
  AWAITINGITCONFIRMATION: 1,
  CONFIRMED: 2,
  AWAITINGASSIGNMENT: 3,
  ASSIGNED: 4,
  AWAITINGRETURN: 5,
  RETURNED: 6,
  REJECTED: 7,
  WAITTINGEXPORT: 8,
  INSTALLED: 9,
}

export const DEVICE_REQUEST_LIST_STATUS_MAP = {
  [DEVICE_REQUEST_LIST_STATUS.PENDING]: 'pending',
  [DEVICE_REQUEST_LIST_STATUS.AWAITINGITCONFIRMATION]: 'awaitingITConfirmation',
  [DEVICE_REQUEST_LIST_STATUS.CONFIRMED]: 'confirmed',
  [DEVICE_REQUEST_LIST_STATUS.AWAITINGASSIGNMENT]: 'awaitingAssigment',
  [DEVICE_REQUEST_LIST_STATUS.ASSIGNED]: 'assigned',
  [DEVICE_REQUEST_LIST_STATUS.AWAITINGRETURN]: 'awaitingReturn',
  [DEVICE_REQUEST_LIST_STATUS.RETURNED]: 'returned',
  [DEVICE_REQUEST_LIST_STATUS.REJECTED]: 'rejected',
  [DEVICE_REQUEST_LIST_STATUS.WAITTINGEXPORT]: 'waittingExport',
  [DEVICE_REQUEST_LIST_STATUS.INSTALLED]: 'installed',
}

export const DEVICE_REQUEST_TICKET_STATUS_OPTION = [
  {
    text: 'requestDevice.status.pending',
    id: 0,
    color: 'pending',
  },
  {
    text: 'requestDevice.status.awaitingITConfirmation',
    id: 1,
    color: 'active',
  },
  {
    text: 'requestDevice.status.awaitingAssigment',
    id: 2,
    color: 'inReceiving',
  },
  {
    text: 'requestDevice.status.assigned',
    id: 3,
    color: 'active',
  },
  {
    text: 'requestDevice.status.confirmed',
    id: 4,
    color: 'confirmed',
  },
  {
    text: 'requestDevice.status.rejected',
    id: 5,
    color: 'rejected',
  },
  {
    text: 'requestDevice.status.waittingExport',
    id: 6,
    color: 'exporting',
  },
]

export const DEVICE_REQUEST_TICKET_STATUS = {
  PENDING: 0,
  AWAITINGITCONFIRMATION: 1,
  AWAITINGASSIGNMENT: 2,
  ASSIGNED: 3,
  CONFIRMED: 4,
  REJECTED: 5,
  WAITTINGEXPORT: 6,
}

export const DEVICE_REQUEST_TICKET_STATUS_MAP = {
  [DEVICE_REQUEST_TICKET_STATUS.PENDING]: 'pending',
  [DEVICE_REQUEST_TICKET_STATUS.AWAITINGITCONFIRMATION]:
    'awaitingITConfirmation',
  [DEVICE_REQUEST_TICKET_STATUS.AWAITINGASSIGNMENT]: 'awaitingAssigment',
  [DEVICE_REQUEST_TICKET_STATUS.ASSIGNED]: 'assigned',
  [DEVICE_REQUEST_TICKET_STATUS.CONFIRMED]: 'confirmed',
  [DEVICE_REQUEST_TICKET_STATUS.REJECTED]: 'rejected',
  [DEVICE_REQUEST_TICKET_STATUS.WAITTINGEXPORT]: 'waittingExport',
}

//Here return

export const DEVICE_RETURN_TICKET_STATUS_OPTION = [
  {
    text: 'requestDevice.status.pending',
    id: 0,
    color: 'pending',
  },
  {
    text: 'requestDevice.status.awaitingITConfirmation',
    id: 1,
    color: 'active',
  },
  {
    text: 'requestDevice.status.awaitingReturn',
    id: 2,
    color: 'inReceiving',
  },
  {
    text: 'requestDevice.status.returned',
    id: 3,
    color: 'received',
  },
  {
    text: 'requestDevice.status.rejected',
    id: 4,
    color: 'rejected',
  },
]

export const DEVICE_RETURN_TICKET_STATUS = {
  PENDING: 0,
  AWAITINGITCONFIRMATION: 1,
  AWAITINGRETURN: 2,
  RETURNED: 3,
  REJECTED: 4,
}

export const DEVICE_RETURN_TICKET_STATUS_MAP = {
  [DEVICE_RETURN_TICKET_STATUS.PENDING]: 'pending',
  [DEVICE_RETURN_TICKET_STATUS.AWAITINGITCONFIRMATION]:
    'awaitingITConfirmation',
  [DEVICE_RETURN_TICKET_STATUS.AWAITINGRETURN]: 'awaitingReturn',
  [DEVICE_RETURN_TICKET_STATUS.RETURNED]: 'returned',
  [DEVICE_RETURN_TICKET_STATUS.REJECTED]: 'rejected',
}

//Request-device
export const TYPE_REQUEST = {
  REQUEST: 0,
  RETURN: 1,
}

export const TYPE_REQUEST_MAP = {
  [TYPE_REQUEST.REQUEST]: 'request',
  [TYPE_REQUEST.RETURN]: 'return',
}

export const TYPE_REQUEST_OPTION = [
  {
    text: 'requestDevice.request',
    id: 0,
  },
  {
    text: 'requestDevice.return',
    id: 1,
  },
]

export const REQUEST_DEVICE_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  REJECTED: 2,
}

export const REQUEST_DEVICE_STATUS_MAP = {
  [REQUEST_DEVICE_STATUS.PENDING]: 'pending',
  [REQUEST_DEVICE_STATUS.CONFIRMED]: 'confirmed',
  [REQUEST_DEVICE_STATUS.REJECTED]: 'rejected',
}

export const MAINTAIN_STATUS = {
  PENDING: 1,
  CONFIRMED1: 2,
  CONFIRMED2: 3,
  NOT_EXCUTE: 4,
  REJECTED: 5,
  IN_PROGRESS: 6,
  EXECUTED: 7,
  COMPLETED: 8,
}

export const MAINTAIN_STATUS_MAP = {
  [MAINTAIN_STATUS.PENDING]: 'maintainRequestStatus.pending',
  [MAINTAIN_STATUS.CONFIRMED1]: 'maintainRequestStatus.confirmed1',
  [MAINTAIN_STATUS.CONFIRMED2]: 'maintainRequestStatus.confirmed2',
  [MAINTAIN_STATUS.NOT_EXCUTE]: 'maintainRequestStatus.notExcute',
  [MAINTAIN_STATUS.REJECTED]: 'maintainRequestStatus.rejected',
  [MAINTAIN_STATUS.IN_PROGRESS]: 'maintainRequestStatus.inProgress',
  [MAINTAIN_STATUS.EXECUTED]: 'maintainRequestStatus.executed',
  [MAINTAIN_STATUS.COMPLETED]: 'maintainRequestStatus.completed',
}

export const MAINTAIN_STATUS_OPTIONS = [
  {
    id: 1,
    text: 'maintainRequestStatus.pending',
    color: 'pending',
  },
  {
    id: 2,
    text: 'maintainRequestStatus.confirmed1',
    color: 'confirmed',
  },
  {
    id: 3,
    text: 'maintainRequestStatus.confirmed2',
    color: 'confirmed',
  },
  {
    id: 4,
    text: 'maintainRequestStatus.notExcute',
    color: 'notExcute',
  },
  {
    id: 5,
    text: 'maintainRequestStatus.rejected',
    color: 'rejected',
  },
  {
    id: 6,
    text: 'maintainRequestStatus.inProgress',
    color: 'inProgress',
  },
  {
    id: 7,
    text: 'maintainRequestStatus.executed',
    color: 'executed',
  },
  {
    id: 8,
    text: 'maintainRequestStatus.completed',
    color: 'completed',
  },
]

export const WORK_TYPE = {
  WARNING: 1,
  SCHEDULE_MAINTAIN: 2,
  REQUEST: 3,
  PERIOD_CHECK: 4,
  INSTALL: 5,
}

export const WORK_TYPE_MAP = {
  [WORK_TYPE.WARNING]: 'workType.warning',
  [WORK_TYPE.SCHEDULE_MAINTAIN]: 'workType.scheduleMaintain',
  [WORK_TYPE.REQUEST]: 'workType.request',
  [WORK_TYPE.PERIOD_CHECK]: 'workType.periodCheck',
  [WORK_TYPE.INSTALL]: 'workType.install',
}

export const WORK_TYPE_OPTIONS = [
  {
    text: 'workType.warning',
    id: 1,
  },
  {
    text: 'workType.scheduleMaintain',
    id: 2,
  },
  {
    text: 'workType.request',
    id: 3,
  },
  {
    text: 'workType.periodCheck',
    id: 4,
  },
  {
    text: 'workType.install',
    id: 5,
  },
]

export const JOB_STATUS_LIST = [
  {
    text: 'common.statusList.nonAssign',
    id: 1,
  },
  {
    text: 'common.statusList.waitingToComfirm',
    id: 2,
    color: 'pending',
  },
  {
    text: 'common.statusList.reject',
    id: 3,
    color: 'rejected',
  },
  {
    text: 'common.statusList.toDo',
    id: 4,
  },
  {
    text: 'common.statusList.inProgress',
    id: 5,
    color: 'inProgress',
  },
  {
    text: 'common.statusList.completed',
    id: 6,
  },
  {
    text: 'common.statusList.outOfDate',
    id: 7,
  },
  {
    text: 'common.statusList.late',
    id: 8,
  },
  {
    text: 'common.statusList.resolved',
    id: 9,
    color: 'completed',
  },
]
export const SUPPLY_REQUEST_TYPE = [
  { value: 1, text: 'suppliesRequest.type.returnRequest' },
  { value: 2, text: 'suppliesRequest.type.request' },
]
export const SUPPLY_REQUEST_STATUS = [
  {
    id: 0,
    text: 'suppliesRequest.status.waitingConfirm',
    color: 'pending',
  },
  {
    id: 1,
    text: 'suppliesRequest.status.waitingExport',
    color: 'waitingExport',
  },
  { id: 2, text: 'suppliesRequest.status.completed', color: 'completed' },
  { id: 3, text: 'suppliesRequest.status.rejected', color: 'rejected' },
]

export const SUPPLIES_REQUEST_STATUS = {
  PENDING: 0,
  WATTINGEXPORT: 1,
  CONPLETED: 2,
  REJECTED: 3,
}
export const DEVICE_ASSIGN_STATUS = [
  {
    id: 0,
    text: 'deviceAssign.status.unuse',
    color: 'pendding',
  },
  {
    id: 1,
    text: 'deviceAssign.status.inuse',
    color: 'inProgress',
  },
  {
    id: 2,
    text: 'deviceAssign.status.inMaintaining',
    color: 'inProgress',
  },
  {
    id: 3,
    text: 'deviceAssign.status.inCrapping',
    color: 'rejected',
  },
  {
    id: 4,
    text: 'deviceAssign.status.returned',
    color: 'confirmed',
  },
]
