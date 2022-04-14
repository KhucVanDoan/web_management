import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import dashboardActions from '../actions/dashboard'

export const useDashboard = () => {
  const data = useSelector((state) => get(state, 'qmsx.dashboard'))

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

export const useDashboardSummary = () => {
  const data = useSelector((state) => get(state, 'qmsx.dashboard.summary'))

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

export const useDashboardInputQuality = () => {
  const data = useSelector((state) => get(state, 'qmsx.dashboard.inputQuality'))

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

export const useDashboardOutputQuality = () => {
  const data = useSelector((state) =>
    get(state, 'qmsx.dashboard.outputQuality'),
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

export const useDashboardProductionInputQualityProductPrevious = () => {
  const data = useSelector((state) =>
    get(state, 'qmsx.dashboard.productionInputQualityProductPrevious'),
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

export const useDashboardProductionInputQualityMaterial = () => {
  const data = useSelector((state) =>
    get(state, 'qmsx.dashboard.productionInputQualityMaterial'),
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

export const useDashboardProductionOutputQuality = () => {
  const data = useSelector((state) =>
    get(state, 'qmsx.dashboard.productionOutputQuality'),
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

export const useDashboardQcProgress = () => {
  const data = useSelector((state) => get(state, 'qmsx.dashboard.qcProgress'))

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

export const useDashboardMo = () => {
  const data = useSelector((state) => get(state, 'qmsx.dashboard.moList'))

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

export const useDashboardErrorGroup = () => {
  const data = useSelector((state) =>
    get(state, 'qmsx.dashboard.errorGroupList'),
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

export const useDashboardCauseGroup = () => {
  const data = useSelector((state) =>
    get(state, 'qmsx.dashboard.causeGroupList'),
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

export const useDashboardActionGroup = () => {
  const data = useSelector((state) =>
    get(state, 'qmsx.dashboard.actionGroupList'),
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

export const useDashboardErrorReportStatus = () => {
  const data = useSelector((state) =>
    get(state, 'qmsx.dashboard.errorReportStatusList'),
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
