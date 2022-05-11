import Dashboard from '~/modules/wmsx/features/dashboard'
import DefineDetailDetail from '~/modules/wmsx/features/define-detail/detail'
import DefineDetailForm from '~/modules/wmsx/features/define-detail/form'
import DefineDetail from '~/modules/wmsx/features/define-detail/list'
import InventoryDeadlineWarning from '~/modules/wmsx/features/inventory-deadline-warning'
import InventoryStatistics from '~/modules/wmsx/features/inventory-statistics'
import InventoryWarning from '~/modules/wmsx/features/inventory-warning'
import WarehouseReport from '~/modules/wmsx/features/warehouse-report'
import WarehouseReportDetail from '~/modules/wmsx/features/warehouse-report/detail'
import WarehouseReportForm from '~/modules/wmsx/features/warehouse-report/form'

import DefineWarehouse from '../features/define-warehouse'
import DefineWarehouseDetail from '../features/define-warehouse/detail'
import DefineWarehouseFrom from '../features/define-warehouse/form'
import InventoryLimit from '../features/inventory-limit'
import InventoryLimitDetail from '../features/inventory-limit/detail'
import InventoryLimitForm from '../features/inventory-limit/form'
import WarehouseSettingDetail from '../features/warehouse-setting/detail'
import WarehouseSettingForm from '../features/warehouse-setting/form'
import WarehouseSetting from '../features/warehouse-setting/list'
import WarehouseTransferMovements from '../features/warehouse-transfer-movements'
import WarehouseTransferMovementsDetail from '../features/warehouse-transfer-movements/detail'
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
    name: ROUTE.WAREHOUSE_TRANSFER_MOVEMENTS.LIST.TITLE,
    path: ROUTE.WAREHOUSE_TRANSFER_MOVEMENTS.LIST.PATH,
    component: WarehouseTransferMovements,
    icon: 'home',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.WAREHOUSE_TRANSFER_MOVEMENTS.DETAIL.TITLE,
        path: ROUTE.WAREHOUSE_TRANSFER_MOVEMENTS.DETAIL.PATH,
        component: WarehouseTransferMovementsDetail,
        isInSidebar: false,
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
  {
    name: ROUTE.WAREHOUSE_REPORT_MANAGEMENT.TITLE,
    icon: 'home',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.WAREHOUSE_REPORT.LIST.TITLE,
        path: ROUTE.WAREHOUSE_REPORT.LIST.PATH,
        component: WarehouseReport,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.WAREHOUSE_REPORT.CREATE.TITLE,
            path: ROUTE.WAREHOUSE_REPORT.CREATE.PATH,
            component: WarehouseReportForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_REPORT.DETAIL.TITLE,
            path: ROUTE.WAREHOUSE_REPORT.DETAIL.PATH,
            component: WarehouseReportDetail,
            isInSidebar: false,
          },
        ],
      },
      {
        path: ROUTE.INVENTORY_STATISTICS.PATH,
        name: ROUTE.INVENTORY_STATISTICS.TITLE,
        component: InventoryStatistics,
        isInSidebar: true,
      },
      {
        path: ROUTE.INVENTORY_DEADLINE_WARNING.PATH,
        name: ROUTE.INVENTORY_DEADLINE_WARNING.TITLE,
        component: InventoryDeadlineWarning,
        isInSidebar: true,
      },
      {
        path: ROUTE.INVENTORY_WARNING.PATH,
        name: ROUTE.INVENTORY_WARNING.TITLE,
        component: InventoryWarning,
        isInSidebar: true,
      },
    ],
  },
  {
    name: ROUTE.SETTING.TITLE,
    icon: 'setting',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.INVENTORY_LIMIT.LIST.TITLE,
        path: ROUTE.INVENTORY_LIMIT.LIST.PATH,
        component: InventoryLimit,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.INVENTORY_LIMIT.CREATE.TITLE,
            path: ROUTE.INVENTORY_LIMIT.CREATE.PATH,
            component: InventoryLimitForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.INVENTORY_LIMIT.EDIT.TITLE,
            path: ROUTE.INVENTORY_LIMIT.EDIT.PATH,
            component: InventoryLimitForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.INVENTORY_LIMIT.DETAIL.TITLE,
            path: ROUTE.INVENTORY_LIMIT.DETAIL.PATH,
            component: InventoryLimitDetail,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
]

export default routes
