import { useEffect, useState } from 'react'

import { endOfDay, startOfDay } from 'date-fns'
import { useTranslation } from 'react-i18next'

import { UNSAFE_DATE_TIME_FORMAT } from '~/common/constants'
import GanttChart from '~/modules/mesx/partials/gantt-chart'
import useProgressDetailReport from '~/modules/mesx/redux/hooks/useProgressDetailReport'
import { convertUtcDateTimeToLocalTz } from '~/utils'
function ProgressDetailReportChart() {
  const [tasks, setTasks] = useState([])
  const {
    data: { progressDetailReports },
  } = useProgressDetailReport()
  const { t } = useTranslation(['mesx'])
  useEffect(() => {
    if (progressDetailReports) {
      setTasks(getTasks(progressDetailReports))
    }
  }, [progressDetailReports])

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
      ?.map((item) => {
        const parent = {
          id: Math.random(),
          type: 'project',
          render: 'split',
          text: item.item.name,
        }
        const items = item?.calendar?.map((e) => {
          const saleOrderSchedule = {
            text: item.item.name,
            id: `${item.item.id.toString()}-${e.executionDate}`,
            end_date: formatDateInGanttChart(e.executionDate, 'to'),
            start_date: formatDateInGanttChart(e.executionDate, 'from'),
            actualQuantity: e?.actualQuantity,
            planQuantity: e?.planQuantity,
            progress: e.actualQuantity ? e.actualQuantity / e.planQuantity : 0,
            parent: parent.id,
          }
          return saleOrderSchedule
        })
        return [parent, ...items]
      })
      .flat()
  }
  return (
    <>
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
              },
            ],
            grid_resize: true,
            drag_progress: false,
            readonly: true,
          }}
          tasks={{
            data: tasks,
          }}
        />
      )}
    </>
  )
}

export default ProgressDetailReportChart
