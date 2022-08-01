/* eslint-disable */
import React, { Component } from 'react'

import { gantt } from 'dhtmlx-gantt'
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'
import { isEmpty } from 'lodash'
import { withTranslation } from 'react-i18next'

import { ONE_DAY_IN_MILISECOND } from '~/common/constants'

import Toolbar from './toolbar'

class GanttChartWrapper extends Component {
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
      return new Promise((resolve) => {
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
  handleDragTask = (task) => {
    this.props.onTaskDrag(task)
  }
  componentDidUpdate() {
    const { tasks } = this.props
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
      if (task.isOverQuantity || task.overQuantity) {
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

    gantt.config.open_tree_initially = true
    gantt.config.round_dnd_dates = false

    gantt.init(this.ganttContainer)
    this.initGanttDataProcessor()
    gantt.parse(tasks)

    gantt.attachEvent('onBeforeTaskDrag', (id, mode, e) => {
      if (this.props.handleOnBeforeTaskDrag) {
        return this.props.handleOnBeforeTaskDrag(id)
      } else {
        if (
          excludeResizeTask &&
          excludeResizeTask.prefix.filter((prefix) => id.includes(prefix))
            .length > 0
        ) {
          return false
        }
        return true
      }
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

    gantt.attachEvent('onTaskDrag', (id, mode, task) => {
      const maxDate = new Date(gantt.getState().max_date).getTime() - ONE_DAY_IN_MILISECOND
      const minDate = new Date(gantt.getState().min_date).getTime() + ONE_DAY_IN_MILISECOND
      const startDate = new Date(task.start_date).getTime()
      const endDate =  new Date(task.end_date).getTime()
      if (startDate <= minDate || endDate >= maxDate) {
        gantt.render()
      }
    })

    gantt.attachEvent('onAfterTaskDrag', (id, mode, e) => {
      this.props.onTaskDrag(id, mode, e)
    })
  }

  componentWillUnmount() {
    if (this.dataProcessor) {
      this.dataProcessor.destructor()
      this.dataProcessor = null
    }
    gantt.ext.tooltips.tooltip.hide()
    gantt.clearAll()
  }

  render() {
    // const { zoom } = this.props;
    this.setZoom(this.state.zoom)
    return (
      <>
        <Toolbar
          onChangeZoom={this.handleChangeZoom}
          onChangePlanFilter={this.props.handleChangeFilter}
          planList={this.props.planList}
          display={this.props.display}
        />
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

export default withTranslation()(GanttChartWrapper)
