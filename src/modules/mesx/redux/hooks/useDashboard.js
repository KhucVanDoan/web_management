import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import dashboardActions from '../actions/dashboard'

export const useDashboard = () => {
  const data = useSelector((state) => get(state, 'mesx.dashboard'))

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
  const data = useSelector((state) => get(state, 'mesx.dashboard.summary'))

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
  const data = useSelector((state) => get(state, 'mesx.dashboard.moStatus'))

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
  const inProgressMos = useSelector((state) =>
    get(state, 'mesx.dashboard.inProgressMos'),
  )
  const finishedItemProgress = useSelector((state) =>
    get(state, 'mesx.dashboard.finishedItemProgress'),
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
  const inProgressMos = useSelector((state) =>
    get(state, 'mesx.dashboard.inProgressMos'),
  )
  const producingStepProgress = useSelector((state) =>
    get(state, 'mesx.dashboard.producingStepProgress'),
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
  const inProgressMos = useSelector((state) =>
    get(state, 'mesx.dashboard.inProgressMos'),
  )
  const qcProducingStepProgress = useSelector((state) =>
    get(state, 'mesx.dashboard.qcProducingStepProgress'),
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
