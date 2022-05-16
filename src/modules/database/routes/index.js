import DefineCompany from '~/modules/database/features/define-company'
import DefineCompanyDetail from '~/modules/database/features/define-company/company-detail'
import DefineCompanyForm from '~/modules/database/features/define-company/company-form'
import DefineFactory from '~/modules/database/features/define-factory'
import DefineFactoryDetail from '~/modules/database/features/define-factory/factory-detail'
import DefineFactoryForm from '~/modules/database/features/define-factory/factory-form'
import DefineItem from '~/modules/database/features/define-item'
import DefineItemDetail from '~/modules/database/features/define-item/item-detail'
import DefineItemForm from '~/modules/database/features/define-item/item-form'
import ItemGroupSetting from '~/modules/database/features/item-group-setting'
import ItemGroupDetail from '~/modules/database/features/item-group-setting/item-group-detail'
import ItemGroupForm from '~/modules/database/features/item-group-setting/item-group-form'
import ItemTypeSetting from '~/modules/database/features/item-type-setting'
import ItemTypeDetail from '~/modules/database/features/item-type-setting/item-type-detail'
import ItemTypeForm from '~/modules/database/features/item-type-setting/item-type-form'
import ItemUnitSetting from '~/modules/database/features/item-unit-setting'
import ItemUnitDetail from '~/modules/database/features/item-unit-setting/item-unit-detail'
import ItemUnitForm from '~/modules/database/features/item-unit-setting/item-unit-form'
import SaleOrderDetail from '~/modules/database/features/sale-order/detail'
import SaleOrderForm from '~/modules/database/features/sale-order/form'
import SaleOrder from '~/modules/database/features/sale-order/list'

import { ROUTE } from './config'

const routes = [
  {
    name: ROUTE.DATABASE.TITLE,
    icon: 'database',
    path: ROUTE.DATABASE.PATH,
    component: ItemGroupSetting,
    isInSidebar: false,
  },
  {
    name: ROUTE.ITEM_GROUP.LIST.TITLE,
    path: ROUTE.ITEM_GROUP.LIST.PATH,
    component: ItemGroupSetting,
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.ITEM_GROUP.CREATE.TITLE,
        path: ROUTE.ITEM_GROUP.CREATE.PATH,
        component: ItemGroupForm,
        isInSidebar: false,
      },
      {
        name: ROUTE.ITEM_GROUP.DETAIL.TITLE,
        path: ROUTE.ITEM_GROUP.DETAIL.PATH,
        component: ItemGroupDetail,
        isInSidebar: false,
      },
      {
        name: ROUTE.ITEM_GROUP.EDIT.TITLE,
        path: ROUTE.ITEM_GROUP.EDIT.PATH,
        component: ItemGroupForm,
        isInSidebar: false,
      },
    ],
  },
  {
    name: ROUTE.ITEM_TYPE.LIST.TITLE,
    path: ROUTE.ITEM_TYPE.LIST.PATH,
    component: ItemTypeSetting,
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.ITEM_TYPE.CREATE.TITLE,
        path: ROUTE.ITEM_TYPE.CREATE.PATH,
        component: ItemTypeForm,
        isInSidebar: false,
      },
      {
        name: ROUTE.ITEM_TYPE.EDIT.TITLE,
        path: ROUTE.ITEM_TYPE.EDIT.PATH,
        component: ItemTypeForm,
        isInSidebar: false,
      },
      {
        name: ROUTE.ITEM_TYPE.DETAIL.TITLE,
        path: ROUTE.ITEM_TYPE.DETAIL.PATH,
        component: ItemTypeDetail,
        isInSidebar: false,
      },
    ],
  },
  {
    name: ROUTE.ITEM_UNIT.LIST.TITLE,
    path: ROUTE.ITEM_UNIT.LIST.PATH,
    component: ItemUnitSetting,
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.ITEM_UNIT.CREATE.TITLE,
        path: ROUTE.ITEM_UNIT.CREATE.PATH,
        component: ItemUnitForm,
        isInSidebar: false,
      },
      {
        name: ROUTE.ITEM_UNIT.DETAIL.TITLE,
        path: ROUTE.ITEM_UNIT.DETAIL.PATH,
        component: ItemUnitDetail,
        isInSidebar: false,
      },
      {
        name: ROUTE.ITEM_UNIT.EDIT.TITLE,
        path: ROUTE.ITEM_UNIT.EDIT.PATH,
        component: ItemUnitForm,
        isInSidebar: false,
      },
    ],
  },
  {
    name: ROUTE.DEFINE_ITEM.LIST.TITLE,
    path: ROUTE.DEFINE_ITEM.LIST.PATH,
    component: DefineItem,
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.DEFINE_ITEM.CREATE.TITLE,
        path: ROUTE.DEFINE_ITEM.CREATE.PATH,
        component: DefineItemForm,
        isInSidebar: false,
      },
      {
        name: ROUTE.DEFINE_ITEM.EDIT.TITLE,
        path: ROUTE.DEFINE_ITEM.EDIT.PATH,
        component: DefineItemForm,
        isInSidebar: false,
      },
      {
        name: ROUTE.DEFINE_ITEM.DETAIL.TITLE,
        path: ROUTE.DEFINE_ITEM.DETAIL.PATH,
        component: DefineItemDetail,
        isInSidebar: false,
      },
    ],
  },
  {
    name: ROUTE.DEFINE_COMPANY.LIST.TITLE,
    path: ROUTE.DEFINE_COMPANY.LIST.PATH,
    component: DefineCompany,
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.DEFINE_COMPANY.CREATE.TITLE,
        path: ROUTE.DEFINE_COMPANY.CREATE.PATH,
        component: DefineCompanyForm,
        isInSidebar: false,
      },
      {
        name: ROUTE.DEFINE_COMPANY.DETAIL.TITLE,
        path: ROUTE.DEFINE_COMPANY.DETAIL.PATH,
        component: DefineCompanyDetail,
        isInSidebar: false,
      },
      {
        name: ROUTE.DEFINE_COMPANY.EDIT.TITLE,
        path: ROUTE.DEFINE_COMPANY.EDIT.PATH,
        component: DefineCompanyForm,
        isInSidebar: false,
      },
    ],
  },
  {
    name: ROUTE.DEFINE_FACTORY.LIST.TITLE,
    path: ROUTE.DEFINE_FACTORY.LIST.PATH,
    component: DefineFactory,
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.DEFINE_FACTORY.CREATE.TITLE,
        path: ROUTE.DEFINE_FACTORY.CREATE.PATH,
        component: DefineFactoryForm,
        isInSidebar: false,
      },
      {
        name: ROUTE.DEFINE_FACTORY.DETAIL.TITLE,
        path: ROUTE.DEFINE_FACTORY.DETAIL.PATH,
        component: DefineFactoryDetail,
        isInSidebar: false,
      },
      {
        name: ROUTE.DEFINE_FACTORY.EDIT.TITLE,
        path: ROUTE.DEFINE_FACTORY.EDIT.PATH,
        component: DefineFactoryForm,
        isInSidebar: false,
      },
    ],
  },
  {
    name: ROUTE.SALE_ORDER.LIST.TITLE,
    path: ROUTE.SALE_ORDER.LIST.PATH,
    component: SaleOrder,
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.SALE_ORDER.CREATE.TITLE,
        path: ROUTE.SALE_ORDER.CREATE.PATH,
        component: SaleOrderForm,
        isInSidebar: false,
      },
      {
        name: ROUTE.SALE_ORDER.DETAILS.TITLE,
        path: ROUTE.SALE_ORDER.DETAILS.PATH,
        component: SaleOrderDetail,
        isInSidebar: false,
      },
      {
        name: ROUTE.SALE_ORDER.EDIT.TITLE,
        path: ROUTE.SALE_ORDER.EDIT.PATH,
        component: SaleOrderForm,
        isInSidebar: false,
      },
    ],
  },
]

export default routes
