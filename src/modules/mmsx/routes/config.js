export const ROUTE = {
  DASHBOARD: {
    PATH: '/mmsx',
    TITLE: 'dashboard',
  },
  DEVICE_STATUS: {
    PATH: '/mmsx/device-status',
    TITLE: 'deviceStatus',
    DETAIL: {
      PATH: '/mmsx/device-status/:id/detail',
      TITLE: 'deviceStatusDetail',
    },
    EDIT: {
      PATH: '/mmsx/device-status/:id/edit',
      TITLE: 'deviceStatusEdit',
    },
  },
}
