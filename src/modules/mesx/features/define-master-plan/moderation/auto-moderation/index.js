import React, { useEffect, useState } from 'react'

import { Box, Grid, Alert, AlertTitle } from '@mui/material'
import { endOfDay, startOfDay } from 'date-fns'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { UNSAFE_DATE_TIME_FORMAT } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import {
  MODERATION_TYPE_OPTIONS,
  MODERATION_TYPE,
} from '~/modules/mesx/constants'
import GanttChart from '~/modules/mesx/partials/gantt-chart'
import { useDefineMasterPlan } from '~/modules/mesx/redux/hooks/useDefineMasterPlan'
import { ROUTE } from '~/modules/mesx/routes/config'
import { redirectRouter, convertUtcDateTimeToLocalTz } from '~/utils'

const AutoModeration = () => {
  const { t } = useTranslation(['mesx'])
  const [tasks, setTasks] = useState([])
  const [selectedProducingStep, setSelectedProducingStep] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const { id } = useParams()
  const {
    data: { masterPlanDetails, isLoading },
    actions: masterPlanActions,
  } = useDefineMasterPlan()
  const breadcrumbs = [
    {
      title: 'plan',
    },
    {
      route: ROUTE.MASTER_PLAN.LIST.PATH,
      title: ROUTE.MASTER_PLAN.LIST.TITLE,
    },
    {
      route: ROUTE.MASTER_PLAN.EDIT.PATH.replace(':id', id),
      title: ROUTE.MASTER_PLAN.EDIT.TITLE,
    },
    {
      route: ROUTE.MASTER_PLAN.AUTO_MODERATION.PATH,
      title: ROUTE.MASTER_PLAN.AUTO_MODERATION.TITLE,
    },
  ]

  useEffect(() => {
    masterPlanActions.getMasterPlanDetailsById(id, null, (error) => {
      setErrorMessage(error?.message)
    })
  }, [])

  useEffect(() => {
    if (masterPlanDetails?.saleOrderSchedules) {
      setTasks(getTasks(masterPlanDetails.saleOrderSchedules))
    }
  }, [masterPlanDetails])

  const formatDateInGanttChart = (date, type) => {
    if (date) {
      const dateFormat =
        type === 'to' ? endOfDay(new Date(date)) : startOfDay(new Date(date))
      return convertUtcDateTimeToLocalTz(dateFormat, UNSAFE_DATE_TIME_FORMAT)
    }
    return ''
  }

  const getTasks = (data) => {
    return data
      ?.map((saleOrder) => {
        const itemSchedules = getTasksInSaleOrder(
          saleOrder.itemSchedules,
          saleOrder.saleOrderId,
          null,
        )
        const saleOrderSchedule = {
          text: saleOrder.saleOrderName,
          id: saleOrder.saleOrderId.toString(),
          saleOrderId: saleOrder.saleOrderId.toString(),
          end_date: formatDateInGanttChart(saleOrder.dateTo, 'to'),
          start_date: formatDateInGanttChart(saleOrder.dateFrom, 'from'),
          progress: 0,
          isOverQuantity: saleOrder.isOverQuantity,
        }

        return [saleOrderSchedule, ...itemSchedules]
      })
      .flat()
  }

  const getTasksInSaleOrder = (
    items,
    saleOrderId,
    parentBomId,
    listParents,
    parentItemId = '',
  ) => {
    return items
      ?.map((item) => {
        const key = `${saleOrderId}-${item.id}-${item.bomId}`
        const keyParent = `${saleOrderId}-${parentItemId}-${item.parentBomId}`
        const itemSchedule = {
          text: item.itemName,
          id: key,
          saleOrderId: saleOrderId.toString(),
          end_date: formatDateInGanttChart(item.dateTo, 'to'),
          start_date: formatDateInGanttChart(item.dateFrom, 'from'),
          progress: 0,
          parent: parentBomId === null ? saleOrderId : keyParent,
          listParents: [
            parentBomId === null ? saleOrderId.toString() : keyParent,
            ...(listParents || []),
          ],
          isOverQuantity: item.isOverQuantity,
        }
        const producingSteps =
          item.producingSteps?.map((step) => ({
            text: step.producingStepName,
            id: `P_${saleOrderId}-${step.id}`,
            saleOrderId: saleOrderId.toString(),
            producingStepId: step.id,
            itemScheduleId: step.itemScheduleId,
            end_date: formatDateInGanttChart(step.dateTo, 'to'),
            start_date: formatDateInGanttChart(step.dateFrom, 'from'),
            progress: 0,
            parent: key,
            type: 'producingStep',
            listParents: [...itemSchedule.listParents, key],
            isOverQuantity: step.overQuantity > 0,
          })) || []
        const subBom =
          getTasksInSaleOrder(
            item.subBom,
            saleOrderId,
            item.bomId,
            itemSchedule.listParents,
            item.id,
          ) || []

        return [itemSchedule, ...producingSteps, ...subBom]
      })
      .flat()
  }

  const goToModerationType = (values) => {
    switch (Number(values.moderationType?.value)) {
      case MODERATION_TYPE.EXTEND_DEADLINE:
        extendDeadline()
        break
      case MODERATION_TYPE.SPREAD_EVENLY:
      case MODERATION_TYPE.INPUT_MODERATION:
        const query = new URLSearchParams({
          producingStep: selectedProducingStep.join(','),
          masterPlanId: id,
          moderationType: values.moderationType?.value,
        }).toString()
        redirectRouter(`${ROUTE.MASTER_PLAN.INPUT_MODERATION.PATH}?${query}`, {
          id: id,
        })
        break
      default:
        break
    }
  }

  const backToCreateMasterPlan = () => {
    redirectRouter(ROUTE.MASTER_PLAN.EDIT.PATH, { id })
  }

  const handleSelectProducingStep = (id, checked) => {
    if (checked) {
      let propducingSteps = []
      const updatedTasks = tasks.map((task) => {
        if (
          task.type === 'producingStep' &&
          (task.listParents?.includes(id) || task.id === id)
        ) {
          propducingSteps.push(task.producingStepId)
        }
        return {
          ...task,
          checked: task.listParents?.includes(id) || task.checked,
        }
      })
      setTasks(updatedTasks)
      setSelectedProducingStep([...selectedProducingStep, ...propducingSteps])
    } else {
      const currentTaskUncheck = tasks.find((task) => task.id === id)

      let removedPropducingSteps = []
      const updatedTasks = tasks.map((task) => {
        if (
          task.type === 'producingStep' &&
          (task.listParents?.includes(id) || task.id === id)
        ) {
          removedPropducingSteps.push(task.producingStepId)
        }
        if (currentTaskUncheck?.listParents?.includes(task.id)) {
          return {
            ...task,
            checked: false,
          }
        } else {
          return {
            ...task,
            checked: task.listParents?.includes(id) ? false : task.checked,
          }
        }
      })
      setTasks(updatedTasks)
      setSelectedProducingStep(
        selectedProducingStep.filter(
          (producingStep) => !removedPropducingSteps.includes(producingStep),
        ),
      )
    }
  }

  const renderHeaderRight = () => {
    return (
      <Formik
        initialValues={{ moderationType: '' }}
        onSubmit={goToModerationType}
        enableReinitialize
      >
        {() => (
          <Form>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '10px',
              }}
            >
              <Field.Autocomplete
                style={{ width: 200 }}
                name="moderationType"
                placeholder={t(
                  'defineMasterPlan.autoModeration.selectModerationType',
                )}
                options={MODERATION_TYPE_OPTIONS.map((status) => ({
                  value: status.id.toString(),
                  label: t(status.text),
                }))}
              />
              <Button type="submit" disabled={!selectedProducingStep?.length}>
                {t('defineMasterPlan.autoModeration.selectModerationType')}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    )
  }

  const linkRelateList = (data) => {
    const links = data
      .filter((work) => work.parent)
      .map((item) => ({
        source: item.id,
        target: item.parent,
        type: 1,
      }))
    return links
  }

  const extendDeadline = async () => {
    if (selectedProducingStep?.length) {
      await Promise.all(
        selectedProducingStep.map((producingStep) =>
          masterPlanActions.extendDeadline({
            itemProducingStepId: Number(producingStep),
          }),
        ),
      )
      masterPlanActions.getMasterPlanDetailsById(id)
    }
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('defineMasterPlan.autoModeration.title')}
      loading={isLoading}
      renderHeaderRight={renderHeaderRight}
      onBack={backToCreateMasterPlan}
    >
      <Grid container>
        <Grid item xs={12}>
          {tasks?.length > 0 && (
            <GanttChart
              config={{
                columns: [
                  {
                    name: 'text',
                    label: t('defineMasterPlan.autoModeration.saleOrder'),
                    tree: true,
                    width: '*',
                    min_width: 200,
                    template: (task) => {
                      const checked = !!task.checked ? ' checked' : ''
                      return `
                        <input
                          class="gantt-checkbox-column"
                          type="checkbox"
                          name="producingStep"
                          id="test"
                          value="${task.id}"
                          ${checked}
                        /> ${task.text}`
                    },
                  },
                ],
                grid_resize: true,
                drag_progress: false,
              }}
              tasks={{
                data: tasks,
                links: linkRelateList(tasks),
              }}
              onTaskSelected={handleSelectProducingStep}
            />
          )}
          {!isLoading && !tasks.length && (
            <Alert severity="error">
              <AlertTitle>
                {t('defineMasterPlan.titleErrorGetDetailMasterPlan')}
              </AlertTitle>
              {errorMessage}
            </Alert>
          )}
        </Grid>
      </Grid>
    </Page>
  )
}

export default AutoModeration
