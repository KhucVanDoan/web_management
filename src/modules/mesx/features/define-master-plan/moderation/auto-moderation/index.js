import React, { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import GanttChart from '~/UNSAFE_components/shared/gantt-chart'
import { MODERATION_TYPE } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { useDefineMasterPlan } from '~/modules/mesx/redux/hooks/useDefineMasterPlan'
import { ROUTE } from '~/modules/mesx/routes/config'
import { redirectRouter } from '~/utils'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.MASTER_PLAN.LIST.PATH,
    title: ROUTE.MASTER_PLAN.LIST.TITLE,
  },
  {
    route: ROUTE.MASTER_PLAN.EDIT.PATH,
    title: ROUTE.MASTER_PLAN.EDIT.TITLE,
  },
  {
    route: ROUTE.MASTER_PLAN.AUTO_MODERATION.PATH,
    title: ROUTE.MASTER_PLAN.AUTO_MODERATION.TITLE,
  },
]

const AutoModeration = (props) => {
  const { t } = useTranslation(['mesx'])
  const [tasks, setTasks] = useState([])
  const [selectedProducingStep, setSelectedProducingStep] = useState([])
  const { id } = useParams()
  const {
    data: { masterPlanDetails, isLoading },
    actions: masterPlanActions
  } = useDefineMasterPlan()

  useEffect(() => {
    masterPlanActions.getMasterPlanDetailsById({
      masterPlanId: Number(id),
    })
  }, [])

  useEffect(() => {
    if (masterPlanDetails?.saleOrderSchedules) {
      setTasks(getTasks(masterPlanDetails.saleOrderSchedules))
    }
  }, [masterPlanDetails])

  const getTasks = (data) => {
    return data?.map(saleOrder => {
      const itemSchedules = getTasksInSaleOrder(saleOrder.itemSchedules, saleOrder.saleOrderId)
      const saleOrderSchedule = {
        text: saleOrder.saleOrderName,
        id: saleOrder.saleOrderId,
        end_date: saleOrder.dateFrom,
        start_date: saleOrder.dateTo,
        progress: 0,
        isOverQuantity: saleOrder.isOverQuantity
      }
      return [saleOrderSchedule, ...itemSchedules]
    }).flat()
  }
  
  const getTasksInSaleOrder = (items, saleOrderId) => {
    return items.map(item => {
      const itemSchedule = {
        text: item.itemName,
        id: item.itemId,
        end_date: item.dateFrom,
        start_date: item.dateTo,
        progress: 0,
        parent: saleOrderId,
        isOverQuantity: item.isOverQuantity
      }
      const producingSteps = item.producingSteps.map(step => ({
        text: step.producingStepName,
        id: step.id,
        end_date: step.dateFrom,
        start_date: step.dateTo,
        progress: 0,
        parent: item.itemId,
        type: 'producingStep',
        isOverQuantity: step.isOverQuantity
      }))
      const a = getTasksInSaleOrder(item.subBom, item.itemId)
  
      return [itemSchedule, ...producingSteps, ...a]
    }).flat()
  }

  const goToModerationType = (values) => {
    switch (values.moderationType?.value) {
      case '2':
      case '3':
        const query = new URLSearchParams({
          producingStep: selectedProducingStep.join(','),
          masterPlanId: id
        }).toString()
        redirectRouter(`${ROUTE.MASTER_PLAN.INPUT_MODERATION.PATH}?${query}`)
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
      setSelectedProducingStep([...selectedProducingStep, id])
    } else {
      setSelectedProducingStep(selectedProducingStep.filter(producingStep => producingStep !== id))
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
                gap: '10px'
              }}
            >
              <Field.Autocomplete
                name="moderationType"
                placeholder={t('defineMasterPlan.autoModeration.selectModerationType')}
                options={MODERATION_TYPE.map((status) => ({
                  value: status.id.toString(),
                  label: t(status.text),
                }))}
              />
              <Button type="submit">
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
      }));
    return links;
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
                    if (task.type === 'producingStep') {
                      const checked = !!task.checked ? " checked" : "";
                      return `
                        <input
                          class="gantt-checkbox-column"
                          type="checkbox"
                          name="producingStep"
                          id="test"
                          value="${task.id}"
                          ${checked}
                        /> ${task.text}`
                    }
                    return task.text
                  }
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
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mt: 2,
              '& button + button': {
                ml: 4 / 3,
              },
            }}
          >
            <Button variant="outlined" color="subText">
              {t('common.close')}
            </Button>
            <Button variant="contained" color="primary">
              {t('common.save')}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Page>
  )
}

export default AutoModeration
