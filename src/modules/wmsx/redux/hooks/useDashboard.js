import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import dashboardActions from '../actions/dashboard'

export const useDashboard = () => {
  const data = useSelector((state) => get(state, 'wmsx.dashboard'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(dashboardActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export const useDashboardItemSummaryReport = () => {
  const data = useSelector((state) =>
    get(state, 'wmsx.dashboard.itemSummaryReport'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(dashboardActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}
export const useDashboardOtherItemSummaryReport = () => {
  const data = useSelector((state) =>
    get(state, 'wmsx.dashboard.otherItemSummaryReport'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(dashboardActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export const useDashboardTotalItemSummaryReport = () => {
  const data = useSelector((state) =>
    get(state, 'wmsx.dashboard.totalItemSummaryReport'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(dashboardActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export const useDashboardTransferReport = () => {
  const data = useSelector((state) =>
    get(state, 'wmsx.dashboard.transferReport'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(dashboardActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export const useDashboardItemStockReport = () => {
  const data = useSelector((state) =>
    get(state, 'wmsx.dashboard.itemStockReport'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(dashboardActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export const useDashboardItemGroupStockSummary = () => {
  const data = useSelector((state) =>
    get(state, 'wmsx.dashboard.itemGroupStockSummary'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(dashboardActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export const useDashboardGapInStock = () => {
  const data = useSelector((state) => get(state, 'wmsx.dashboard.gapInStock'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(dashboardActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export const useDashboardMovementReport = () => {
  const data = useSelector((state) =>
    get(state, 'wmsx.dashboard.movementReport'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(dashboardActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export const useDashboardPurchasedOrderImports = () => {
  const data = useSelector((state) =>
    get(state, 'wmsx.dashboard.purchasedOrderImports'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(dashboardActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export const useDashboardSaleOrderExports = () => {
  const data = useSelector((state) =>
    get(state, 'wmsx.dashboard.saleOrderExports'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(dashboardActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}
export const useDashboardItemStockHistory = () => {
  const data = useSelector((state) =>
    get(state, 'wmsx.dashboard.itemStockHistories'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(dashboardActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}
