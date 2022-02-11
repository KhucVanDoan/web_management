/* eslint-disable */

import React, { Component } from 'react'

import {
  Button,
  Divider,
  FormHelperText,
  Grid,
  MenuItem,
  Checkbox,
} from '@mui/material'
import { Autocomplete } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { withStyles } from '@mui/styles'
import clsx from 'clsx'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'

import Modal from '~/UNSAFE_components/shared/modal'
import BasicTabs from '~/UNSAFE_components/shared/tab'
import {
  MODAL_MODE,
  BOM_STATUS,
  BOM_STATUS_MAP,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Breadcrumbs } from '~/components/Breadcrumbs'
import Loading from '~/components/Loading'
import TableCollapse from '~/components/TableCollapse'
import { getItems, getRoutings } from '~/modules/mesx/redux/actions/common'
import {
  confirmBOMById,
  createBOM,
  getBOMDetailsById,
  updateBOM,
  getBOMStructureById,
} from '~/modules/mesx/redux/actions/define-bom.action'
import { getItemDetailsById } from '~/modules/mesx/redux/actions/define-item.action'
import { searchItemTypes } from '~/modules/mesx/redux/actions/item-type-setting'
import { ROUTE } from '~/modules/mesx/routes/config'
import { onChangeSelect, onChangeTextField, redirectRouter } from '~/utils'

import ItemsSettingTable from './items-setting-table'
import useStyles from './style'

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
class BOMForm extends Component {
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
      tabSelect: 0,
      bomTree: [],
      routingId: null,
      parentId: null,
      itemId: null,
      description: '',
      items: [{ ...DEFAULT_ITEM }],
      item: {},
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
    }
    const { t } = this.props
    this.columns = [
      {
        field: 'id',
        headerName: t('defineBOM.item.orderNumber'),
        align: 'center',
        width: 100,
        sortable: false,
        renderCell: (params) => {
          const { item } = params.row
          return item?.id
        },
      },
      {
        field: 'code',
        headerName: t('defineBOM.item.code'),
        align: 'center',
        renderCell: (params) => {
          const { item } = params.row
          return item?.code
        },
      },
      {
        field: 'name',
        headerName: t('defineBOM.item.name'),
        align: 'center',
        renderCell: (params) => {
          const { item } = params.row
          return item?.name
        },
      },
      {
        field: 'quantity',
        headerName: t('defineBOM.item.quantity'),
        align: 'center',
        filterable: false,
        sortable: false,
      },
      {
        field: 'itemUnit',
        headerName: t('defineBOM.item.unitType'),
        align: 'center',
        filterable: false,
        sortable: false,
        renderCell: (params) => {
          const { item } = params.row
          return item.itemUnit
        },
      },
      {
        field: 'itemtypeId',
        headerName: t('defineBOM.item.type'),
        align: 'center',
        filterable: false,
        sortable: false,
        renderCell: (params) => {
          const { itemTypeList } = this.props
          const { item } = params.row
          return itemTypeList.find((i) => i.id === item?.itemTypeId)?.name
        },
      },
      {
        field: 'isProductionObject',
        headerName: t('defineBOM.item.isProductionObject'),
        align: 'center',
        renderCell: (params) => {
          const { item } = params.row
          return (
            <Checkbox
              checked={item?.isProductionObject}
              name="isProductionObject"
              color="primary"
              disabled
            />
          )
        },
      },
    ]

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
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())
    const itemId = parseInt(params.itemId)
    this.props.getItemDetailsById(itemId, (res) => {
      this.setState({
        item: this.props.defineItem.itemDetails,
      })
    })
    const MODE_MAP = {
      [ROUTE.DEFINE_BOM.CREATE.PATH]: MODAL_MODE.CREATE,
      [ROUTE.DEFINE_BOM.DETAIL.PATH]: MODAL_MODE.DETAIL,
      [ROUTE.DEFINE_BOM.EDIT.PATH]: MODAL_MODE.UPDATE,
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
  }
  /**
   * Refresh init data
   */
  refreshData = () => {
    this.props.getRoutings()
    this.props.getItems()
    this.getBOMDetail()
  }

  getBOMDetail = () => {
    const { mode } = this.state
    const { id } = this.props.match.params
    // call api get details
    if (mode === MODAL_MODE.DETAIL || mode === MODAL_MODE.UPDATE) {
      this.props.getBOMDetailsById(id, (data) => {
        const {
          code,
          name,
          description,
          routingId,
          parentId,
          itemId,
          bomDetails,
          item,
          status,
          parentBom,
        } = data
        if (mode === MODAL_MODE.UPDATE && status !== BOM_STATUS.PENDING) {
          redirectRouter(ROUTE.DEFINE_BOM.DETAIL.PATH + `/${id}`)
        }
        const cloneBomItemsDetail = JSON.parse(JSON.stringify(bomDetails))

        this.setState({
          code,
          name,
          description,
          routingId,
          parentId,
          itemId,
          items: cloneBomItemsDetail?.map((e, index) => ({
            id: index,
            itemId: e.itemId,
            quantity: e.quantity,
            item: {
              code: e.item.code,
              name: e.item.name,
              isProductionObject: e.item.isProductionObject,
            },
          })),
          item,
          parentBom,
          status,
          mode: status === BOM_STATUS.REJECTED ? MODAL_MODE.UPDATE : mode,
        })
      })

      this.props.getBOMStructureById(id, (data) => {
        this.setState({ bomTree: data })
      })
    }
  }

  /**
   * on submit
   */
  onSubmit = () => {
    this.setState({ isSubmitForm: true })
    if (this.validator.allValid()) {
      const {
        code,
        name,
        description,
        routingId,
        items,
        item,
        createdByUser,
        createdByUserId,
      } = this.state
      const params = {
        code: code?.trim(),
        name,
        description,
        routingId,
        itemId: item.id ? item.id : item.itemId,
        bomItems: items.map((item) => ({
          id: item.itemId,
          quantity: +item.quantity,
        })),
        createdByUser,
        createdByUserId,
      }
      if (this.state.mode === MODAL_MODE.CREATE) {
        this.props.createBOM(params, this.backToList)
      } else {
        params.id = +this.props.match.params.id
        this.props.updateBOM(params, this.backToList)
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
      modalAction: this.submitConfirmBOM,
    })
  }
  /**
   * Submit confirm BOM
   */
  submitConfirmBOM = () => {
    this.props.confirmBOMById(this.props.match.params.id, () => {
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
      this.getBOMDetail()
    }
  }

  /**
   * Back to list screen
   */
  backToList = () => {
    redirectRouter(ROUTE.DEFINE_BOM.LIST.PATH)
  }
  /**
   * Get item object
   */
  getItemObject = (id) => {
    const { itemList } = this.props
    return itemList?.find((item) => item?.id === id)
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
          case BOM_STATUS.PENDING:
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
          case BOM_STATUS.APPROVED:
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
          case BOM_STATUS.REJECTED:
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
          case BOM_STATUS.CONFIRMED:
          case BOM_STATUS.IN_PROGRESS:
          case BOM_STATUS.COMPLETED:
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
      routingId: null,
      parentId: null,
      description: '',
      items: [{ ...DEFAULT_ITEM }],
      item: {},
      mode: MODAL_MODE.CREATE,
      isSubmitForm: false,
      pageSize: 10,
      page: 1,
      isOpenConfirmModal: false,
      confirmMessage: '',
      modalConfirmType: '',
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
        route: ROUTE.DEFINE_BOM.LIST.PATH,
        title: ROUTE.DEFINE_BOM.LIST.TITLE,
      },
    ]

    const id = this.props.match.params.id

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_BOM.CREATE.PATH,
          title: ROUTE.DEFINE_BOM.CREATE.TITLE,
        })
        break
      case MODAL_MODE.DETAIL:
        breadcrumb.push({
          route: ROUTE.DEFINE_BOM.DETAIL.PATH + `/${id}`,
          title: ROUTE.DEFINE_BOM.DETAIL.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_BOM.EDIT.PATH + `/${id}`,
          title: ROUTE.DEFINE_BOM.EDIT.TITLE,
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
        return ROUTE.DEFINE_BOM.CREATE.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.DEFINE_BOM.DETAIL.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_BOM.EDIT.TITLE
      default:
    }
  }
  onChangeItem = (key, value) => {
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
      routingId,
      description,
      items,
      tabSelect,
      item,
      status,
      isSubmitForm,
      mode,
      isOpenConfirmModal,
      confirmMessage,
      modalAction,
      bomTree,
      page,
      pageSize,
    } = this.state
    const { t, bom, classes, itemList, routingList } = this.props

    const itemListBOM = itemList.filter(
      (i) => i.isProductionObject === true && !i.isHasBom,
    )
    const isView = mode === MODAL_MODE.DETAIL
    const isUpdate = mode === MODAL_MODE.UPDATE
    this.validator.purgeFields()
    return (
      <Box>
        <Loading open={bom?.isLoading} />
        <Breadcrumbs breadcrumbs={this.getBreadcrumb()} />
        <h2>{t('menu.' + this.getTitle())}</h2>
        <form>
          <Box className={clsx(classes.marginAuto, classes.marginLabel)}>
            <Divider />
            {status >= 0 && (
              <Box display="flex" justifyContent="space-between">
                <Box></Box>
                <Box
                  mt={1}
                  p={1}
                  className={clsx(classes.statusBox, {
                    [classes.blueText]: !(status === BOM_STATUS.REJECTED),
                    [classes.redText]: status === BOM_STATUS.REJECTED,
                  })}
                  mr={3}
                >
                  {t(BOM_STATUS_MAP[status])}
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
                      {t('defineBOM.bomCode')}
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
                        disabled={isUpdate || isView}
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
                      {t('defineBOM.item.name')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth size="small">
                      <Autocomplete
                        size="small"
                        name="itemName"
                        id="itemName"
                        value={item}
                        margin="dense"
                        variant="outlined"
                        options={itemListBOM}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        renderOption={(option, { selected }) => (
                          <React.Fragment>{option.name}</React.Fragment>
                        )}
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" />
                        )}
                        onChange={(event, value) => {
                          if (value) {
                            this.onChangeItem('item', value)
                          }
                        }}
                        getOptionDisabled={(option) => {
                          return itemListBOM
                            .map((item) => item?.itemId)
                            .includes(option?.id)
                        }}
                        disabled={isView}
                      />
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
                        {t('defineBOM.bomName')}
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
                          disabled={isView}
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
                        {t('defineBOM.itemCode')}
                        <span className={classes.required}> *</span>
                      </label>
                    </Box>

                    <Box width={0.7} ml={2}>
                      <FormControl fullWidth size="small">
                        <TextField
                          name="itemCode"
                          id="itemCode"
                          value={item?.code}
                          margin="dense"
                          variant="outlined"
                          disabled={true}
                        ></TextField>
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
                  >
                    <Box width={0.3}>
                      <label className={classes.labelItem}>
                        {t('defineBOM.routingCode')}
                        <span className={classes.required}> *</span>
                      </label>
                    </Box>

                    <Box width={0.7} ml={2}>
                      <FormControl fullWidth size="small">
                        <Select
                          name="routingId"
                          labelId="demo-customized-select-label"
                          id="routingId"
                          value={routingId}
                          variant="outlined"
                          className={clsx(classes.widthBoxSelect)}
                          onChange={(event) => onChangeSelect(this, event)}
                          disabled={isView}
                        >
                          {routingList.map((item) => (
                            <MenuItem value={item.id}>{item.code}</MenuItem>
                          ))}
                        </Select>
                        {/* add rule to validate */}
                        {this.validator.message(
                          'routingId',
                          routingId,
                          `required`,
                        )}
                        {/* check isValid to show messages */}
                        {isSubmitForm &&
                          !this.validator.check(routingId, `required`) && (
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
                      {t('defineBOM.descriptionInput')}
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
              </Box>
              <BasicTabs>
                <ItemsSettingTable
                  parent={this}
                  items={items}
                  currentItemId={item?.id}
                  isSubmitForm={isSubmitForm}
                >
                  {t('defineBOM.itemDetails')}
                </ItemsSettingTable>
                <TableCollapse
                  rows={bomTree}
                  pageSize={pageSize}
                  page={page}
                  mode={mode}
                  columns={this.columns}
                  isRoot={true}
                  isView={true}
                >
                  {t('defineBOM.BOMStructure')}
                </TableCollapse>
              </BasicTabs>
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
  defineBOM: state.defineBOM,
  itemList: state.commonManagement.itemList,
  routingList: state.commonManagement.routingList,
  defineItem: state.defineItem,
  itemTypeList: state.itemTypeSetting.itemTypeList,
})

const mapDispatchToProps = {
  confirmBOMById,
  createBOM,
  getBOMDetailsById,
  updateBOM,
  getItems,
  getRoutings,
  getItemDetailsById,
  getBOMStructureById,
  searchItemTypes,
}

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(BOMForm)),
)
