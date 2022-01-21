import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'
import clsx from 'clsx'
import { Button, Divider, FormHelperText, Grid, MenuItem } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { withStyles } from '@mui/styles'
import { Breadcrumbs } from 'components/Breadcrumbs'
import Loading from 'components/Loading'
import Modal from 'UNSAFE_components/shared/modal'
import ItemsSettingTable from './items-setting-table'
import {
  confirmBomProducingStepById,
  createBomProducingStep,
  getBomProducingStepDetailsById,
  updateBomProducingStep,
  getBomProducingStepBomDetails,
  searchBomProducingStep,
} from 'modules/mesx/redux/actions/bom-producing-step.action'
import { onChangeSelect, onChangeTextField, redirectRouter } from 'utils'
import useStyles from './style'

import {
  getBomByItem,
  searchBOM,
  getBOMDetailsById,
} from 'modules/mesx/redux/actions/define-bom.action'
import { getItems, getRoutings } from 'modules/mesx/redux/actions/common.action'
import { getItemDetailsById } from 'modules/mesx/redux/actions/define-item.action'
import { searchItemTypes } from 'modules/mesx/redux/actions/item-type-setting.action'
import {
  MODAL_MODE,
  BOM_PRODUCING_STEP_STATUS,
  BOM_PRODUCING_STEP_STATUS_MAP,
  TEXTFIELD_REQUIRED_LENGTH,
  BOM_STATUS,
  NOTIFICATION_TYPE,
} from 'common/constants'
import { ROUTE } from 'modules/mesx/routes/config'
import addNotification from 'utils/toast'

const DEFAULT_ITEM = {
  id: 0,
  code: '',
  name: '',
  quantity: 1,
  isProductionObject: false,
}

const MODAL_CONFIRM_TYPE = {
  APPROVE: 'APPROVE',
  REJECT: 'REJECT',
}
class BomProducingStepForm extends Component {
  /**
   * @param {object} props
   * @param {int} props.id
   * @param {string} props.mode
   */
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      name: '',
      quantity: '',
      routingCode: null,
      parentId: null,
      itemId: null,
      description: '',
      items: [{ ...DEFAULT_ITEM }],
      item: null,
      parentBom: {},
      mode: MODAL_MODE.CREATE,
      status: -1,
      createdByUser: {},
      createdByUserId: null,
      isSubmitForm: false,
      pageSize: 10,
      page: 1,
      isOpenConfirmModal: false,
      confirmMessage: '',
      modalConfirmType: '',
      modalAction: () => {},
      isViewOnly: false,
      bomId: null,
      detail: [],
      producingStepList: [],
    }
    const { t } = this.props

    this.validator = new SimpleReactValidator({
      validators: {
        // Custom validation for bom_code
        bom_code: {
          message: '',
          rule: (val, params, validator) => {
            return (
              !val ||
              this.state.items.filter((item) => item.bomCode === val)
                ?.length === 0
            )
          },
          required: true,
        },
      },
    })
  }
  /**
   * componentDidMount
   */
  componentDidMount() {
    const MODE_MAP = {
      [ROUTE.BOM_PRODUCING_STEP.CREATE.PATH]: MODAL_MODE.CREATE,
      [ROUTE.BOM_PRODUCING_STEP.DETAIL.PATH]: MODAL_MODE.DETAIL,
      [ROUTE.BOM_PRODUCING_STEP.EDIT.PATH]: MODAL_MODE.UPDATE,
    }
    const id = this.props.match.params.id
    const path = this.props.match.path
    const search = new URLSearchParams(this.props.location?.search)
    this.setState(
      {
        mode: MODE_MAP[path?.replace(id, ':id')],
        isViewOnly: !!search.get('isViewOnly'),
      },
      this.refreshData,
    )
    this.props.searchItemTypes()
    // const params = {
    //   keyword: '',
    //   page: 1,
    //   limit: 1000,
    //   filter: JSON.stringify([]),
    //   sort: JSON.stringify([]),
    // };

    // this.props.searchBomProducingStep(params);
  }
  /**
   * Refresh init data
   */
  refreshData = () => {
    this.props.getRoutings()
    this.props.getItems()
    this.props.searchBOM(
      {
        isGetAll: 1,
        filter: JSON.stringify([
          { column: 'isHasBomProducingStep', text: false },
        ]),
      },
      (data) => {
        if (this.state.mode !== MODAL_MODE.CREATE)
          this.onChangeItem(
            'item',
            this.props.BOMList.find(
              (bom) => bom.id === parseInt(this.props.match.params.id),
            ).item,
          )
      },
    )
  }

  /**
   * on submit
   */
  onSubmit = () => {
    this.setState({ isSubmitForm: true })
    if (this.validator.allValid()) {
      const { items, item, bomId, detail, producingStepList } = this.state

      items.forEach((i) => {
        const details = detail.filter((d) => d.itemId === i.materialId)
        let quantityTotal = 0

        details.forEach((d) => {
          const producingStepName = producingStepList.find(
            (p) => p.producingStep.id === d.producingStepId,
          ).producingStep.name
          Object.assign(d, {
            quantity: parseInt(i.producingSteps[producingStepName]),
          })
          quantityTotal += parseInt(d.quantity)
        })

        if (i.total !== quantityTotal) {
          addNotification(
            'bomProducingStep.quantityNotEqual',
            NOTIFICATION_TYPE.ERROR,
          )
          return
        }
      })

      const params = {
        itemId: item.id ? item.id : item.itemId,
        bomId,
        detail,
      }
      if (this.state.mode === MODAL_MODE.CREATE) {
        this.props.createBomProducingStep(params, this.backToList)
      } else {
        params.id = +this.props.match.params.id
        this.props.updateBomProducingStep(params, this.backToList)
      }
    }
  }
  /**
   * Open approve modal
   */
  openApproveModal = () => {
    this.setState({
      isOpenConfirmModal: true,
      confirmMessage: 'common.confirmMessage.confirm',
      modalConfirmType: MODAL_CONFIRM_TYPE.APPROVE,
      modalAction: this.submitConfirmBomProducingStep,
    })
  }
  /**
   * Submit confirm Bom producing step
   */
  submitConfirmBomProducingStep = () => {
    this.props.confirmBomProducingStepById(this.props.match.params.id, () => {
      this.backToList()
    })
  }
  /**
   * Handle cancel modal
   */
  onCancel = () => {
    const { mode } = this.state
    if (mode === MODAL_MODE.CREATE) {
      this.resetForm()
    }
    if (mode === MODAL_MODE.UPDATE) {
      this.onChangeItem('item', this.state.item)
    }
  }

  /**
   * Back to list screen
   */
  backToList = () => {
    redirectRouter(ROUTE.BOM_PRODUCING_STEP.LIST.PATH)
  }

  /**
   * Close confirm modal and back to list
   */
  onCloseConfirmModal = () => {
    this.setState({ isOpenConfirmModal: false })
    this.backToList()
  }
  /**
   * Render action buttons based on mode and status
   * @returns {JSX.Element}
   */
  renderActionButtons = () => {
    const { mode, status } = this.state
    const { t } = this.props
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <Box mt={2} display="flex" justifyContent="space-between">
            <Box></Box>
            <Box display="flex">
              <Box mr={1}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.onSubmit}
                >
                  {t('common.create')}
                </Button>
              </Box>
              <Box mr={1}>
                <Button variant="contained" onClick={this.onCancel}>
                  {t('common.cancel')}
                </Button>
              </Box>
              <Box>
                <Button variant="contained" onClick={this.backToList}>
                  {t('common.close')}
                </Button>
              </Box>
            </Box>
          </Box>
        )
      case MODAL_MODE.UPDATE:
        return (
          <Box mt={2} display="flex" justifyContent="space-between">
            <Box></Box>
            <Box display="flex">
              <Box mr={1}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.onSubmit}
                >
                  {t('common.save')}
                </Button>
              </Box>
              <Box mr={1}>
                <Button variant="contained" onClick={this.onCancel}>
                  {t('common.cancel')}
                </Button>
              </Box>
              <Box>
                <Button variant="contained" onClick={this.backToList}>
                  {t('common.close')}
                </Button>
              </Box>
            </Box>
          </Box>
        )
      case MODAL_MODE.DETAIL:
        ;<Box>
          <Button variant="contained" onClick={this.backToList}>
            {t('common.close')}
          </Button>
        </Box>
        switch (status) {
          // PENDING
          case BOM_PRODUCING_STEP_STATUS.PENDING:
            return (
              <Box mt={2} display="flex" justifyContent="space-between">
                <Box></Box>
                <Box display="flex">
                  <Box mr={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.openApproveModal}
                    >
                      {t('common.accept')}
                    </Button>
                  </Box>
                  <Box>
                    <Button variant="contained" onClick={this.backToList}>
                      {t('common.close')}
                    </Button>
                  </Box>
                </Box>
              </Box>
            )
          // APPROVED
          case BOM_PRODUCING_STEP_STATUS.APPROVED:
            return (
              <Box mt={2} display="flex" justifyContent="space-between">
                <Box></Box>
                <Box display="flex">
                  <Box>
                    <Button variant="contained" onClick={this.backToList}>
                      {t('common.close')}
                    </Button>
                  </Box>
                </Box>
              </Box>
            )
          // REJECTED
          case BOM_PRODUCING_STEP_STATUS.REJECTED:
            return (
              <Box mt={2} display="flex" justifyContent="space-between">
                <Box></Box>
                <Box display="flex">
                  <Box mr={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {}}
                    >
                      {t('common.save')}
                    </Button>
                  </Box>
                  <Box mr={1}>
                    <Button variant="contained" onClick={this.onCancel}>
                      {t('common.cancel')}
                    </Button>
                  </Box>
                  <Box>
                    <Button variant="contained" onClick={this.backToList}>
                      {t('common.close')}
                    </Button>
                  </Box>
                </Box>
              </Box>
            )
          // IN_PROGRESS
          // COMPLETED
          // CONFIRMED
          case BOM_PRODUCING_STEP_STATUS.CONFIRMED:
          case BOM_PRODUCING_STEP_STATUS.IN_PROGRESS:
          case BOM_PRODUCING_STEP_STATUS.COMPLETED:
            return (
              <Box mt={2} display="flex" justifyContent="space-between">
                <Box></Box>
                <Box display="flex">
                  <Box>
                    <Button variant="contained" onClick={this.backToList}>
                      {t('common.close')}
                    </Button>
                  </Box>
                </Box>
              </Box>
            )

          default:
            return
        }
      default:
        break
    }
  }

  /**
   * Reset form
   */
  resetForm = () => {
    this.setState({
      code: '',
      name: '',
      quantity: '',
      routingCode: null,
      parentId: null,
      description: '',
      items: [{ ...DEFAULT_ITEM }],
      item: null,
      mode: MODAL_MODE.CREATE,
      isSubmitForm: false,
      pageSize: 10,
      page: 1,
      isOpenConfirmModal: false,
      confirmMessage: '',
      modalConfirmType: '',
      detail: {},
    })
  }

  /**
   * Render breadcrumb
   */
  getBreadcrumb = () => {
    const { mode } = this.state
    const breadcrumb = [
      {
        title: 'database',
      },
      {
        route: ROUTE.BOM_PRODUCING_STEP.LIST.PATH,
        title: ROUTE.BOM_PRODUCING_STEP.LIST.TITLE,
      },
    ]

    const id = this.props.match.params.id

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.BOM_PRODUCING_STEP.CREATE.PATH,
          title: ROUTE.BOM_PRODUCING_STEP.CREATE.TITLE,
        })
        break
      case MODAL_MODE.DETAIL:
        breadcrumb.push({
          route: ROUTE.BOM_PRODUCING_STEP.DETAIL.PATH + `/${id}`,
          title: ROUTE.BOM_PRODUCING_STEP.DETAIL.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.BOM_PRODUCING_STEP.EDIT.PATH + `/${id}`,
          title: ROUTE.BOM_PRODUCING_STEP.EDIT.TITLE,
        })
        break
      default:
    }
    return breadcrumb
  }

  /**
   * Get title
   */
  getTitle = () => {
    const { mode } = this.state
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.BOM_PRODUCING_STEP.CREATE.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.BOM_PRODUCING_STEP.DETAIL.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.BOM_PRODUCING_STEP.EDIT.TITLE
      default:
    }
  }
  onChangeItem = (key, value) => {
    const { BOMList, routingList } = this.props
    if (key === 'item') {
      const bom = BOMList.find((bom) => bom?.item?.itemId === value?.itemId)

      let detail = []

      this.props.getBomProducingStepDetailsById(
        bom.id,
        (data) => {
          const { itemList } = this.props
          let items = []
          data.materialDetails.forEach((material, index) => {
            let producingSteps = {}
            material.producingStepData.forEach((p) => {
              detail.push({
                itemId: material.bomDetail.itemId,
                bomDetailId: material.bomDetail.id,
                producingStepId: p.producingStep.id,
              })

              const name = p.producingStep.name
              const quantity = p.quantity
              let producingStep = {
                [name]: Math.floor(quantity),
              }
              Object.assign(producingSteps, producingStep)
            })
            const item = itemList.find(
              (item) => item.id === material.bomDetail.itemId,
            )

            items.push({
              index: index,
              id: material.bomDetail.id,
              materialId: item.id,
              materialCode: item.code,
              materialName: item.name,
              total: material.bomDetail.quantity,
              unit: item.itemUnit.name,
              producingSteps,
            })
          })

          const producingStepList = data.materialDetails[0].producingStepData

          this.setState({
            [key]: value,
            code: bom.code,
            name: bom.name,
            description: bom.description,
            status: data.materialDetails[0].producingStepData[0].status,
            routingCode: routingList.find(
              (routing) => routing.id === bom.routingId,
            ).code,
            bomId: bom.id,
            detail,
            items,
            producingStepList,
          })
        },
        () => {
          if (
            Object.keys(this.props.bomProducingStep.bomProducingStepDetails)
              .length === 0
          ) {
            this.setState({
              code: '',
              name: '',
              quantity: '',
              description: '',
              routingCode: null,
              item: {},
              items: [],
            })
          }
        },
      )
    }

    this.setState({ [key]: value })
  }

  /**
   * Render
   * @returns {JSX.Element}
   */
  render() {
    const {
      code,
      name,
      quantity,
      routingCode,
      description,
      items,
      item,
      status,
      isSubmitForm,
      mode,
      isOpenConfirmModal,
      confirmMessage,
      modalAction,
      page,
      pageSize,
    } = this.state
    const {
      t,
      bom,
      classes,
      itemList,
      routingList,
      BOMList,
      bomProducingStep,
    } = this.props

    const isView = mode === MODAL_MODE.DETAIL
    const isUpdate = mode === MODAL_MODE.UPDATE

    let itemListBOM = BOMList.filter(
      (bom) => bom.status === BOM_STATUS.CONFIRMED,
    ).map((bom) => bom.item)

    // if (mode === MODAL_MODE.CREATE) {
    //   itemListBOM = itemListBOM.filter(
    //     (i) =>
    //       !(
    //         bomProducingStep.bomProducingStepList.filter(
    //           (item) => item?.itemId === i?.itemId,
    //         ).length > 0
    //       ),
    //   );
    // }

    this.validator.purgeFields()

    return (
      <Box>
        <Loading open={bom?.isLoading} />
        <Breadcrumbs breadcrumbs={this.getBreadcrumb()} />
        <h2>{t('menu.' + this.getTitle())}</h2>
        <form>
          <Box className={clsx(classes.marginAuto, classes.marginLabel)}>
            <Divider />
            {status >= 0 && mode !== MODAL_MODE.CREATE && (
              <Box display="flex" justifyContent="space-between">
                <Box></Box>
                <Box
                  mt={1}
                  p={1}
                  className={clsx(classes.statusBox, {
                    [classes.blueText]: !(
                      status === BOM_PRODUCING_STEP_STATUS.REJECTED
                    ),
                    [classes.redText]:
                      status === BOM_PRODUCING_STEP_STATUS.REJECTED,
                  })}
                  mr={3}
                >
                  {t(BOM_PRODUCING_STEP_STATUS_MAP[status])}
                </Box>
              </Box>
            )}
            <Grid container>
              {/** code */}
              <Grid item xs={12} lg={6} md={6}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mr={2}
                  flex={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('bomProducingStep.item.bomCode')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth>
                      <TextField
                        name="code"
                        id="code"
                        value={code}
                        margin="dense"
                        variant="outlined"
                        size="small"
                        onChange={(event) => onChangeTextField(this, event)}
                        inputProps={{ maxLength: 20 }}
                        disabled
                      />
                      {/* add rule to validate */}
                      {this.validator.message(
                        'code',
                        code?.trim(),
                        `required|alpha_num|max:${TEXTFIELD_REQUIRED_LENGTH.CODE_12.MAX}`,
                      )}
                      {/* check isValid to show messages */}
                      {isSubmitForm &&
                        !this.validator.check(code?.trim(), `required`) && (
                          <FormHelperText error>
                            {t('form.required')}
                          </FormHelperText>
                        )}
                      {isSubmitForm &&
                        !this.validator.check(code?.trim(), 'alpha_num') && (
                          <FormHelperText error>
                            {t('form.validCode')}
                          </FormHelperText>
                        )}
                      {isSubmitForm &&
                        !this.validator.check(
                          code?.trim(),
                          `max:${TEXTFIELD_REQUIRED_LENGTH.CODE_12.MAX}`,
                        ) && (
                          <FormHelperText error>
                            {t('form.maxLength', {
                              max: TEXTFIELD_REQUIRED_LENGTH.CODE_12.MAX,
                            })}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
              {/**itemCode */}
              <Grid item xs={12} lg={6} md={6} className={classes.displayFlex}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mr={1}
                  flex={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('bomProducingStep.item.code')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth size="small">
                      <Select
                        size="small"
                        name="itemCode"
                        id="itemCode"
                        value={item?.itemId || ''}
                        margin="dense"
                        variant="outlined"
                        onChange={(event) => {
                          this.onChangeItem(
                            'item',
                            itemListBOM.find(
                              (i) => i?.itemId === event.target.value,
                            ),
                          )
                        }}
                        disabled={isView || isUpdate}
                      >
                        {itemListBOM.map((i) => (
                          <MenuItem value={i?.itemId}>{i?.code}</MenuItem>
                        ))}
                      </Select>
                      {/* add rule to validate */}
                      {this.validator.message('item', item, `required`)}
                      {/* check isValid to show messages */}
                      {isSubmitForm &&
                        !this.validator.check(item, `required`) && (
                          <FormHelperText error>
                            {t('form.required')}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
              <Grid container>
                {/** name */}
                <Grid item xs={12} lg={6} md={6}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    flex={1}
                    mr={2}
                  >
                    <Box width={0.3}>
                      <label className={classes.labelItem}>
                        {t('bomProducingStep.item.bomName')}
                        <span className={classes.required}> *</span>
                      </label>
                    </Box>

                    <Box width={0.7} ml={2}>
                      <FormControl fullWidth>
                        <TextField
                          name="name"
                          id="name"
                          value={name}
                          margin="dense"
                          variant="outlined"
                          size="small"
                          onChange={(event) => onChangeTextField(this, event)}
                          inputProps={{ maxLength: 255 }}
                          disabled
                        />
                        {/* add rule to validate */}
                        {this.validator.message(
                          'name',
                          name,
                          `required|max:${TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX}`,
                        )}
                        {/* check isValid to show messages */}
                        {isSubmitForm &&
                          !this.validator.check(name, `required`) && (
                            <FormHelperText error>
                              {t('form.required')}
                            </FormHelperText>
                          )}

                        {isSubmitForm &&
                          !this.validator.check(
                            name,
                            `max:${TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX}`,
                          ) && (
                            <FormHelperText error>
                              {t('form.maxLength', {
                                max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                              })}
                            </FormHelperText>
                          )}
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>
                {/**itemName */}
                <Grid
                  item
                  xs={12}
                  lg={6}
                  md={6}
                  className={classes.displayFlex}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mr={1}
                    flex={1}
                  >
                    <Box width={0.3}>
                      <label className={classes.labelItem}>
                        {t('bomProducingStep.itemName')}
                        <span className={classes.required}> *</span>
                      </label>
                    </Box>

                    <Box width={0.7} ml={2}>
                      <FormControl fullWidth size="small">
                        <TextField
                          name="itemName"
                          id="itemName"
                          value={item?.name || ''}
                          margin="dense"
                          variant="outlined"
                          disabled={true}
                        ></TextField>
                        {/* add rule to validate */}
                        {this.validator.message('item', item, `required`)}
                        {/* check isValid to show messages */}
                        {isSubmitForm &&
                          !this.validator.check(item, `required`) && (
                            <FormHelperText error>
                              {t('form.required')}
                            </FormHelperText>
                          )}
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Grid container>
                {/**routing code */}
                <Grid item xs={12} lg={6} md={6}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mr={2}
                    flex={1}
                    mt={1}
                  >
                    <Box width={0.3}>
                      <label className={classes.labelItem}>
                        {t('bomProducingStep.item.routingCode')}
                        <span className={classes.required}> *</span>
                      </label>
                    </Box>

                    <Box width={0.7} ml={2}>
                      <FormControl fullWidth size="small">
                        <Select
                          name="routingCode"
                          labelId="demo-customized-select-label"
                          id="routingCode"
                          value={routingCode}
                          variant="outlined"
                          className={clsx(classes.widthBoxSelect)}
                          onChange={(event) => onChangeSelect(this, event)}
                          disabled={true}
                        >
                          {routingList.map((item) => (
                            <MenuItem value={item.code}>{item.name}</MenuItem>
                          ))}
                        </Select>
                        {/* add rule to validate */}
                        {this.validator.message(
                          'routingCode',
                          routingCode,
                          `required`,
                        )}
                        {/* check isValid to show messages */}
                        {isSubmitForm &&
                          !this.validator.check(routingCode, `required`) && (
                            <FormHelperText error>
                              {t('form.required')}
                            </FormHelperText>
                          )}
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Box
                className={clsx(classes.marginAuto, classes.marginLabel)}
                width={8 / 8}
              >
                <Divider />
                {/** BOM description */}
                <Box mt={2}>
                  <div className={clsx(classes.marginLabel)}>
                    <label className={classes.labelItem}>
                      {t('bomProducingStep.descriptionInput')}
                    </label>
                  </div>
                  <FormControl fullWidth>
                    <TextField
                      name="description"
                      id="description"
                      value={description}
                      margin="dense"
                      variant="outlined"
                      size="small"
                      onChange={(event) => onChangeTextField(this, event)}
                      disabled={isView}
                      multiline
                      rows={5}
                    />
                    {/* add rule to validate */}
                    {this.validator.message(
                      'description',
                      description,
                      `max:${TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX}`,
                    )}
                    {/* check isValid to show messages */}
                    {isSubmitForm &&
                      !this.validator.check(
                        description,
                        `max:${TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX}`,
                      ) && (
                        <FormHelperText error>
                          {t('form.maxLength', {
                            max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                          })}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Box>
                <ItemsSettingTable
                  parent={this}
                  items={items}
                  mode={this.state.mode}
                  isSubmitForm={isSubmitForm}
                  producingStepList={this.state.producingStepList}
                />
              </Box>
              <Box className={clsx(classes.marginAuto, classes.marginLabel)}>
                {this.renderActionButtons()}
              </Box>
            </Grid>
          </Box>
        </form>
        <Modal
          isOpen={isOpenConfirmModal}
          title={t('common.notify')}
          size="sm"
          onSubmit={modalAction}
          onClose={this.onCloseConfirmModal}
          submitLabel={t('common.yes')}
          closeLabel={t('common.no')}
          hideCancel
        >
          {t(confirmMessage)}
        </Modal>
      </Box>
    )
  }
}

const mapStateToProps = (state) => ({
  bomProducingStep: state.bomProducingStep,
  itemList: state.commonManagement.itemList,
  routingList: state.commonManagement.routingList,
  defineItem: state.defineItem,
  itemTypeList: state.itemTypeSetting.itemTypeList,
  defineBOM: state.defineBOM,
  BOMList: state.bom.BOMList,
})

const mapDispatchToProps = {
  getItems,
  getRoutings,
  getItemDetailsById,
  searchItemTypes,
  getBomByItem,
  confirmBomProducingStepById,
  createBomProducingStep,
  getBomProducingStepDetailsById,
  updateBomProducingStep,
  getBomProducingStepBomDetails,
  searchBOM,
  getBOMDetailsById,
  searchBomProducingStep,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(BomProducingStepForm)),
)
