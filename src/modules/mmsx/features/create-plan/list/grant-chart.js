import React, { useEffect, useState } from 'react'

import { Box, Checkbox, FormControlLabel, Grid } from '@mui/material'
import { endOfDay, format, isAfter, startOfDay } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { generatePath, useHistory } from 'react-router-dom'

import AdminRole from '~/assets/images/icons/admin.svg'
import ViewIcon from '~/assets/images/icons/view-icon.svg'
import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import Page from '~/components/Page'
import GanttChart from '~/modules/mesx/partials/gantt-chart'
import { GANTT_CHART_TYPE } from '~/modules/mmsx/constants'
import useCreatePlan from '~/modules/mmsx/redux/hooks/useCreatePlan'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'
import './style.css'
const reassign_status = {
  unassign: 1,
  rejected: 3,
}

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.CREATE_PLAN.LIST.PATH,
    title: ROUTE.CREATE_PLAN.LIST.TITLE,
  },
]
function GanttChartView() {
  const { t } = useTranslation('mmsx')
  const [isChecked, setIsChecked] = useState(false)
  const history = useHistory()

  const { setKeyword } = useQueryState({})
  const labels = [
    {
      span: 6,
      boxCss: 'waitForConfirm',
      value: '',
      text: t('maintainanceProgress.status.waitForConfirm'),
    },
    {
      span: 6,
      boxCss: 'inProgress',
      value: '',
      text: t('maintainanceProgress.status.inProgress'),
    },
    {
      span: 6,
      boxCss: 'overdue',
      value: '',
      text: t('maintainanceProgress.status.overdue'),
    },
    {
      span: 6,
      boxCss: 'completed',
      value: '',
      text: t('maintainanceProgress.status.completed'),
    },
  ]
  const [tasks, setTasks] = useState([])
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [planList, setPlanList] = useState([])
  const {
    data: { ganttChartData, isLoading },
    actions,
  } = useCreatePlan()
  const stringify = JSON.parse(localStorage.getItem('userInfo'))
  const userId = stringify?.id

  useEffect(() => {
    const params = {
      user: isChecked ? userId : null,
    }
    actions.getGanttChartData(params)
  }, [isChecked])

  const formatDateInGanttChart = (date, type) => {
    if (date) {
      const dateFormat =
        type === 'to' ? endOfDay(new Date(date)) : startOfDay(new Date(date))
      return convertUtcDateTimeToLocalTz(dateFormat)
    }
    return ''
  }
  const checkIsOverDue = (end) => {
    return isAfter(new Date(), new Date(end))
  }
  const getTasksInSaleOrder = (
    items,
    id,
    parentId,
    listParents,
    parentItemId = '',
  ) => {
    return items?.map((item) => {
      const key = `${id}-${item.id}`
      const keyParent = `${id}-${parentItemId}-${item.parentId}`
      const jobs = {
        redirectId: item.id?.toString(),
        type: GANTT_CHART_TYPE.job,
        text: item?.code,
        device: item?.device?.code + ' - ' + item?.device?.name,
        planDate: `${format(new Date(item.planFrom), 'dd/MM/yyyy')} - ${format(
          new Date(item.planTo),
          'dd/MM/yyyy',
        )}`,
        executor: item?.assign?.name,
        id: key,
        status: item?.status,
        jobId: id?.toString(),
        end_date: formatDateInGanttChart(item.planTo, 'to'),
        start_date: formatDateInGanttChart(item.planFrom, 'from'),
        progress: 0,
        parent: parentId === null ? id : keyParent,
        listParents: [
          parentId === null ? id?.toString() : keyParent,
          ...(listParents || []),
        ],
        isOverQuantity: checkIsOverDue(item.planTo),
      }
      return jobs
    })
  }
  const getTasks = (data) => {
    return data
      ?.map((item) => {
        const jobs = getTasksInSaleOrder(item?.jobs, item?.id, null)
        const plan = {
          type: GANTT_CHART_TYPE.plan,
          planDate: `${format(
            new Date(item.planFrom),
            'dd/MM/yyyy',
          )} - ${format(new Date(item.planTo), 'dd/MM/yyyy')}`,
          jobCode: item?.code,
          text: item?.name,
          id: item.id?.toString(),
          end_date: formatDateInGanttChart(item.planTo, 'to'),
          start_date: formatDateInGanttChart(item.planFrom, 'from'),
          progress: 0,
          isOverQuantity: checkIsOverDue(item.planTo),
          redirectId: item?.id?.toString(),
        }
        return [plan, jobs].flat()
      })
      .flat()
  }

  useEffect(() => {
    if (ganttChartData) {
      const availablePlan = []
      ganttChartData?.forEach((item) =>
        availablePlan.push({ value: item.id, label: item.name }),
      )
      setPlanList(availablePlan)
      if (selectedPlan) {
        setTasks(
          getTasks(ganttChartData.filter((item) => item.id === selectedPlan)),
        )
      } else {
        setTasks(getTasks(ganttChartData))
      }
    }
  }, [ganttChartData, selectedPlan])

  const linkRelateList = (data) => {
    const links = data
      .filter((work) => work?.parent)
      .map((item) => ({
        source: item.id,
        target: item.parent,
        type: 1,
      }))
    return links
  }

  const handleChangeFilter = (id) => {
    setSelectedPlan(id?.value)
  }

  const genId = (id) => {
    if (id) {
      if (id.includes('-')) {
        const myArray = id.split('-')
        return myArray[1]
      } else {
        return id
      }
    }
  }
  const renderHeaderRight = () => {
    return (
      <>
        <FormControlLabel
          control={
            <Checkbox
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
          }
          label={t('jobList.button.myTask')}
        />
        <Button
          onClick={() => history.push(ROUTE.CREATE_PLAN.LIST.PATH)}
          icon="listView"
          sx={{ ml: 4 / 3 }}
        >
          {t('jobList.button.listView')}
        </Button>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('createPlanList.title')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('deviceCategory.searchPlaceholder')}
      loading={isLoading}
    >
      <Box sx={{ display: 'flex', mb: 3 }}>
        {labels?.map((item) => (
          <Grid
            item
            xs={3}
            lg={12}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <div className={`${item?.boxCss} box`} />
            <span style={{ marginLeft: '10px' }}>{item?.text}</span>
          </Grid>
        ))}
      </Box>
      <GanttChart
        config={{
          columns: [
            {
              name: 'text',
              label: t('ganttChart.title'),
              tree: true,
              width: '*',
              min_width: 200,
              template: (task) => {
                return `
                        <div value="${task.id}">
                        ${task.text}
                          <a href="${generatePath(
                            task?.status === reassign_status.rejected ||
                              task?.status === reassign_status.unassign
                              ? ROUTE.DEVICE_ASSIGN.REASSIGN.PATH
                              : ROUTE.JOB.DETAIL.PATH,
                            {
                              id: genId(task.id),
                            },
                          )}" target="_blank">
                          <img src=${
                            task?.status === reassign_status.rejected ||
                            task?.status === reassign_status.unassign
                              ? AdminRole
                              : ViewIcon
                          } alt="" width={18} height={18} />
                          </a>
                        </div> `
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
        display
        planList={planList}
        handleChangeFilter={handleChangeFilter}
      />
    </Page>
  )
}
export default GanttChartView
