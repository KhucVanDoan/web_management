/* eslint-disable */
import React, { Component } from 'react'

import { gantt } from 'dhtmlx-gantt'
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'
import { isEmpty } from 'lodash'
import moment from 'moment'
import { withTranslation } from 'react-i18next'

import { NOTIFICATION_TYPE } from '~/common/constants'
import addNotification from '~/utils/toast'

import Toolbar from './toolbar'
import './style.css'

class GanttChart extends Component {
  constructor(props) {
    super(props)
    const { t } = this.props
    this.initZoom()
    this.LOCALE = {
      date: {
        month_full: [
          t('month.jan'),
          t('month.feb'),
          t('month.mar'),
          t('month.apr'),
          t('month.may'),
          t('month.jun'),
          t('month.jul'),
          t('month.aug'),
          t('month.sep'),
          t('month.oct'),
          t('month.nov'),
          t('month.dec'),
        ],
        month_short: [
          t('month.s_jan'),
          t('month.s_feb'),
          t('month.s_mar'),
          t('month.s_apr'),
          t('month.s_may'),
          t('month.s_jun'),
          t('month.s_jul'),
          t('month.s_aug'),
          t('month.s_sep'),
          t('month.s_oct'),
          t('month.s_nov'),
          t('month.s_dec'),
        ],
        day_full: [
          t('day.monday'),
          t('day.tueday'),
          t('day.wenesday'),
          t('day.thurday'),
          t('day.friday'),
          t('day.saturday'),
          t('day.sunday'),
        ],
        day_short: [
          t('day.s_monday'),
          t('day.s_tueday'),
          t('day.s_wenesday'),
          t('day.s_thurday'),
          t('day.s_friday'),
          t('day.s_saturday'),
          t('day.s_sunday'),
        ],
      },
      labels: {
        minutes: t('dateLabel.minutes'),
        hours: t('dateLabel.hours'),
        days: t('dateLabel.days'),
        weeks: t('dateLabel.weeks'),
        week: t('dateLabel.weeks'),
        months: t('dateLabel.months'),
        years: t('dateLabel.minyearsutes'),
      },
    }
    this.state = {
      zoom: t('general.months'),
    }
  }

  dataProcessor = null

  initZoom() {
    const { t } = this.props
    gantt.ext.zoom.init({
      levels: [
        {
          name: t('general.days'),
          scale_height: 60,
          min_column_width: 30,
          scales: [
            { unit: 'day', step: 1, format: '%d %M' },
            { unit: 'hour', step: 1, format: '%H' },
          ],
        },
        {
          name: t('general.months'),
          scale_height: 60,
          min_column_width: 70,
          scales: [
            { unit: 'month', step: 1, format: '%F' },
            { unit: 'day', step: 1, format: '%d' },
          ],
        },
        {
          name: t('general.years'),
          scale_height: 60,
          min_column_width: 70,
          scales: [
            { unit: 'year', step: 1, format: '%Y' },
            { unit: 'month', step: 1, format: '%F' },
          ],
        },
      ],
    })
  }

  setZoom(value) {
    gantt.ext.zoom.setLevel(value)
  }

  initGanttDataProcessor() {
    const onDataUpdated = this.props.onDataUpdated
    this.dataProcessor = gantt.createDataProcessor((type, action, item, id) => {
      return new Promise((resolve, reject) => {
        if (onDataUpdated) {
          onDataUpdated(type, action, item, id)
        }
        return resolve()
      })
    })
  }

  onTaskDblClick() {
    const viewDetailTask = this.props.viewDetailTask
    gantt.attachEvent('onTaskDblClick', function (id, e) {
      if (viewDetailTask) {
        viewDetailTask(id)
        return true
      } else {
        return false
      }
    })
  }

  handleChangeZoom = (value) => {
    this.setState({
      zoom: value,
    })
  }

  handleSelectTask = (id, checked) => {
    this.props.onTaskSelected(id, checked)
  }

  componentDidUpdate() {
    const { tasks, t } = this.props
    if (tasks.data.length > 0) {
      // prevent change task to past
      gantt.attachEvent('onBeforeTaskChanged', function (id, mode, task) {
        const newTask = tasks.data.find((item) => item.rId === task.rId)
        if (
          // moment(parentMaxDate).isBefore(moment(newTask.end_date), 'days') ||
          // moment(newTask.start_date).isBefore(moment(parentMinDate), 'days') ||
          moment(newTask.start_date).isBefore(
            moment(task.start_date),
            'days',
          ) ||
          moment(newTask.end_date).isBefore(moment(task.end_date), 'days')
        ) {
          addNotification(t('inputTimeInvalid'), NOTIFICATION_TYPE.ERROR)
          return false
        } else {
          return true
        }
      })
    }
    gantt.clearAll()
    gantt.parse(tasks)
    gantt.render()
  }

  componentDidMount() {
    const { config, excludeResizeTask, tasks, t } = this.props
    gantt.config.xml_date = '%Y-%m-%d %H:%i'

    if (!isEmpty(config)) {
      gantt.config = Object.assign(gantt.config, config)
    }

    gantt.templates.task_class = function (start, end, task) {
      if (task.isOverQuantity) {
        return 'back-ground-over-quantity'
      }
      if (task.progress === 0) {
        return 'back-ground-white'
      }
      if (task.progress === 1) {
        return 'back-ground-success'
      }
      if (task.progress > 0 && task.progress < 1) {
        if (new Date(end) < new Date()) {
          return 'back-ground-delay'
        } else {
          return 'back-ground-progress'
        }
      }
    }

    gantt.templates.tooltip_text = function (start, end, task) {
      return (
        '<b>' +
        t('ganttChart.taskName') +
        ':</b> ' +
        task.text +
        '<br/><b>' +
        t('ganttChart.completed') +
        ':</b> ' +
        Math.floor(task.progress * 100, -1) +
        '%<br/>'
      )
    }

    gantt.templates.task_text = function (start, end, task) {
      return Math.floor(task.progress * 100, -1) + '%'
    }

    gantt.locale = this.LOCALE
    gantt.attachEvent('onBeforeLightbox', function (id) {
      gantt.resetLightbox() // clear all changes, new lightbox element will be generated after that
    })
    gantt.attachEvent('onLinkDblClick', function (id, e) {
      let modal
      modal = gantt.modalbox()
      gantt.modalbox.hide(modal)
      return false
    })

    gantt.plugins({
      tooltip: true,
    })

    gantt.init(this.ganttContainer)
    this.initGanttDataProcessor()
    gantt.parse(tasks)

    gantt.attachEvent('onBeforeTaskDrag', function (id, mode, e) {
      if (
        excludeResizeTask &&
        excludeResizeTask.prefix.filter((prefix) => id.includes(prefix))
          .length > 0
      ) {
        return false
      }
      return true
    })

    gantt.attachEvent('onTaskClick', (id, e) => {
      const checkbox = gantt.utils.dom.closest(
        e.target,
        '.gantt-checkbox-column',
      )

      if (checkbox) {
        checkbox.checked = !!checkbox.checked
        gantt.getTask(id).checked = checkbox.checked
        this.handleSelectTask(id, checkbox.checked)
        return false
      } else {
        return true
      }
    })
  }

  componentWillUnmount() {
    if (this.dataProcessor) {
      this.dataProcessor.destructor()
      this.dataProcessor = null
    }
    gantt.clearAll()
  }

  render() {
    // const { zoom } = this.props;
    this.setZoom(this.state.zoom)
    return (
      <>
        <Toolbar onChangeZoom={this.handleChangeZoom} />
        <div className="gantt-container">
          <div
            ref={(input) => {
              this.ganttContainer = input
            }}
            style={{ width: '100%', height: '100%' }}
          ></div>
        </div>
      </>
    )
  }
}

export default withTranslation()(GanttChart)
