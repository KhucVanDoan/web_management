import { all } from 'redux-saga/effects'

import watchCreateCompany from './define-company/create-company'
import watchDeleteCompany from './define-company/delete-company'
import watchGetCompanyDetails from './define-company/get-company-details'
import watchSearchCompanies from './define-company/search-companies'
import watchUpdateCompany from './define-company/update-company'
import watchCreateItem from './define-item/create-item'
import watchDeleteItem from './define-item/delete-item'
import watchGetItemDetails from './define-item/get-item-details'
import watchPrintQRItems from './define-item/print-qr-items'
import watchSearchItems from './define-item/search-items'
import watchUpdateItem from './define-item/update-item'
import watchCreateFactory from './factory/create-factory'
import watchDeleteFactory from './factory/delete-factory'
import watchGetFactoryDetails from './factory/get-factory-details'
import watchSearchFactories from './factory/search-factories'
import watchUpdateFactory from './factory/update-factory'
import watchCreateItemGroup from './item-group-setting/create-item-group'
import watchDeleteItemGroup from './item-group-setting/delete-item-group'
import watchGetItemGroupDetails from './item-group-setting/get-item-group-details'
import watchSearchItemGroups from './item-group-setting/search-item-groups'
import watchUpdateItemGroup from './item-group-setting/update-item-group'
import watchCreateItemType from './item-type-setting/create-item-type'
import watchDeleteItemType from './item-type-setting/delete-item-type'
import watchGetItemTypeDetails from './item-type-setting/get-item-type-details'
import watchSearchItemTypes from './item-type-setting/search-item-types'
import watchUpdateItemType from './item-type-setting/update-item-type'
import watchCreateItemUnit from './item-unit-setting/create-item-unit'
import watchDeleteItemUnit from './item-unit-setting/delete-item-unit'
import watchGetItemUnitDetails from './item-unit-setting/get-item-unit-details'
import watchSearchItemUnits from './item-unit-setting/search-item-units'
import watchUpdateItemUnit from './item-unit-setting/update-item-unit'
import watchConfirmPurchasedOrder from './purchased-order/confirm-purchased-order'
import watchCreatePurchasedOrder from './purchased-order/create-purchased-order'
import watchDeletePurchasedOrder from './purchased-order/delete-purchased-order'
import watchGetPurchasedOrderDetails from './purchased-order/get-purchased-order-details'
import watchGetPurchasedOrderNotCreatePOimp from './purchased-order/get-purchased-order-not-poimp'
import watchRejectPurchasedOrder from './purchased-order/reject-purchased-order'
import watchSearchPurchasedOrders from './purchased-order/search-purchased-order'
import watchUpdatePurchasedOrder from './purchased-order/update-purchased-order'
import watchConfirmSaleOrder from './sale-order/confirm-sale-order'
import watchCreateSaleOrder from './sale-order/create-sale-order'
import watchDeleteSaleOrder from './sale-order/delete-sale-order'
import watchSaleOrderDetailByIds from './sale-order/get-sale-order-detail_by_ids'
import watchGetSaleOrderDetails from './sale-order/get-sale-order-details'
import watchRejectSaleOrder from './sale-order/reject-sale-order'
import watchSearchSaleOrders from './sale-order/search-sale-orders'
import watchUpdateSaleOrder from './sale-order/update-sale-order'

/**
 * Root saga
 */
export default function* sagas() {
  yield all([
    // item-group-setting
    watchSearchItemGroups(),
    watchCreateItemGroup(),
    watchUpdateItemGroup(),
    watchDeleteItemGroup(),
    watchGetItemGroupDetails(),

    // item-type-setting
    watchSearchItemTypes(),
    watchCreateItemType(),
    watchUpdateItemType(),
    watchDeleteItemType(),
    watchGetItemTypeDetails(),

    // item-unit-setting
    watchSearchItemUnits(),
    watchCreateItemUnit(),
    watchUpdateItemUnit(),
    watchDeleteItemUnit(),
    watchGetItemUnitDetails(),

    // define-item
    watchSearchItems(),
    watchCreateItem(),
    watchUpdateItem(),
    watchDeleteItem(),
    watchGetItemDetails(),
    watchPrintQRItems(),

    //define-company
    watchSearchCompanies(),
    watchCreateCompany(),
    watchUpdateCompany(),
    watchGetCompanyDetails(),
    watchDeleteCompany(),

    // factory
    watchSearchFactories(),
    watchCreateFactory(),
    watchUpdateFactory(),
    watchDeleteFactory(),
    watchGetFactoryDetails(),
    // sale-order
    watchSearchSaleOrders(),
    watchCreateSaleOrder(),
    watchUpdateSaleOrder(),
    watchDeleteSaleOrder(),
    watchGetSaleOrderDetails(),
    watchConfirmSaleOrder(),
    watchRejectSaleOrder(),
    watchSaleOrderDetailByIds(),

    // purchased-order
    watchSearchPurchasedOrders(),
    watchCreatePurchasedOrder(),
    watchUpdatePurchasedOrder(),
    watchDeletePurchasedOrder(),
    watchGetPurchasedOrderDetails(),
    watchConfirmPurchasedOrder(),
    watchRejectPurchasedOrder(),
    watchGetPurchasedOrderNotCreatePOimp(),
  ])
}
