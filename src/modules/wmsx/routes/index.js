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
import DefineMaterialQualityDetail from '../features/define-material-quality/detail'
import DefineMaterialQualityForm from '../features/define-material-quality/form'
import DefineMaterialQuality from '../features/define-material-quality/list'
import DefineObjectCategoryDetail from '../features/define-object-category/detail'
import DefineObjectCategoryForm from '../features/define-object-category/form'
import DefineObjectCategory from '../features/define-object-category/list'
import DefineProducingCountryDetail from '../features/define-producing-country/detail'
import DefineProducingCountryForm from '../features/define-producing-country/form'
import DefineProducingCountry from '../features/define-producing-country/list'
import DefineUomDetail from '../features/define-uom/detail'
import DefineUomForm from '../features/define-uom/form'
import DefineUom from '../features/define-uom/list'
import DefineVendorDetail from '../features/define-vendor/detail'
import DefineVendorForm from '../features/define-vendor/form'
import DefineVendor from '../features/define-vendor/list'
import ReasonManagementDetail from '../features/reason-management/detail'
import ReasonManagementForm from '../features/reason-management/form'
import ReasonManagement from '../features/reason-management/list'
import ReceiptDepartmentManagementDetail from '../features/receipt-department-management/detail'
import ReceiptDepartmentManagementForm from '../features/receipt-department-management/form'
import ReceiptDepartmentManagement from '../features/receipt-department-management/list'
import SourceManagementDetail from '../features/source-management/detail'
import SourceManagementForm from '../features/source-management/form'
import SourceManagement from '../features/source-management/list'
import UnitManagementDetail from '../features/unit-management/detail'
import UnitManagementForm from '../features/unit-management/form'
import UnitManagement from '../features/unit-management/list'
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
]

export default routes
