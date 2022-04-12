import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import dashboardActions from '../actions/dashboard'

export const useDashboard = () => {
  const data = useSelector((state) => state.dashboard)

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
  const data = useSelector((state) => state.dashboard.summary)

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

export const useDashboardMoStatus = () => {
  const data = useSelector((state) => state.dashboard.moStatus)

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

export const useDashboardProductProcessFinished = () => {
  const inProgressMos = useSelector((state) => state.dashboard.inProgressMos)
  const finishedItemProgress = useSelector(
    (state) => state.dashboard.finishedItemProgress,
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(dashboardActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data: { inProgressMos, finishedItemProgress },
  }
}

export const useDashboardProducingStepProgress = () => {
  const inProgressMos = useSelector((state) => state.dashboard.inProgressMos)
  const producingStepProgress = useSelector(
    (state) => state.dashboard.producingStepProgress,
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(dashboardActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data: { inProgressMos, producingStepProgress },
  }
}

export const useDashboardProductProcessQc = () => {
  const inProgressMos = useSelector((state) => state.dashboard.inProgressMos)
  const qcProducingStepProgress = useSelector(
    (state) => state.dashboard.qcProducingStepProgress,
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(dashboardActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data: { inProgressMos, qcProducingStepProgress },
  }
}
