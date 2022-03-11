/* eslint-disable no-param-reassign */

import React, { Component } from 'react'

import { Divider } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { withStyles } from '@mui/styles'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'

import Modal from '~/UNSAFE_components/shared/modal'
import { MODAL_MODE } from '~/common/constants'
import { getWorkCenterDetailsById } from '~/modules/mesx/redux/actions/work-center'
import {
  generateWorkCenterPlan,
  createWorkCenterPlan,
} from '~/modules/mesx/redux/actions/work-center-plan.action'

import CustomTable from '../table'
import style from './style'

class WorkCenterPlanForm extends Component {
  /**
   *
   * @param {object} props
   * @param {int} props.id
   * @param {string} props.mode
   */
  constructor(props) {
    super(props)
    this.state = {
      mode: '',
      name: '',
      code: '',
      leader: '',
      member: '',
      performance: 0,
      data: [],
      isSubmitForm: false,
    }
    this.validator = new SimpleReactValidator()
  }
  componentDidMount() {
    const { workCenterId, id } = this.props
    if (workCenterId && id) {
      this.getDetailWorkCenter(workCenterId)
      this.props.generateWorkCenterPlan({ id, workCenterId }, (data) => {
        this.setState({ data })
      })
    }
  }

  getDetailWorkCenter = (id) => {
    this.props.getWorkCenterDetailsById(id, (data) => {
      const { name, performance, members, leader } = data
      this.setState({
        name,
        performance,
        leader: leader?.fullName,
        member: members.map((m) => m.username),
      })
    })
  }

  onSubmit = () => {
    const { data } = this.state
    const { workCenterId, workCenterPlan, mode } = this.props
    const params = {
      workOrderId: workCenterPlan.wcpList?.workOrder?.id,
      scheduleDetails: data,
    }
    this.props.createWorkCenterPlan(
      { params, workCenterId: workCenterId, mode: mode },
      this.onCloseModal,
    )
  }

  onCloseModal = () => {
    this.resetForm()

    // callback action from parent
    this.props.handleCloseModalForm()
  }

  onCancel = () => {
    const { mode } = this.props
    if (mode === MODAL_MODE.UPDATE) {
      this.resetForm()
    }
  }

  resetForm = () => {
    const { workCenterPlan } = this.props
    this.setState({
      isSubmitForm: false,
      data: workCenterPlan?.wcpStructure,
    })
  }

  handleOnChange = (items) => {
    const { data } = this.state
    data.map((d) => {
      return d?.scheduleShiftDetails.map((shift, i) => {
        return (shift['quantity'] = items[i * 3][d?.executionDay])
      })
    })

    this.setState(data)
  }

  render() {
    const { name, leader, member, performance, data } = this.state
    const { isOpenModal, mode, t } = this.props
    const isView = mode === MODAL_MODE.DETAIL

    return (
      <Modal
        title={
          mode === MODAL_MODE.DETAIL
            ? t('workCenterPlan.detailWorkCenterPlan')
            : t('workCenterPlan.editWorkCenterPlan')
        }
        size={'lg'}
        isOpen={isOpenModal}
        submitLabel={t('common.save')}
        onClose={this.onCloseModal}
        onCancel={this.onCancel}
        onSubmit={this.onSubmit}
        hideCancel={isView}
        hideSubmit={isView}
      >
        <form>
          <Box style={{ paddingLeft: '300px' }}>
            <Box width={1 / 2} className={this.props.classes.boxItem}>
              <label className={this.props.classes.labelItem}>
                {t('workCenterPlan.name')}
                <span className={this.props.classes.required}> *</span>
              </label>
              <Box width={2 / 3}>
                <FormControl fullWidth>
                  <TextField
                    name="name"
                    id="name"
                    margin="dense"
                    placeholder={t('workCenterPlan.name')}
                    value={name}
                    variant="outlined"
                    size="small"
                    disabled
                  />
                </FormControl>
              </Box>
            </Box>
            <Box width={1 / 2} className={this.props.classes.boxItem}>
              <label className={this.props.classes.labelItem}>
                {t('workCenterPlan.leader')}
                <span className={this.props.classes.required}> *</span>
              </label>
              <Box width={2 / 3}>
                <FormControl fullWidth>
                  <TextField
                    name="leader"
                    id="leader"
                    margin="dense"
                    placeholder={t('workCenterPlan.leader')}
                    value={leader}
                    variant="outlined"
                    size="small"
                    disabled
                  />
                </FormControl>
              </Box>
            </Box>

            <Box width={1 / 2} className={this.props.classes.boxItem}>
              <label className={this.props.classes.labelItem}>
                {t('workCenterPlan.member')}
              </label>
              <Box width={2 / 3}>
                <FormControl fullWidth>
                  <TextField
                    name="member"
                    id="member"
                    margin="dense"
                    placeholder={t('workCenterPlan.member')}
                    value={member}
                    variant="outlined"
                    size="small"
                    disabled
                  />
                </FormControl>
              </Box>
            </Box>
            <Box width={1 / 2} className={this.props.classes.boxItem}>
              <label className={this.props.classes.labelItem}>
                {t('workCenterPlan.performance')}
              </label>
              <Box width={2 / 3}>
                <FormControl fullWidth>
                  <TextField
                    name="performance"
                    id="performance"
                    margin="dense"
                    placeholder={t('workCenterPlan.performance')}
                    value={performance}
                    variant="outlined"
                    size="small"
                    disabled
                  />
                </FormControl>
              </Box>
            </Box>
          </Box>
          <Divider />
          {data?.length > 0 && (
            <CustomTable
              data={data}
              mode={mode}
              handleOnChange={this.handleOnChange}
            />
          )}
        </form>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  workCenterPlan: state.workCenterPlan,
  workCenter: state.workCenter,
})

const mapDispatchToProps = {
  generateWorkCenterPlan,
  createWorkCenterPlan,
  getWorkCenterDetailsById,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(style)(WorkCenterPlanForm)),
)
