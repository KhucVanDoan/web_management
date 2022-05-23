import Dashboard from '~/modules/wmsx/features/dashboard'
import DefineBlockDetail from '~/modules/wmsx/features/define-block/detail'
import DefineBlockForm from '~/modules/wmsx/features/define-block/form'
import DefineBlock from '~/modules/wmsx/features/define-block/list'
import DefineCustomerDetail from '~/modules/wmsx/features/define-customer/detail'
import DefineCustomerForm from '~/modules/wmsx/features/define-customer/form'
import DefineCustomer from '~/modules/wmsx/features/define-customer/list'
import DefineDetailDetail from '~/modules/wmsx/features/define-detail/detail'
import DefineDetailForm from '~/modules/wmsx/features/define-detail/form'
import DefineDetail from '~/modules/wmsx/features/define-detail/list'
import DefinePackageDetail from '~/modules/wmsx/features/define-package/detail'
import DefinePackageForm from '~/modules/wmsx/features/define-package/form'
import DefinePackage from '~/modules/wmsx/features/define-package/list'
import DefineTemplateShelfDetail from '~/modules/wmsx/features/define-template-shelf/detail'
import DefineTemplateShelfForm from '~/modules/wmsx/features/define-template-shelf/form'
import DefineTemplateShelf from '~/modules/wmsx/features/define-template-shelf/list'
import ImportManufacturingOrderDetail from '~/modules/wmsx/features/import-manufacturing-order/detail'
import ImportManufacturingOrderForm from '~/modules/wmsx/features/import-manufacturing-order/form'
import ImportManufacturingOrder from '~/modules/wmsx/features/import-manufacturing-order/list'
import InventoryCalendarDetail from '~/modules/wmsx/features/inventory-calendar/detail'
import InventoryCalendarForm from '~/modules/wmsx/features/inventory-calendar/form'
import InventoryCalendar from '~/modules/wmsx/features/inventory-calendar/list'
import InventoryDeadlineWarning from '~/modules/wmsx/features/inventory-deadline-warning'
import InventoryStatistics from '~/modules/wmsx/features/inventory-statistics'
import InventoryWarning from '~/modules/wmsx/features/inventory-warning'
import WarehouseExport from '~/modules/wmsx/features/warehouse-export'
import WarehouseExportDetail from '~/modules/wmsx/features/warehouse-export/detail'
import WarehouseReport from '~/modules/wmsx/features/warehouse-report'
import WarehouseReportDetail from '~/modules/wmsx/features/warehouse-report/detail'
import WarehouseReportForm from '~/modules/wmsx/features/warehouse-report/form'

import DefineCurrencyUnitDetail from '../features/define-currency-unit/detail'
import DefineCurrencyUnitForm from '../features/define-currency-unit/form'
import DefineCurrencyUnit from '../features/define-currency-unit/list'
import DefineTypeUnitDetail from '../features/define-type-unit/detail'
import DefineTypeUnitForm from '../features/define-type-unit/form'
import DefineTypeUnit from '../features/define-type-unit/list'
import DefineVendorDetail from '../features/define-vendor/detail'
import DefineVendorForm from '../features/define-vendor/form'
import DefineVendor from '../features/define-vendor/list'
import DefineWarehouse from '../features/define-warehouse'
import DefineWarehouseDetail from '../features/define-warehouse/detail'
import DefineWarehouseFrom from '../features/define-warehouse/form'
import InventoryLimit from '../features/inventory-limit'
import InventoryLimitDetail from '../features/inventory-limit/detail'
import InventoryLimitForm from '../features/inventory-limit/form'
import InventoryDetail from '../features/inventory/detail'
import Inventory from '../features/inventory/list'
import ProductionOrder from '../features/production-orders'
import ProductionOrderDetail from '../features/production-orders/detail'
import ProductionOrderForm from '../features/production-orders/form'
import DefineVoucher from '../features/voucher'
import DefineVoucherDetail from '../features/voucher/detail'
import DefineVoucherForm from '../features/voucher/form'
import WarehouseAreaDetail from '../features/warehouse-area/detail'
import WarehouseArea from '../features/warehouse-area/list'
import WarehouseImportDetail from '../features/warehouse-import/detail'
import WarehouseImport from '../features/warehouse-import/list'
import WarehouseSettingDetail from '../features/warehouse-setting/detail'
import WarehouseSettingForm from '../features/warehouse-setting/form'
import WarehouseSetting from '../features/warehouse-setting/list'
import WarehouseTransferMovements from '../features/warehouse-transfer-movements'
import WarehouseTransferMovementsDetail from '../features/warehouse-transfer-movements/detail'
import warehouseTransferDetail from '../features/warehouse-transfer/detail'
import warehouseTransferForm from '../features/warehouse-transfer/form'
import warehouseTransfer from '../features/warehouse-transfer/list'
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
      {
        name: ROUTE.DEFINE_BLOCK.LIST.TITLE,
        path: ROUTE.DEFINE_BLOCK.LIST.PATH,
        component: DefineBlock,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_BLOCK.CREATE.TITLE,
            path: ROUTE.DEFINE_BLOCK.CREATE.PATH,
            component: DefineBlockForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_BLOCK.DETAIL.TITLE,
            path: ROUTE.DEFINE_BLOCK.DETAIL.PATH,
            component: DefineBlockDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_BLOCK.EDIT.TITLE,
            path: ROUTE.DEFINE_BLOCK.EDIT.PATH,
            component: DefineBlockForm,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_PACKAGE.LIST.TITLE,
        path: ROUTE.DEFINE_PACKAGE.LIST.PATH,
        component: DefinePackage,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_PACKAGE.CREATE.TITLE,
            path: ROUTE.DEFINE_PACKAGE.CREATE.PATH,
            component: DefinePackageForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_PACKAGE.DETAIL.TITLE,
            path: ROUTE.DEFINE_PACKAGE.DETAIL.PATH,
            component: DefinePackageDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_PACKAGE.EDIT.TITLE,
            path: ROUTE.DEFINE_PACKAGE.EDIT.PATH,
            component: DefinePackageForm,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
  {
    name: ROUTE.ORDER_MANAGEMENT.TITLE,
    isInSidebar: true,
    icon: 'home',
    subMenu: [
      {
        name: ROUTE.INVENTORY_CALENDAR.LIST.TITLE,
        path: ROUTE.INVENTORY_CALENDAR.LIST.PATH,
        component: InventoryCalendar,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.INVENTORY_CALENDAR.CREATE.TITLE,
            path: ROUTE.INVENTORY_CALENDAR.CREATE.PATH,
            component: InventoryCalendarForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.INVENTORY_CALENDAR.DETAIL.TITLE,
            path: ROUTE.INVENTORY_CALENDAR.DETAIL.PATH,
            component: InventoryCalendarDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.INVENTORY_CALENDAR.EDIT.TITLE,
            path: ROUTE.INVENTORY_CALENDAR.EDIT.PATH,
            component: InventoryCalendarForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.IMPORT_MANUFACTURING_ORDER.LIST.TITLE,
        path: ROUTE.IMPORT_MANUFACTURING_ORDER.LIST.PATH,
        component: ImportManufacturingOrder,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.IMPORT_MANUFACTURING_ORDER.CREATE.TITLE,
            path: ROUTE.IMPORT_MANUFACTURING_ORDER.CREATE.PATH,
            component: ImportManufacturingOrderForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.IMPORT_MANUFACTURING_ORDER.DETAIL.TITLE,
            path: ROUTE.IMPORT_MANUFACTURING_ORDER.DETAIL.PATH,
            component: ImportManufacturingOrderDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.IMPORT_MANUFACTURING_ORDER.EDIT.TITLE,
            path: ROUTE.IMPORT_MANUFACTURING_ORDER.EDIT.PATH,
            component: ImportManufacturingOrderForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.IMPORT_MANUFACTURING_ORDER.MOVEMENTS.TITLE,
            path: ROUTE.IMPORT_MANUFACTURING_ORDER.MOVEMENTS.PATH,
            component: ImportManufacturingOrderDetail,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.WAREHOUSE_TRANSFERS.LIST.TITLE,
        path: ROUTE.WAREHOUSE_TRANSFERS.LIST.PATH,
        component: warehouseTransfer,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.WAREHOUSE_TRANSFERS.CREATE.TITLE,
            path: ROUTE.WAREHOUSE_TRANSFERS.CREATE.PATH,
            component: warehouseTransferForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_TRANSFERS.EDIT.TITLE,
            path: ROUTE.WAREHOUSE_TRANSFERS.EDIT.PATH,
            component: warehouseTransferForm,
            isInSidebar: true,
          },
          {
            name: ROUTE.WAREHOUSE_TRANSFERS.DETAIL.TITLE,
            path: ROUTE.WAREHOUSE_TRANSFERS.DETAIL.PATH,
            component: warehouseTransferDetail,
            isInSidebar: true,
          },
        ],
      },
      {
        name: ROUTE.PRODUCTION_ORDER.LIST.TITLE,
        path: ROUTE.PRODUCTION_ORDER.LIST.PATH,
        component: ProductionOrder,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.PRODUCTION_ORDER.CREATE.TITLE,
            path: ROUTE.PRODUCTION_ORDER.CREATE.PATH,
            component: ProductionOrderForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.PRODUCTION_ORDER.DETAIL.TITLE,
            path: ROUTE.PRODUCTION_ORDER.DETAIL.PATH,
            component: ProductionOrderDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.PRODUCTION_ORDER.EDIT.TITLE,
            path: ROUTE.PRODUCTION_ORDER.EDIT.PATH,
            component: ProductionOrderForm,
            isInSidebar: false,
          },
        ],
      },
    ],
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
      {
        name: ROUTE.DEFINE_TEMPLATE_SHELF.LIST.TITLE,
        path: ROUTE.DEFINE_TEMPLATE_SHELF.LIST.PATH,
        component: DefineTemplateShelf,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_TEMPLATE_SHELF.CREATE.TITLE,
            path: ROUTE.DEFINE_TEMPLATE_SHELF.CREATE.PATH,
            component: DefineTemplateShelfForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_TEMPLATE_SHELF.DETAIL.TITLE,
            path: ROUTE.DEFINE_TEMPLATE_SHELF.DETAIL.PATH,
            component: DefineTemplateShelfDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_TEMPLATE_SHELF.EDIT.TITLE,
            path: ROUTE.DEFINE_TEMPLATE_SHELF.EDIT.PATH,
            component: DefineTemplateShelfForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.WAREHOUSE_AREA.LIST.TITLE,
        path: ROUTE.WAREHOUSE_AREA.LIST.PATH,
        component: WarehouseArea,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.WAREHOUSE_AREA.DETAIL.TITLE,
            path: ROUTE.WAREHOUSE_AREA.DETAIL.PATH,
            component: WarehouseAreaDetail,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
  {
    name: ROUTE.WAREHOUSE_IMPORT.LIST.TITLE,
    path: ROUTE.WAREHOUSE_IMPORT.LIST.PATH,
    component: WarehouseImport,
    icon: 'home',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.WAREHOUSE_IMPORT.DETAIL.TITLE,
        path: ROUTE.WAREHOUSE_IMPORT.DETAIL.PATH,
        component: WarehouseImportDetail,
        isInSidebar: false,
      },
    ],
  },
  {
    name: ROUTE.WAREHOUSE_EXPORT.LIST.TITLE,
    path: ROUTE.WAREHOUSE_EXPORT.LIST.PATH,
    component: WarehouseExport,
    icon: 'home',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.WAREHOUSE_EXPORT.DETAIL.TITLE,
        path: ROUTE.WAREHOUSE_EXPORT.DETAIL.PATH,
        component: WarehouseExportDetail,
        isInSidebar: false,
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
        name: ROUTE.INVENTORY.LIST.TITLE,
        path: ROUTE.INVENTORY.LIST.PATH,
        component: Inventory,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.INVENTORY.DETAIL.TITLE,
            path: ROUTE.INVENTORY.DETAIL.PATH,
            component: InventoryDetail,
            isInSidebar: true,
          },
        ],
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
    name: ROUTE.RENT_WAREHOUSE_COST_MANAGEMENT.TITLE,
    isInSidebar: true,
    icon: 'home',
    subMenu: [
      {
        name: ROUTE.TYPE_UNIT.LIST.TITLE,
        path: ROUTE.TYPE_UNIT.LIST.PATH,
        component: DefineTypeUnit,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.TYPE_UNIT.CREATE.TITLE,
            path: ROUTE.TYPE_UNIT.CREATE.PATH,
            component: DefineTypeUnitForm,
            isInSidebar: true,
          },
          {
            name: ROUTE.TYPE_UNIT.EDIT.TITLE,
            path: ROUTE.TYPE_UNIT.EDIT.PATH,
            component: DefineTypeUnitForm,
            isInSidebar: true,
          },
          {
            name: ROUTE.TYPE_UNIT.DETAIL.TITLE,
            path: ROUTE.TYPE_UNIT.DETAIL.PATH,
            component: DefineTypeUnitDetail,
            isInSidebar: true,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_CURRENCY_UNIT.LIST.TITLE,
        path: ROUTE.DEFINE_CURRENCY_UNIT.LIST.PATH,
        component: DefineCurrencyUnit,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_CURRENCY_UNIT.CREATE.TITLE,
            path: ROUTE.DEFINE_CURRENCY_UNIT.CREATE.PATH,
            component: DefineCurrencyUnitForm,
            isInSidebar: true,
          },
          {
            name: ROUTE.DEFINE_CURRENCY_UNIT.EDIT.TITLE,
            path: ROUTE.DEFINE_CURRENCY_UNIT.EDIT.PATH,
            component: DefineCurrencyUnitForm,
            isInSidebar: true,
          },
          {
            name: ROUTE.DEFINE_CURRENCY_UNIT.DETAIL.TITLE,
            path: ROUTE.DEFINE_CURRENCY_UNIT.DETAIL.PATH,
            component: DefineCurrencyUnitDetail,
            isInSidebar: true,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_VOUCHER.LIST.TITLE,
        path: ROUTE.DEFINE_VOUCHER.LIST.PATH,
        component: DefineVoucher,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_VOUCHER.CREATE.TITLE,
            path: ROUTE.DEFINE_VOUCHER.CREATE.PATH,
            component: DefineVoucherForm,
            isInSidebar: true,
          },
          {
            name: ROUTE.DEFINE_VOUCHER.EDIT.TITLE,
            path: ROUTE.DEFINE_VOUCHER.EDIT.PATH,
            component: DefineVoucherForm,
            isInSidebar: true,
          },
          {
            name: ROUTE.DEFINE_VOUCHER.DETAIL.TITLE,
            path: ROUTE.DEFINE_VOUCHER.DETAIL.PATH,
            component: DefineVoucherDetail,
            isInSidebar: true,
          },
        ],
      },
    ],
  },
  {
    name: ROUTE.PRODUCTION_INFORMATION_MANAGENMENT.TITLE,
    isInSidebar: true,
    icon: 'setting',
    subMenu: [
      {
        name: ROUTE.DEFINE_VENDEOR.LIST.TITLE,
        path: ROUTE.DEFINE_VENDEOR.LIST.PATH,
        component: DefineVendor,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_VENDEOR.CREATE.TITLE,
            path: ROUTE.DEFINE_VENDEOR.CREATE.PATH,
            component: DefineVendorForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_VENDEOR.EDIT.TITLE,
            path: ROUTE.DEFINE_VENDEOR.EDIT.PATH,
            component: DefineVendorForm,
            isInSidebar: true,
          },
          {
            name: ROUTE.DEFINE_VENDEOR.DETAIL.TITLE,
            path: ROUTE.DEFINE_VENDEOR.DETAIL.PATH,
            component: DefineVendorDetail,
            isInSidebar: true,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_CUSTOMER.LIST.TITLE,
        path: ROUTE.DEFINE_CUSTOMER.LIST.PATH,
        component: DefineCustomer,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_CUSTOMER.CREATE.TITLE,
            path: ROUTE.DEFINE_CUSTOMER.CREATE.PATH,
            component: DefineCustomerForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_CUSTOMER.EDIT.TITLE,
            path: ROUTE.DEFINE_CUSTOMER.EDIT.PATH,
            component: DefineCustomerForm,
            isInSidebar: true,
          },
          {
            name: ROUTE.DEFINE_CUSTOMER.DETAIL.TITLE,
            path: ROUTE.DEFINE_CUSTOMER.DETAIL.PATH,
            component: DefineCustomerDetail,
            isInSidebar: true,
          },
        ],
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
