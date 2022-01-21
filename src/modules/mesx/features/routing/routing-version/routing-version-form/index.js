import React, { Component } from 'react'
import { withStyles } from '@mui/styles'
import { withTranslation } from 'react-i18next'
import clsx from 'clsx'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import addNotification from 'utils/toast'
import { NOTIFICATION_TYPE } from 'common/constants'
import {
  MODAL_MODE,
  ROUTING_VERSION_STATUS,
  ROUTING_VERSION_STATUS_MAP,
} from 'common/constants'
import useStyles from './style'
import {
  createRoutingVersion,
  updateRoutingVersion,
  getRoutingVersionDetailsById,
  confirmRoutingVersionById,
} from 'modules/mesx/redux/actions/routing-version.action'
import { connect } from 'react-redux'
import { onChangeTextField } from 'utils'
import SimpleReactValidator from 'simple-react-validator'
import Modal from 'UNSAFE_components/shared/modal'
import { formatDateTimeUtc, formatInput } from 'utils'
import ProducingStepsTable from './producing-steps-table'

import { withRouter } from 'react-router-dom'

const DEFAULT_PRODUCING_STEP = {
  id: 1,
  operationId: null,
  order: 1,
  stepNumber: 1,
}

class RoutingVersionForm extends Component {
  /**
   *
   * @param {object} props
   * @param {int} props.id
   * @param {string} props.mode
   */
  constructor(props) {
    super(props)
    this.state = {
      status: null,
      name: '',
      routingId: null,
      createdAt: '',
      updatedAt: '',
      producingSteps: [{ ...DEFAULT_PRODUCING_STEP }],

      isSubmitForm: false,
      isOpenConfirmModal: false,
    }
    this.validator = new SimpleReactValidator()
  }
  /**
   * componentDidMount
   */
  componentDidMount() {
    //do nothing
  }

  /**
   *
   * @param {*} prevProps
   * @param {*} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    //routing-version-change
    if (
      prevProps.id !== this.props.id &&
      this.props.id &&
      this.props.isOpenModal
    ) {
      this.props.getRoutingVersionDetailsById(this.props.id, (data) => {
        const {
          name,
          createdAt,
          updatedAt,
          routingId,
          status,
          producingSteps,
        } = data
        this.setState({
          name,
          createdAt,
          updatedAt,
          status,
          routingId,
          producingSteps: this.convertProducingSteps(producingSteps),
        })
      })
    }
    if (prevProps.id !== this.props.id && !this.props.id) {
      this.resetForm()
    }
  }

  /**
   * Handle submit
   */
  onSubmit = () => {
    this.setState({ isSubmitForm: true })
    const { producingSteps } = this.state

    const routingId = +this.props.match.params.id
    const params = {
      routingId,
      producingSteps: producingSteps.map((item) => ({
        id: item.operationId,
        stepNumber: item.stepNumber,
      })),
    }
    if (this.validator.allValid()) {
      if (this.props.modalMode === MODAL_MODE.CREATE) {
        const length = producingSteps.length
        if (!this.isGrow(producingSteps, length)) {
          addNotification(
            'routingVersion.softOrderErr',
            NOTIFICATION_TYPE.ERROR,
          )
          return false
        }

        if (producingSteps[0].stepNumber !== 1) {
          addNotification('routingVersion.errorOrder', NOTIFICATION_TYPE.ERROR)
          return false
        } else {
          this.props.createRoutingVersion(params, () => {
            this.onCloseModal()
          })
        }
      } else {
        params.id = this.props.id
        const length = producingSteps.length
        if (!this.isGrow(producingSteps, length)) {
          addNotification(
            'routingVersion.softOrderErr',
            NOTIFICATION_TYPE.ERROR,
          )
          return false
        }

        if (producingSteps[0].stepNumber !== 1) {
          addNotification('routingVersion.errorOrder', NOTIFICATION_TYPE.ERROR)
          return false
        } else {
          this.props.updateRoutingVersion(params, () => {
            this.onCloseModal()
          })
        }
      }
    }
  }
  isGrow(a, n) {
    let dem = 0
    for (let i = 0; i < n - 1; i++) {
      if (
        a[i + 1].stepNumber === a[i].stepNumber ||
        a[i + 1].stepNumber - a[i].stepNumber === 1
      )
        dem++
    }
    if (dem === n - 1) return true
    else return false
  }
  /**
   * Handle close modal
   */
  onCloseModal = () => {
    this.resetForm()

    // callback action from parent
    this.props.handleCloseModal(true)
  }

  /**
   * Handle cancel form
   */
  onCancel = () => {
    const { modalMode } = this.props
    if (modalMode === MODAL_MODE.CREATE) {
      this.resetForm()
    }
    if (modalMode === MODAL_MODE.UPDATE) {
      const { name, status, producingSteps, routingId } =
        this.props.routingVersion.routingVersionDetails
      const newState = JSON.parse(
        JSON.stringify({
          name,
          status,
          producingSteps: this.convertProducingSteps(producingSteps),
          routingId,
        }),
      )
      this.setState(newState)
    }
  }

  /**
   * Clear form data to empty
   */
  resetForm = () => {
    this.setState({
      name: '',
      status: null,
      routingId: null,
      producingSteps: [{ ...DEFAULT_PRODUCING_STEP }],
      isSubmitForm: false,
      createdAt: '',
      updatedAt: '',
    })
  }

  /**
   *
   * @param {array} data
   * @returns
   */
  convertProducingSteps = (data) => {
    return data
      .map((step, index) => ({
        ...step,
        id: index + 1,
        operationId: step?.id,
      }))
      .sort((a, b) => a?.stepNumber - b?.stepNumber)
  }

  /**
   *
   */
  onClickConfirmed = () => {
    this.setState({ isOpenConfirmModal: true })
  }

  /**
   * Submit confirm purchased order
   */
  submitConfirm = () => {
    this.props.confirmRoutingVersionById(this.props.id, this.onCloseModal)
    this.setState({ isOpenConfirmModal: false })
  }

  /**
   * Close confirm modal and back to list
   */
  onCloseConfirmModal = () => {
    this.setState({ isOpenConfirmModal: false })
  }

  /**
   * Render
   * @returns {JSX.Element}
   */
  render() {
    const {
      name,
      producingSteps,
      createdAt,
      updatedAt,
      status,
      isSubmitForm,
      isOpenConfirmModal,
    } = this.state

    const { title, isOpenModal, submitLabel, modalMode, t, classes } =
      this.props
    const isView = modalMode === MODAL_MODE.DETAIL
    const isUpdate = modalMode === MODAL_MODE.UPDATE
    const isCreate = modalMode === MODAL_MODE.CREATE
    this.validator.purgeFields()
    return (
      <Modal
        title={title}
        size={'lg'}
        isOpen={isOpenModal}
        submitLabel={submitLabel}
        onClose={this.onCloseModal}
        onCancel={this.onCancel}
        onSubmit={isCreate || isUpdate ? this.onSubmit : this.onClickConfirmed}
        hideCancel={isView}
        hideSubmit={isView && status === ROUTING_VERSION_STATUS.CONFIRMED}
      >
        {status !== null && status !== undefined && (
          <Box display="flex" justifyContent="space-between">
            <Box></Box>
            <Box
              mt={1}
              p={1}
              className={clsx(classes.statusBox, classes.blueText)}
            >
              {t(ROUTING_VERSION_STATUS_MAP[status])}
            </Box>
          </Box>
        )}
        <form>
          {!isCreate && (
            <Box width={1} mt={2}>
              <div>
                <label className={this.props.classes.labelItem}>
                  {t('routingVersion.name')}
                </label>
              </div>
              <FormControl fullWidth>
                <TextField
                  name="name"
                  id="name"
                  margin="dense"
                  onBlur={(event) => formatInput(this, event)}
                  placeholder={t('routingVersion.name')}
                  value={name}
                  variant="outlined"
                  size="small"
                  disabled={true}
                  onChange={(event) => onChangeTextField(this, event)}
                />
              </FormControl>
            </Box>
          )}
          <Box width={1} mt={2}>
            <ProducingStepsTable
              parent={this}
              producingSteps={producingSteps}
              isSubmitForm={isSubmitForm}
              mode={modalMode}
            />
          </Box>
        </form>
        {isView && (
          <Box
            width={1}
            mt={2}
            flex={1}
            display="flex"
            justifyContent="space-between"
          >
            <div>
              <label>
                <strong>{t('routingVersion.createDate')}: </strong>{' '}
                <span>{formatDateTimeUtc(createdAt)}</span>
              </label>
            </div>
            <div>
              <label>
                <strong>{t('routingVersion.updateDate')}: </strong>{' '}
                <span>{formatDateTimeUtc(updatedAt)}</span>
              </label>
            </div>
          </Box>
        )}
        <Modal
          isOpen={isOpenConfirmModal}
          title={t('common.notify')}
          size="sm"
          onSubmit={this.submitConfirm}
          onClose={this.onCloseConfirmModal}
          submitLabel={t('common.yes')}
          closeLabel={t('common.no')}
          hideCancel
        >
          {t('common.confirmMessage.confirm')}
        </Modal>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  routingVersion: state.routingVersion,
})

const mapDispatchToProps = {
  createRoutingVersion,
  updateRoutingVersion,
  getRoutingVersionDetailsById,
  confirmRoutingVersionById,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(withRouter(RoutingVersionForm))),
)
