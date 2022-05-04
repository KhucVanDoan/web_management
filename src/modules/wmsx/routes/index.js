import Dashboard from '~/modules/wmsx/features/dashboard'
import DefineDetailDetail from '~/modules/wmsx/features/define-detail/detail'
import DefineDetailForm from '~/modules/wmsx/features/define-detail/form'
import DefineDetail from '~/modules/wmsx/features/define-detail/list'

import DefineWarehouse from '../features/define-warehouse'
import DefineWarehouseDetail from '../features/define-warehouse/detail'
import DefineWarehouseFrom from '../features/define-warehouse/form'
import WarehouseSettingDetail from '../features/warehouse-setting/detail'
import WarehouseSettingForm from '../features/warehouse-setting/form'
import WarehouseSetting from '../features/warehouse-setting/list'
import { ROUTE } from './config'

const routes = [
  {
    name: ROUTE.DASHBOARD.TITLE,
    path: ROUTE.DASHBOARD.PATH,
    component: Dashboard,
    icon: 'home',
    isInSidebar: true,
  },
  {
    name: ROUTE.WAREHOUSE_SETUP.TITLE,
    isInSidebar: true,
    icon: 'setting',
    subMenu: [
      {
        name: ROUTE.WAREHOUSE_SETTING.LIST.TITLE,
        path: ROUTE.WAREHOUSE_SETTING.LIST.PATH,
        component: WarehouseSetting,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.WAREHOUSE_SETTING.CREATE.TITLE,
            path: ROUTE.WAREHOUSE_SETTING.CREATE.PATH,
            component: WarehouseSettingForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_SETTING.EDIT.TITLE,
            path: ROUTE.WAREHOUSE_SETTING.EDIT.PATH,
            component: WarehouseSettingForm,
            isInSidebar: true,
          },
          {
            name: ROUTE.WAREHOUSE_SETTING.DETAIL.TITLE,
            path: ROUTE.WAREHOUSE_SETTING.DETAIL.PATH,
            component: WarehouseSettingDetail,
            isInSidebar: true,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_WAREHOUSE.LIST.TITLE,
        path: ROUTE.DEFINE_WAREHOUSE.LIST.PATH,
        component: DefineWarehouse,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_WAREHOUSE.CREATE.TITLE,
            path: ROUTE.DEFINE_WAREHOUSE.CREATE.PATH,
            component: DefineWarehouseFrom,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_WAREHOUSE.DETAIL.TITLE,
            path: ROUTE.DEFINE_WAREHOUSE.DETAIL.PATH,
            component: DefineWarehouseDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_WAREHOUSE.EDIT.TITLE,
            path: ROUTE.DEFINE_WAREHOUSE.EDIT.PATH,
            component: DefineWarehouseFrom,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
  {
    name: ROUTE.DEFINE_CATEGORY.TITLE,
    icon: 'home',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.DEFINE_DETAIL.LIST.TITLE,
        path: ROUTE.DEFINE_DETAIL.LIST.PATH,
        component: DefineDetail,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_DETAIL.CREATE.TITLE,
            path: ROUTE.DEFINE_DETAIL.CREATE.PATH,
            component: DefineDetailForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_DETAIL.DETAIL.TITLE,
            path: ROUTE.DEFINE_DETAIL.DETAIL.PATH,
            component: DefineDetailDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_DETAIL.EDIT.TITLE,
            path: ROUTE.DEFINE_DETAIL.EDIT.PATH,
            component: DefineDetailForm,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
]

export default routes
