export const ROUTE = {
  WAREHOUSE_IMPORT_RECEIPT: {
    LIST: {
      PATH: '/',
      TITLE: 'Phiếu giám sát xe',
    },
    CREATE: {
      PATH: '/warehouse-import-receipt/create',
      TITLE: 'Tạo phiếu giám sát xe',
    },
    EDIT: {
      PATH: '/warehouse-import-receipt/:id/edit',
      TITLE: 'Sửa phiếu giám sát xe',
    },
    DETAIL: {
      PATH: '/warehouse-import-receipt/:id/detail',
      TITLE: 'Chi tiết phiếu giám sát xe',
    },
  },

  USER_MANAGEMENT: {
    LIST: {
      PATH: '/user-management',
      TITLE: 'Quản lý người dùng',
    },
    CREATE: {
      PATH: '/user-management/create',
      TITLE: 'Tạo người dùng',
    },
    DETAIL: {
      PATH: '/user-management/:id/detail',
      TITLE: 'Thông tin người dùng',
    },
    EDIT: {
      PATH: '/user-management/:id/edit',
      TITLE: 'Sửa thông tin người dùng',
    },
  },
  ACCOUNT: {
    DETAIL: {
      PATH: '/account/user-info',
      TITLE: 'Thông tin tài khoản',
    },
    CHANGE_PASSWORD: {
      PATH: '/account/change-password',
      TITLE: 'Đổi mật khẩu',
    },
  },
}
