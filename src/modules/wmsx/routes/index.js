import Dashboard from '~/modules/wmsx/features/dashboard'

import BusinessTypeManagementDetail from '../features/business-type-management/detail'
import BusinessTypeManagementForm from '../features/business-type-management/form'
import BussinessTypeManagement from '../features/business-type-management/list'
import CompanyManagementDetail from '../features/company-management/detail'
import CompanyManagementForm from '../features/company-management/form'
import CompanyManagement from '../features/company-management/list'
import ConstructionItemsManagementDetail from '../features/construction-items-management/detail'
import ConstructionItemsManagementForm from '../features/construction-items-management/form'
import ConstructionItemsManagement from '../features/construction-items-management/list'
import ConstructionManagementDetail from '../features/construction-management/detail'
import ConstructionManagementForm from '../features/construction-management/form'
import ConstructionManagement from '../features/construction-management/list'
import DefineAssemblyDetail from '../features/define-assembly/detail'
import DefineAssemblyForm from '../features/define-assembly/form'
import DefineAssembly from '../features/define-assembly/list'
import DefineBinDetail from '../features/define-bin/detail'
import DefineBinForm from '../features/define-bin/form'
import DefineBin from '../features/define-bin/list'
import DefineDrawerDetail from '../features/define-drawer/detail'
import DefineDrawerForm from '../features/define-drawer/form'
import DefineDrawer from '../features/define-drawer/list'
import DefineExpenditureOrgDetail from '../features/define-expenditure-org/detail'
import DefineExpenditureOrgForm from '../features/define-expenditure-org/form'
import DefineExpenditureOrg from '../features/define-expenditure-org/list'
import DefineExpenditureTypeDetail from '../features/define-expenditure-type/detail'
import DefineExpenditureTypeForm from '../features/define-expenditure-type/form'
import DefineExpenditureType from '../features/define-expenditure-type/list'
import DefineMaterialQualityDetail from '../features/define-material-quality/detail'
import DefineMaterialQualityForm from '../features/define-material-quality/form'
import DefineMaterialQuality from '../features/define-material-quality/list'
import DefineObjectCategoryDetail from '../features/define-object-category/detail'
import DefineObjectCategoryForm from '../features/define-object-category/form'
import DefineObjectCategory from '../features/define-object-category/list'
import DefineProducingCountryDetail from '../features/define-producing-country/detail'
import DefineProducingCountryForm from '../features/define-producing-country/form'
import DefineProducingCountry from '../features/define-producing-country/list'
import DefineShelfDetail from '../features/define-shelf/detail'
import DefineShelfForm from '../features/define-shelf/form'
import DefineShelf from '../features/define-shelf/list'
import DefineUomDetail from '../features/define-uom/detail'
import DefineUomForm from '../features/define-uom/form'
import DefineUom from '../features/define-uom/list'
import DefineVendorDetail from '../features/define-vendor/detail'
import DefineVendorForm from '../features/define-vendor/form'
import DefineVendor from '../features/define-vendor/list'
import DefineWarehouseGroupDetail from '../features/define-warehouse-group/detail'
import DefineWarehouseGroupForm from '../features/define-warehouse-group/form'
import DefineWarehouseGroup from '../features/define-warehouse-group/list'
import DefineWarehouseDetail from '../features/define-warehouse/detail'
import DefineWarehouseForm from '../features/define-warehouse/form'
import DefineWarehouse from '../features/define-warehouse/list'
import InventorySettingDetail from '../features/inventory-setting/detail'
import InventorySettingForm from '../features/inventory-setting/form'
import InventorySetting from '../features/inventory-setting/list'
import InventoryStatistics from '../features/inventory-statistics'
import LocationManagementDetail from '../features/location-management/detail'
import LocationManagementForm from '../features/location-management/form'
import LocationManagement from '../features/location-management/list'
import MaterialManagementDetail from '../features/material-management/detail'
import MaterialManagementForm from '../features/material-management/form'
import MaterialManagement from '../features/material-management/list'
import QrCode from '../features/qr-code'
import ReasonManagementDetail from '../features/reason-management/detail'
import ReasonManagementForm from '../features/reason-management/form'
import ReasonManagement from '../features/reason-management/list'
import ReceiptDepartmentManagementDetail from '../features/receipt-department-management/detail'
import ReceiptDepartmentManagementForm from '../features/receipt-department-management/form'
import ReceiptDepartmentManagement from '../features/receipt-department-management/list'
import SetStoragePeriodDetail from '../features/set-storage-period/detail'
import SetStoragePeriodForm from '../features/set-storage-period/form'
import SetStoragePeriod from '../features/set-storage-period/list'
import SourceManagementDetail from '../features/source-management/detail'
import SourceManagementForm from '../features/source-management/form'
import SourceManagement from '../features/source-management/list'
import UnitManagementDetail from '../features/unit-management/detail'
import UnitManagementForm from '../features/unit-management/form'
import UnitManagement from '../features/unit-management/list'
import WarehouseExportReceiptDetail from '../features/warehouse-export-receipt/detail'
import WarehouseExportReceiptForm from '../features/warehouse-export-receipt/form'
import WarehouseExportReceipt from '../features/warehouse-export-receipt/list'
import WarehouseExportDetail from '../features/warehouse-export/detail'
import WarehouseExport from '../features/warehouse-export/list'
import WarehouseImportReceiptDetail from '../features/warehouse-import-receipt/detail'
import WarehouseImportReceiptForm from '../features/warehouse-import-receipt/form'
import WarehouseImportReceipt from '../features/warehouse-import-receipt/list'
import WarehouseImportDetail from '../features/warehouse-import/detail'
import WarehouseImport from '../features/warehouse-import/list'
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
    name: ROUTE.DATABASE.TITLE,
    icon: 'database',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.COMPANY_MANAGEMENT.LIST.TITLE,
        path: ROUTE.COMPANY_MANAGEMENT.LIST.PATH,
        component: CompanyManagement,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.COMPANY_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.COMPANY_MANAGEMENT.CREATE.PATH,
            component: CompanyManagementForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.COMPANY_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.COMPANY_MANAGEMENT.DETAIL.PATH,
            component: CompanyManagementDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.COMPANY_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.COMPANY_MANAGEMENT.EDIT.PATH,
            component: CompanyManagementForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.UNIT_MANAGEMENT.LIST.TITLE,
        path: ROUTE.UNIT_MANAGEMENT.LIST.PATH,
        component: UnitManagement,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.UNIT_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.UNIT_MANAGEMENT.CREATE.PATH,
            component: UnitManagementForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.UNIT_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.UNIT_MANAGEMENT.DETAIL.PATH,
            component: UnitManagementDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.UNIT_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.UNIT_MANAGEMENT.EDIT.PATH,
            component: UnitManagementForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.LIST.TITLE,
        path: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.LIST.PATH,
        component: ReceiptDepartmentManagement,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.CREATE.PATH,
            component: ReceiptDepartmentManagementForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.DETAIL.PATH,
            component: ReceiptDepartmentManagementDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.EDIT.PATH,
            component: ReceiptDepartmentManagementForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_VENDOR.LIST.TITLE,
        path: ROUTE.DEFINE_VENDOR.LIST.PATH,
        component: DefineVendor,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_VENDOR.CREATE.TITLE,
            path: ROUTE.DEFINE_VENDOR.CREATE.PATH,
            component: DefineVendorForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_VENDOR.EDIT.TITLE,
            path: ROUTE.DEFINE_VENDOR.EDIT.PATH,
            component: DefineVendorForm,
            isInSidebar: true,
          },
          {
            name: ROUTE.DEFINE_VENDOR.DETAIL.TITLE,
            path: ROUTE.DEFINE_VENDOR.DETAIL.PATH,
            component: DefineVendorDetail,
            isInSidebar: true,
          },
        ],
      },
      {
        name: ROUTE.CONSTRUCTION_MANAGEMENT.LIST.TITLE,
        path: ROUTE.CONSTRUCTION_MANAGEMENT.LIST.PATH,
        component: ConstructionManagement,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.CONSTRUCTION_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.CONSTRUCTION_MANAGEMENT.CREATE.PATH,
            component: ConstructionManagementForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.CONSTRUCTION_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.CONSTRUCTION_MANAGEMENT.DETAIL.PATH,
            component: ConstructionManagementDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.CONSTRUCTION_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.CONSTRUCTION_MANAGEMENT.EDIT.PATH,
            component: ConstructionManagementForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.LIST.TITLE,
        path: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.LIST.PATH,
        component: ConstructionItemsManagement,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.CREATE.PATH,
            component: ConstructionItemsManagementForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.DETAIL.PATH,
            component: ConstructionItemsManagementDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.EDIT.PATH,
            component: ConstructionItemsManagementForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.SOURCE_MANAGEMENT.LIST.TITLE,
        path: ROUTE.SOURCE_MANAGEMENT.LIST.PATH,
        component: SourceManagement,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.SOURCE_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.SOURCE_MANAGEMENT.CREATE.PATH,
            component: SourceManagementForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.SOURCE_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.SOURCE_MANAGEMENT.DETAIL.PATH,
            component: SourceManagementDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.SOURCE_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.SOURCE_MANAGEMENT.EDIT.PATH,
            component: SourceManagementForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.REASON_MANAGEMENT.LIST.TITLE,
        path: ROUTE.REASON_MANAGEMENT.LIST.PATH,
        component: ReasonManagement,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.REASON_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.REASON_MANAGEMENT.CREATE.PATH,
            component: ReasonManagementForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.REASON_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.REASON_MANAGEMENT.DETAIL.PATH,
            component: ReasonManagementDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.REASON_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.REASON_MANAGEMENT.EDIT.PATH,
            component: ReasonManagementForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_UOM.LIST.TITLE,
        path: ROUTE.DEFINE_UOM.LIST.PATH,
        component: DefineUom,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_UOM.CREATE.TITLE,
            path: ROUTE.DEFINE_UOM.CREATE.PATH,
            component: DefineUomForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_UOM.DETAIL.TITLE,
            path: ROUTE.DEFINE_UOM.DETAIL.PATH,
            component: DefineUomDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_UOM.EDIT.TITLE,
            path: ROUTE.DEFINE_UOM.EDIT.PATH,
            component: DefineUomForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_OBJECT_CATEGORY.LIST.TITLE,
        path: ROUTE.DEFINE_OBJECT_CATEGORY.LIST.PATH,
        component: DefineObjectCategory,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_OBJECT_CATEGORY.CREATE.TITLE,
            path: ROUTE.DEFINE_OBJECT_CATEGORY.CREATE.PATH,
            component: DefineObjectCategoryForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_OBJECT_CATEGORY.DETAIL.TITLE,
            path: ROUTE.DEFINE_OBJECT_CATEGORY.DETAIL.PATH,
            component: DefineObjectCategoryDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_OBJECT_CATEGORY.EDIT.TITLE,
            path: ROUTE.DEFINE_OBJECT_CATEGORY.EDIT.PATH,
            component: DefineObjectCategoryForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_MATERIAL_CATEGORY.LIST.TITLE,
        path: ROUTE.DEFINE_MATERIAL_CATEGORY.LIST.PATH,
        component: () => null,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_MATERIAL_CATEGORY.CREATE.TITLE,
            path: ROUTE.DEFINE_MATERIAL_CATEGORY.CREATE.PATH,
            component: () => null,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_MATERIAL_CATEGORY.DETAIL.TITLE,
            path: ROUTE.DEFINE_MATERIAL_CATEGORY.DETAIL.PATH,
            component: () => null,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_MATERIAL_CATEGORY.EDIT.TITLE,
            path: ROUTE.DEFINE_MATERIAL_CATEGORY.EDIT.PATH,
            component: () => null,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_MATERIAL_QUALITY.LIST.TITLE,
        path: ROUTE.DEFINE_MATERIAL_QUALITY.LIST.PATH,
        component: DefineMaterialQuality,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_MATERIAL_QUALITY.CREATE.TITLE,
            path: ROUTE.DEFINE_MATERIAL_QUALITY.CREATE.PATH,
            component: DefineMaterialQualityForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_MATERIAL_QUALITY.DETAIL.TITLE,
            path: ROUTE.DEFINE_MATERIAL_QUALITY.DETAIL.PATH,
            component: DefineMaterialQualityDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_MATERIAL_QUALITY.EDIT.TITLE,
            path: ROUTE.DEFINE_MATERIAL_QUALITY.EDIT.PATH,
            component: DefineMaterialQualityForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_PRODUCING_COUNTRY.LIST.TITLE,
        path: ROUTE.DEFINE_PRODUCING_COUNTRY.LIST.PATH,
        component: DefineProducingCountry,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_PRODUCING_COUNTRY.CREATE.TITLE,
            path: ROUTE.DEFINE_PRODUCING_COUNTRY.CREATE.PATH,
            component: DefineProducingCountryForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_PRODUCING_COUNTRY.DETAIL.TITLE,
            path: ROUTE.DEFINE_PRODUCING_COUNTRY.DETAIL.PATH,
            component: DefineProducingCountryDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_PRODUCING_COUNTRY.EDIT.TITLE,
            path: ROUTE.DEFINE_PRODUCING_COUNTRY.EDIT.PATH,
            component: DefineProducingCountryForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_EXPENDITURE_ORG.LIST.TITLE,
        path: ROUTE.DEFINE_EXPENDITURE_ORG.LIST.PATH,
        component: DefineExpenditureOrg,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_EXPENDITURE_ORG.CREATE.TITLE,
            path: ROUTE.DEFINE_EXPENDITURE_ORG.CREATE.PATH,
            component: DefineExpenditureOrgForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_EXPENDITURE_ORG.DETAIL.TITLE,
            path: ROUTE.DEFINE_EXPENDITURE_ORG.DETAIL.PATH,
            component: DefineExpenditureOrgDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_EXPENDITURE_ORG.EDIT.TITLE,
            path: ROUTE.DEFINE_EXPENDITURE_ORG.EDIT.PATH,
            component: DefineExpenditureOrgForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_EXPENDITURE_TYPE.LIST.TITLE,
        path: ROUTE.DEFINE_EXPENDITURE_TYPE.LIST.PATH,
        component: DefineExpenditureType,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_EXPENDITURE_TYPE.CREATE.TITLE,
            path: ROUTE.DEFINE_EXPENDITURE_TYPE.CREATE.PATH,
            component: DefineExpenditureTypeForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_EXPENDITURE_TYPE.DETAIL.TITLE,
            path: ROUTE.DEFINE_EXPENDITURE_TYPE.DETAIL.PATH,
            component: DefineExpenditureTypeDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_EXPENDITURE_TYPE.EDIT.TITLE,
            path: ROUTE.DEFINE_EXPENDITURE_TYPE.EDIT.PATH,
            component: DefineExpenditureTypeForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.BUSINESS_TYPE_MANAGEMENT.LIST.TITLE,
        path: ROUTE.BUSINESS_TYPE_MANAGEMENT.LIST.PATH,
        component: BussinessTypeManagement,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.BUSINESS_TYPE_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.BUSINESS_TYPE_MANAGEMENT.CREATE.PATH,
            component: BusinessTypeManagementForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.BUSINESS_TYPE_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.BUSINESS_TYPE_MANAGEMENT.DETAIL.PATH,
            component: BusinessTypeManagementDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.BUSINESS_TYPE_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.BUSINESS_TYPE_MANAGEMENT.EDIT.PATH,
            component: BusinessTypeManagementForm,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
  {
    name: ROUTE.WAREHOUSE_MANAGEMENT.TITLE,
    icon: 'database',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.DEFINE_WAREHOUSE.LIST.TITLE,
        path: ROUTE.DEFINE_WAREHOUSE.LIST.PATH,
        component: DefineWarehouse,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_WAREHOUSE.CREATE.TITLE,
            path: ROUTE.DEFINE_WAREHOUSE.CREATE.PATH,
            component: DefineWarehouseForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_WAREHOUSE.EDIT.TITLE,
            path: ROUTE.DEFINE_WAREHOUSE.EDIT.PATH,
            component: DefineWarehouseForm,
            isInSidebar: true,
          },
          {
            name: ROUTE.DEFINE_WAREHOUSE.DETAIL.TITLE,
            path: ROUTE.DEFINE_WAREHOUSE.DETAIL.PATH,
            component: DefineWarehouseDetail,
            isInSidebar: true,
          },
        ],
      },
      {
        name: ROUTE.LOCATION_MANAGEMENT.LIST.TITLE,
        path: ROUTE.LOCATION_MANAGEMENT.LIST.PATH,
        component: LocationManagement,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.LOCATION_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.LOCATION_MANAGEMENT.CREATE.PATH,
            component: LocationManagementForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.LOCATION_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.LOCATION_MANAGEMENT.EDIT.PATH,
            component: LocationManagementForm,
            isInSidebar: true,
          },
          {
            name: ROUTE.LOCATION_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.LOCATION_MANAGEMENT.DETAIL.PATH,
            component: LocationManagementDetail,
            isInSidebar: true,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_WAREHOUSE_GROUP.LIST.TITLE,
        path: ROUTE.DEFINE_WAREHOUSE_GROUP.LIST.PATH,
        component: DefineWarehouseGroup,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_WAREHOUSE_GROUP.CREATE.TITLE,
            path: ROUTE.DEFINE_WAREHOUSE_GROUP.CREATE.PATH,
            component: DefineWarehouseGroupForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_WAREHOUSE_GROUP.EDIT.TITLE,
            path: ROUTE.DEFINE_WAREHOUSE_GROUP.EDIT.PATH,
            component: DefineWarehouseGroupForm,
            isInSidebar: true,
          },
          {
            name: ROUTE.DEFINE_WAREHOUSE_GROUP.DETAIL.TITLE,
            path: ROUTE.DEFINE_WAREHOUSE_GROUP.DETAIL.PATH,
            component: DefineWarehouseGroupDetail,
            isInSidebar: true,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_ASSEMBLY.LIST.TITLE,
        path: ROUTE.DEFINE_ASSEMBLY.LIST.PATH,
        component: DefineAssembly,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_ASSEMBLY.CREATE.TITLE,
            path: ROUTE.DEFINE_ASSEMBLY.CREATE.PATH,
            component: DefineAssemblyForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_ASSEMBLY.EDIT.TITLE,
            path: ROUTE.DEFINE_ASSEMBLY.EDIT.PATH,
            component: DefineAssemblyForm,
            isInSidebar: true,
          },
          {
            name: ROUTE.DEFINE_ASSEMBLY.DETAIL.TITLE,
            path: ROUTE.DEFINE_ASSEMBLY.DETAIL.PATH,
            component: DefineAssemblyDetail,
            isInSidebar: true,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_SHELF.LIST.TITLE,
        path: ROUTE.DEFINE_SHELF.LIST.PATH,
        component: DefineShelf,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_SHELF.CREATE.TITLE,
            path: ROUTE.DEFINE_SHELF.CREATE.PATH,
            component: DefineShelfForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_SHELF.EDIT.TITLE,
            path: ROUTE.DEFINE_SHELF.EDIT.PATH,
            component: DefineShelfForm,
            isInSidebar: true,
          },
          {
            name: ROUTE.DEFINE_SHELF.DETAIL.TITLE,
            path: ROUTE.DEFINE_SHELF.DETAIL.PATH,
            component: DefineShelfDetail,
            isInSidebar: true,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_DRAWER.LIST.TITLE,
        path: ROUTE.DEFINE_DRAWER.LIST.PATH,
        component: DefineDrawer,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_DRAWER.CREATE.TITLE,
            path: ROUTE.DEFINE_DRAWER.CREATE.PATH,
            component: DefineDrawerForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_DRAWER.EDIT.TITLE,
            path: ROUTE.DEFINE_DRAWER.EDIT.PATH,
            component: DefineDrawerForm,
            isInSidebar: true,
          },
          {
            name: ROUTE.DEFINE_DRAWER.DETAIL.TITLE,
            path: ROUTE.DEFINE_DRAWER.DETAIL.PATH,
            component: DefineDrawerDetail,
            isInSidebar: true,
          },
        ],
      },

      {
        name: ROUTE.DEFINE_BIN.LIST.TITLE,
        path: ROUTE.DEFINE_BIN.LIST.PATH,
        component: DefineBin,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_BIN.CREATE.TITLE,
            path: ROUTE.DEFINE_BIN.CREATE.PATH,
            component: DefineBinForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_BIN.EDIT.TITLE,
            path: ROUTE.DEFINE_BIN.EDIT.PATH,
            component: DefineBinForm,
            isInSidebar: true,
          },
          {
            name: ROUTE.DEFINE_BIN.DETAIL.TITLE,
            path: ROUTE.DEFINE_BIN.DETAIL.PATH,
            component: DefineBinDetail,
            isInSidebar: true,
          },
        ],
      },
      {
        name: ROUTE.SET_STORAGE_PERIOD.LIST.TITLE,
        path: ROUTE.SET_STORAGE_PERIOD.LIST.PATH,
        component: SetStoragePeriod,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.SET_STORAGE_PERIOD.CREATE.TITLE,
            path: ROUTE.SET_STORAGE_PERIOD.CREATE.PATH,
            component: SetStoragePeriodForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.SET_STORAGE_PERIOD.DETAIL.TITLE,
            path: ROUTE.SET_STORAGE_PERIOD.DETAIL.PATH,
            component: SetStoragePeriodDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.SET_STORAGE_PERIOD.EDIT.TITLE,
            path: ROUTE.SET_STORAGE_PERIOD.EDIT.PATH,
            component: SetStoragePeriodForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.INVENTORY_SETTING.LIST.TITLE,
        path: ROUTE.INVENTORY_SETTING.LIST.PATH,
        component: InventorySetting,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.INVENTORY_SETTING.CREATE.TITLE,
            path: ROUTE.INVENTORY_SETTING.CREATE.PATH,
            component: InventorySettingForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.INVENTORY_SETTING.DETAIL.TITLE,
            path: ROUTE.INVENTORY_SETTING.DETAIL.PATH,
            component: InventorySettingDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.INVENTORY_SETTING.EDIT.TITLE,
            path: ROUTE.INVENTORY_SETTING.EDIT.PATH,
            component: InventorySettingForm,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
  {
    name: ROUTE.MATERIAL_MANAGEMENT.LIST.TITLE,
    icon: 'database',
    path: ROUTE.MATERIAL_MANAGEMENT.LIST.PATH,
    component: MaterialManagement,
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.MATERIAL_MANAGEMENT.CREATE.TITLE,
        path: ROUTE.MATERIAL_MANAGEMENT.CREATE.PATH,
        component: MaterialManagementForm,
        isInSidebar: false,
      },
      {
        name: ROUTE.MATERIAL_MANAGEMENT.DETAIL.TITLE,
        path: ROUTE.MATERIAL_MANAGEMENT.DETAIL.PATH,
        component: MaterialManagementDetail,
        isInSidebar: false,
      },
      {
        name: ROUTE.MATERIAL_MANAGEMENT.EDIT_WAREHOUSE_SOURCE.TITLE,
        path: ROUTE.MATERIAL_MANAGEMENT.EDIT_WAREHOUSE_SOURCE.PATH,
        component: MaterialManagementDetail,
        isInSidebar: false,
      },
      {
        name: ROUTE.MATERIAL_MANAGEMENT.EDIT.TITLE,
        path: ROUTE.MATERIAL_MANAGEMENT.EDIT.PATH,
        component: MaterialManagementForm,
        isInSidebar: false,
      },
    ],
  },
  {
    name: ROUTE.RECEIPT_MANAGEMENT.TITLE,
    icon: 'database',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.TITLE,
        path: ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.PATH,
        component: WarehouseImportReceipt,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.WAREHOUSE_IMPORT_RECEIPT.CREATE.TITLE,
            path: ROUTE.WAREHOUSE_IMPORT_RECEIPT.CREATE.PATH,
            component: WarehouseImportReceiptForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_IMPORT_RECEIPT.DETAIL.TITLE,
            path: ROUTE.WAREHOUSE_IMPORT_RECEIPT.DETAIL.PATH,
            component: WarehouseImportReceiptDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_IMPORT_RECEIPT.EDIT.TITLE,
            path: ROUTE.WAREHOUSE_IMPORT_RECEIPT.EDIT.PATH,
            component: WarehouseImportReceiptForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.TITLE,
        path: ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.PATH,
        component: WarehouseExportReceipt,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.WAREHOUSE_EXPORT_RECEIPT.CREATE.TITLE,
            path: ROUTE.WAREHOUSE_EXPORT_RECEIPT.CREATE.PATH,
            component: WarehouseExportReceiptForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_EXPORT_RECEIPT.DETAIL.TITLE,
            path: ROUTE.WAREHOUSE_EXPORT_RECEIPT.DETAIL.PATH,
            component: WarehouseExportReceiptDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.WAREHOUSE_EXPORT_RECEIPT.EDIT.TITLE,
            path: ROUTE.WAREHOUSE_EXPORT_RECEIPT.EDIT.PATH,
            component: WarehouseExportReceiptForm,
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
    icon: 'key',
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
    icon: 'export',
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
    name: ROUTE.WAREHOUSE_REPORT_MANAGEMENT.TITLE,
    icon: 'keylock',
    isInSidebar: true,
    subMenu: [
      {
        path: ROUTE.INVENTORY_STATISTICS.PATH,
        name: ROUTE.INVENTORY_STATISTICS.TITLE,
        component: InventoryStatistics,
        isInSidebar: true,
      },
      {
        path: ROUTE.INVENTORY_WARNING.PATH,
        name: ROUTE.INVENTORY_WARNING.TITLE,
        // component: InventoryWarning,
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
        name: ROUTE.QR_CODE.TITLE,
        path: ROUTE.QR_CODE.PATH,
        component: QrCode,
        isInSidebar: true,
      },
    ],
  },
]

export default routes
