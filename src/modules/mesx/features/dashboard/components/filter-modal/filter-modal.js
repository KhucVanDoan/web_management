import React, { Component } from 'react'

import {
  Box,
  Divider,
  Grid,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material'
import { withStyles } from '@mui/styles'
import clsx from 'clsx'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import Modal from '~/UNSAFE_components/shared/modal'
import {
  getDashboardFinishedItemProgress,
  getDashboardAllItemByMo,
  getDashboardBomItemRoutingByMo,
} from '~/modules/mesx/redux/actions/dashboard-store.action'

import useStyles from './style'

class FilterModal extends Component {
  constructor(props) {
    super(props)
    const {
      moId,
      itemId,
      routingId,
      producingStepId,
      items,
      routing,
      producingSteps,
      isOpenModal,
    } = this.props
    this.state = {
      moId: moId,
      isOpenModal: isOpenModal,
      itemId: itemId,
      routingId: routingId,
      producingStepId: producingStepId,
      items: items,
      routing: routing,
      producingSteps: producingSteps,
    }
  }

  async getAllItemByMoId(moId) {
    if (!moId) {
      this.setState({
        items: [],
      })
    } else {
      this.props.getDashboardAllItemByMo({ moId: moId }, (items) =>
        this.setState({
          items: items,
          routing: [],
          routingId: 0,
          poroducingStepId: 0,
          poroducingSteps: [],
        }),
      )
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isOpenModal !== state.isOpenModal) {
      return props
    }

    return state
  }

  async getMoBomRouting(moId, itemId) {
    if (!itemId) {
      this.setState({
        producingSteps: [],
        producingStepId: 0,
        routingId: 0,
        routing: [],
      })
    } else {
      this.props.getDashboardBomItemRoutingByMo(
        { moId: moId, itemId: itemId },
        (data) => this.setState({ ...data }),
      )
    }
  }

  handleChangeSelect = (event, key) => {
    if (key === 'moId' && event.target.value) {
      this.getAllItemByMoId(event.target.value)
    }
    if (key === 'itemId' && event.target.value) {
      this.getMoBomRouting(this.state.moId, event.target.value)
    }

    this.setState({
      [key]: event.target.value,
      producingSteps: this.state.producingSteps,
    })
  }

  onSubmit = () => {
    const {
      moId,
      itemId,
      items,
      producingStepId,
      producingSteps,
      routingId,
      routing,
    } = this.state
    this.props.handleSubmit({
      moId,
      itemId,
      items,
      producingStepId,
      producingSteps,
      routingId,
      routing,
    })
  }

  onCloseModal = () => {
    this.props.onCloseModal()
  }

  render() {
    const { classes, t, mos } = this.props
    const {
      moId,
      itemId,
      items,
      producingStepId,
      producingSteps,
      routingId,
      routing,
      isOpenModal,
    } = this.state
    return (
      <Modal
        size={'md'}
        isOpen={isOpenModal}
        onClose={this.onCloseModal}
        onSubmit={this.onSubmit}
        onCancel={this.onCloseModal}
        hideCancel={true}
        isOpenModal={true}
      >
        <Box>
          <h1 className={classes.textCenter}>{t('common.filter')}</h1>
          <Divider />
          <Box display="flex" justifyContent="center" my={4}>
            <Box width={6 / 7}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={6} lg={6}>
                  <Box display="flex" alignItems="center" flex={1}>
                    <Box width={0.3}>
                      <label className={classes.labelItem}>
                        {t('dashboard.selectMo')}
                      </label>
                    </Box>
                    <Box width={0.7} mr={1}>
                      <FormControl
                        fullWidth
                        size="small"
                        className={clsx(classes.mediumSelect)}
                      >
                        <Select
                          name="moId"
                          labelId="demo-customized-select-label"
                          id="moId"
                          variant="outlined"
                          value={moId}
                          className={clsx(classes.widthBoxSelect)}
                          onChange={(event) =>
                            this.handleChangeSelect(event, 'moId')
                          }
                        >
                          {[{ id: 0, name: t('common.all') }]
                            .concat(mos)
                            .map((item, i) => (
                              <MenuItem key={i} value={item.id}>
                                {t(item.name)}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} lg={6} md={6}>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                    flex={1}
                  >
                    <Box width={0.4}>
                      <label className={classes.labelItem}>
                        {t('dashboard.itemName')}
                      </label>
                    </Box>
                    <Box width={0.6} mr={1}>
                      <FormControl
                        fullWidth
                        size="small"
                        className={clsx(classes.mediumSelect)}
                      >
                        <Select
                          name="itemId"
                          labelId="demo-customized-select-label"
                          id="itemId"
                          variant="outlined"
                          value={itemId}
                          className={clsx(classes.widthBoxSelect)}
                          onChange={(event) =>
                            this.handleChangeSelect(event, 'itemId')
                          }
                        >
                          {[{ id: 0, name: t('common.all') }]
                            .concat(items)
                            .map((item, i) => (
                              <MenuItem key={i} value={item?.id}>
                                {t(item?.name)}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                  <Box display="flex" alignItems="center" flex={1}>
                    <Box width={0.3}>
                      <label className={classes.labelItem}>
                        {t('dashboard.routing')}
                      </label>
                    </Box>
                    <Box width={0.7} mr={1}>
                      <FormControl
                        fullWidth
                        size="small"
                        className={clsx(classes.mediumSelect)}
                      >
                        <Select
                          name="routingId"
                          labelId="demo-customized-select-label"
                          id="routingId"
                          variant="outlined"
                          value={routingId}
                          className={clsx(classes.widthBoxSelect)}
                          onChange={(event) =>
                            this.handleChangeSelect(event, 'routingId')
                          }
                        >
                          {[{ id: 0, name: t('common.all') }]
                            .concat([routing])
                            .map((item, i) => (
                              <MenuItem key={i} value={item.id}>
                                {t(item.name)}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} lg={6} md={6}>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                    flex={1}
                  >
                    <Box width={0.4}>
                      <label className={classes.labelItem}>
                        {t('dashboard.producingStepName')}
                      </label>
                    </Box>
                    <Box width={0.6} mr={1}>
                      <FormControl
                        fullWidth
                        size="small"
                        className={clsx(classes.mediumSelect)}
                      >
                        <Select
                          name="producingStepId"
                          labelId="demo-customized-select-label"
                          id="producingStepId"
                          variant="outlined"
                          value={producingStepId}
                          className={clsx(classes.widthBoxSelect)}
                          onChange={(event) =>
                            this.handleChangeSelect(event, 'producingStepId')
                          }
                        >
                          {[{ id: 0, name: t('common.all') }]
                            .concat(producingSteps)
                            .map((item, i) => (
                              <MenuItem key={i} value={item?.id}>
                                {t(item?.name)}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  mos: state.dashboard.inProgressMos,
  data: state.dashboard.finishedItemProgress,
})

const mapDispatchToProps = {
  getDashboardFinishedItemProgress,
  getDashboardAllItemByMo,
  getDashboardBomItemRoutingByMo,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(FilterModal)),
)
