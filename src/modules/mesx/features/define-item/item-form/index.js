import React, { Component } from 'react'

import { AddCircle, RemoveCircleOutlined } from '@mui/icons-material'
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
} from '@mui/material'
import { Autocomplete } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import { withStyles } from '@mui/styles'
import clsx from 'clsx'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'

import Modal from '~/UNSAFE_components/shared/modal'
import {
  CODE_SETTINGS,
  DATE_TIME_12_HOURS_FORMAT,
  MODAL_MODE,
  NUMBER_FIELD_REQUIRED_SIZE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import DataTable from '~/components/DataTable'
import {
  getDetails,
  getItemGroups,
  getItemTypes,
  getItemUnits,
} from '~/modules/mesx/redux/actions/common.action'
import {
  createItem,
  getItemDetailsById,
  updateItem,
} from '~/modules/mesx/redux/actions/define-item.action'
import {
  formatDateTimeUtc,
  initCode,
  onChangeCodeField,
  onChangeTextField,
} from '~/utils'

import useStyles from './style'

const DEFAULT_DETAIL = {
  detailInfo: {
    id: '',
    name: '',
  },
  amount: 1,
}

class ItemForm extends Component {
  constructor(props) {
    super(props)

    this.codeSettings = CODE_SETTINGS.ITEM

    this.initialCode = initCode(this.codeSettings.DOMAIN)

    this.state = {
      code: this.initialCode,
      name: '',
      description: '',
      itemUnit: null,
      itemType: null,
      itemGroup: null,
      price: '',
      itemDetails: [{ ...DEFAULT_DETAIL }],
      createdAt: '',
      updatedAt: '',
      isDetailed: false,
      disableIsDetailed: false,
      isProductionObject: false,
      isHasBom: false,
      isSubmitForm: false,
    }

    const { t } = this.props

    this.MODAL_MAP_CONTENT = {
      CREATE: {
        title: t('defineItem.createModalTitle'),
        submitLabel: t('defineItem.createModalSubmitLabel'),
      },
      UPDATE: {
        title: t('defineItem.updateModalTitle'),
        submitLabel: t('defineItem.updateModalSubmitLabel'),
      },
      DETAIL: {
        title: t('defineItem.detailsModalTitle'),
        submitLabel: t('defineItem.detailsModalSubmitLabel'),
      },
    }

    this.detailColumns = [
      {
        field: 'id',
        headerName: '#',
        width: 80,
        sortable: false,
      },
      {
        field: 'name',
        headerName: t('defineItem.detailName'),
        width: 200,
        sortable: false,
      },
      {
        field: 'amount',
        headerName: t('common.amount'),
        width: 200,
        sortable: false,
      },
    ]

    this.validator = new SimpleReactValidator()
  }

  componentDidMount() {
    this.refreshData()
  }

  componentDidUpdate(prevProps, prevState) {
    // on modal open
    if (
      prevProps.isOpenModal !== this.props.isOpenModal &&
      this.props.isOpenModal
    ) {
      this.refreshData()
    }
    // on user id change
    if (
      prevProps.id !== this.props.id &&
      this.props.id &&
      this.props.isOpenModal
    ) {
      this.props.getItemDetailsById(this.props.id, (data) => {
        const {
          code,
          name,
          itemDetails,
          description,
          createdAt,
          updatedAt,
          itemGroup,
          itemType,
          itemUnit,
          isProductionObject,
          isHasBom,
          price,
        } = data
        const { detailList } = this.props.commonManagement
        const draftItemDetails = JSON.parse(JSON.stringify(itemDetails))
        const itemDetailsCopy = draftItemDetails.map((itemDetail) => {
          const detailId = itemDetail?.itemDetailId
          const findDetailList = detailList?.find(
            (detail) => detail?.id === detailId,
          )
          const originDetail = findDetailList ? findDetailList : null
          return {
            detailInfo: { id: originDetail?.id, name: originDetail?.name },
            amount: +itemDetail?.quantity,
          }
        })
        const isDetailed = draftItemDetails?.length > 0
        this.setState({
          code,
          name,
          itemDetails: itemDetailsCopy,
          description,
          createdAt,
          updatedAt,
          itemGroup,
          itemType,
          itemUnit,
          price,
          isDetailed,
          isProductionObject: isProductionObject,
          isHasBom,
          disableIsDetailed: !itemType?.hasItemDetail,
        })
      })
    }
    if (prevProps.id !== this.props.id && !this.props.id) {
      this.resetForm()
    }
  }

  refreshData = () => {
    this.props.getDetails({})
    this.props.getItemGroups()
    this.props.getItemTypes()
    this.props.getItemUnits()
  }

  onSubmit = () => {
    this.setState({ isSubmitForm: true })
    if (this.validator.allValid() && this.state.code !== this.initialCode) {
      const { name, code, description, price } = this.state
      const itemUnitId = this.state.itemUnit.id
      const itemTypeId = this.state.itemType.id
      const itemGroupId = this.state.itemGroup.id
      const itemDetails = this.state.itemDetails
        .filter((detail) => detail.detailInfo.id)
        .map((detail) => {
          return {
            detailId: detail.detailInfo.id,
            quantity: detail.amount,
          }
        })
      const params = {
        name,
        code,
        description,
        itemUnitId,
        itemTypeId,
        itemGroupId,
        itemDetails,
        isProductionObject: this.state.isProductionObject ? '1' : '0',
        price: +price,
      }
      if (this.props.modalMode === MODAL_MODE.CREATE) {
        this.props.createItem(params, () => {
          this.onCloseModal()
        })
      } else {
        params.id = this.props.id
        this.props.updateItem(params, () => {
          this.onCloseModal()
        })
      }
    }
  }

  onCloseModal = () => {
    // callback action from parent
    this.resetForm()
    this.props.handleCloseModal(true)
  }

  onCancelModal = () => {
    const { modalMode } = this.props
    if (modalMode === MODAL_MODE.CREATE) {
      this.resetForm()
    }
    if (modalMode === MODAL_MODE.UPDATE) {
      const {
        code,
        name,
        itemDetails,
        description,
        createdAt,
        updatedAt,
        itemGroup,
        itemType,
        itemUnit,
        price,
      } = this.props.defineItem.itemDetails
      const { detailList } = this.props.commonManagement
      const itemDetailsCopy0 = JSON.parse(JSON.stringify(itemDetails))
      const itemDetailsCopy = itemDetailsCopy0?.map((itemDetail) => {
        const detailId = itemDetail?.itemDetailId
        const findDetailList = detailList?.find(
          (detail) => detail?.id === detailId,
        )
        const originDetail = findDetailList ? findDetailList : null
        return {
          detailInfo: { id: originDetail?.id, name: originDetail?.name },
          amount: +itemDetail?.quantity,
        }
      })
      const isDetailed = itemDetailsCopy0?.length > 0
      this.setState({
        code,
        name,
        itemDetails: itemDetailsCopy,
        description,
        createdAt,
        updatedAt,
        itemGroup,
        itemType,
        itemUnit,
        price,
        isDetailed,
      })
    }
  }

  /**
   * Add product
   */
  onAddProduct = () => {
    this.setState({
      itemDetails: [...this.state.itemDetails, { ...DEFAULT_DETAIL }],
    })
  }
  resetForm = () => {
    this.setState({
      code: this.initialCode,
      name: '',
      description: '',
      itemUnit: null,
      itemType: null,
      itemGroup: null,
      price: '',
      itemDetails: [{ ...DEFAULT_DETAIL }],
      createdAt: '',
      updatedAt: '',
      isDetailed: false,
      disableIsDetailed: false,
      isProductionObject: false,
      isSubmitForm: false,
    })
  }

  onChangeItemAttribute = (key, value) => {
    this.setState({ [key]: value })
    if (key === 'itemType') {
      const disableIsDetailed = !value?.hasItemDetail

      this.setState({ disableIsDetailed })
      disableIsDetailed &&
        this.setState({
          isDetailed: false,
          itemDetails: [{ ...DEFAULT_DETAIL }],
        })
    }
  }
  /**
   * Remove product
   * @param {int} index
   */
  onRemoveProduct = (index) => {
    const itemDetails = [...this.state.itemDetails]
    itemDetails.splice(index, 1)
    this.setState({ itemDetails })
  }
  onChangeItemDetail = (index, key, value) => {
    const itemDetails = [...this.state.itemDetails]

    const itemToChange = itemDetails[index]
    itemToChange[key] = value
    itemDetails[index] = itemToChange
    this.setState({ itemDetails })
  }

  getProductRows = () => {
    return this.state.itemDetails.map((itemDetail) => {
      return { ...itemDetail.detailInfo, amount: itemDetail.amount }
    })
  }

  /**
   *
   * @param {*} event
   * @param {boolean} checked
   */
  onToggleIsDetailed = (event, checked) => {
    this.setState({ isDetailed: checked })
    !checked && this.setState({ itemDetails: [{ ...DEFAULT_DETAIL }] })
  }
  /**
   *
   * @param {*} event
   */
  onToggleIsProductionObject = (event) => {
    this.setState({ isProductionObject: !!event.target.checked })
  }

  render() {
    const {
      code,
      name,
      description,
      itemUnit,
      itemType,
      itemGroup,
      itemDetails,
      price,
      createdAt,
      updatedAt,
      isDetailed,
      isSubmitForm,
      disableIsDetailed,
      isProductionObject,
      isHasBom,
    } = this.state

    const { isOpenModal, modalMode, t, classes } = this.props

    const isView = modalMode === MODAL_MODE.DETAIL
    const isCreate = modalMode === MODAL_MODE.CREATE
    const isUpdate = modalMode === MODAL_MODE.UPDATE

    const modalContent = this.MODAL_MAP_CONTENT[modalMode]

    const { itemGroups, itemTypes, itemUnits } = this.props

    const { detailList } = this.props.commonManagement

    this.validator.purgeFields()
    return (
      <Modal
        size={'lg'}
        isOpen={isOpenModal}
        onClose={this.onCloseModal}
        onCancel={this.onCancelModal}
        onSubmit={this.onSubmit}
        title={modalContent.title}
        isOpenModal={isOpenModal}
        submitLabel={modalContent.submitLabel}
        hideCancel={isView}
        hideSubmit={isView}
      >
        <form>
          <Box className={clsx(classes.marginAuto)} width={6 / 7}>
            <div className={clsx(classes.boxItem, classes.marginLabel)}>
              <Box width={1 / 2} className={classes.boxItem}>
                <label className={classes.labelItem}>
                  {t('defineItem.code')}
                  <span className={this.props.classes.required}> *</span>
                </label>
                <Box width={2 / 3}>
                  <FormControl fullWidth>
                    <TextField
                      name="code"
                      id="code"
                      value={code}
                      margin="dense"
                      placeholder={t('defineItem.code')}
                      variant="outlined"
                      onChange={(event) => {
                        onChangeCodeField(
                          this,
                          event,
                          this.codeSettings.MAX_LENGTH,
                          this.codeSettings.PREFIX,
                          this.codeSettings.FILLED_CHARACTER,
                        )
                      }}
                      disabled={isView || isUpdate}
                    />
                    {/* add rule to validate */}
                    {/* check isValid to show messages */}
                    {this.state.isSubmitForm && code === this.initialCode && (
                      <FormHelperText error>
                        {t('form.required')}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
              </Box>
              <Box width={1 / 2} className={clsx(classes.boxItem)} ml={5}>
                <label className={classes.labelItem}>
                  {t('defineItem.name')}
                  <span className={this.props.classes.required}> *</span>
                </label>
                <Box width={2 / 3}>
                  <FormControl fullWidth>
                    <TextField
                      name="name"
                      id="name"
                      value={name}
                      margin="dense"
                      placeholder={t('defineItem.name')}
                      variant="outlined"
                      onChange={(event) => onChangeTextField(this, event)}
                      disabled={isView}
                    />
                    {/* add rule to validate */}
                    {this.validator.message(
                      'name',
                      name,
                      `required|max:${TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX}`,
                    )}
                    {/* check isValid to show messages */}
                    {this.state.isSubmitForm &&
                      !this.validator.check(name, `required`) && (
                        <FormHelperText error>
                          {t('form.required')}
                        </FormHelperText>
                      )}

                    {this.state.isSubmitForm &&
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
            </div>
            <div className={clsx(classes.boxItem, classes.marginLabel)}>
              <Box width={1 / 2} className={classes.boxItem}>
                <label className={classes.labelItem}>
                  {t('defineItem.typeCode')}
                  <span className={this.props.classes.required}> *</span>
                </label>
                <Box width={2 / 3}>
                  <FormControl fullWidth>
                    <Autocomplete
                      size="small"
                      name="itemType"
                      id="checkboxes-tags-demo"
                      value={itemType}
                      margin="dense"
                      variant="outlined"
                      options={itemTypes}
                      getOptionLabel={(option) => option.code}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      renderOption={(option, { selected }) => (
                        <React.Fragment>{option.code}</React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} variant="outlined" />
                      )}
                      onChange={(event, value) => {
                        if (value) {
                          this.onChangeItemAttribute('itemType', value)
                        }
                      }}
                      disabled={isView}
                    />
                    {/* add rule to validate */}
                    {this.validator.message(
                      `itemType`,
                      itemType?.id,
                      `required`,
                    )}
                    {/* check isValid to show messages */}
                    {isSubmitForm &&
                      !this.validator.check(itemType?.id, `required`) && (
                        <FormHelperText error>
                          {t('form.required')}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Box>
              </Box>
              <Box width={1 / 2} className={clsx(classes.boxItem)} ml={5}>
                <label className={classes.labelItem}>
                  {t('defineItem.typeName')}
                </label>
                <Box width={2 / 3}>
                  <FormControl fullWidth>
                    <TextField
                      name="itemType"
                      id="itemType"
                      value={itemType?.name}
                      margin="dense"
                      placeholder={t('defineItem.typeName')}
                      variant="outlined"
                      disabled={true}
                    ></TextField>
                  </FormControl>
                </Box>
              </Box>
            </div>
            <div className={clsx(classes.boxItem, classes.marginLabel)}>
              <Box width={1 / 2} className={classes.boxItem}>
                <label className={classes.labelItem}>
                  {t('defineItem.groupCode')}
                  <span className={this.props.classes.required}> *</span>
                </label>
                <Box width={2 / 3}>
                  <FormControl fullWidth>
                    <Autocomplete
                      size="small"
                      name="itemGroup"
                      id="checkboxes-tags-demo"
                      value={itemGroup}
                      margin="dense"
                      variant="outlined"
                      options={itemGroups}
                      getOptionLabel={(option) => option.code}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      renderOption={(option, { selected }) => (
                        <React.Fragment>{option.code}</React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} variant="outlined" />
                      )}
                      onChange={(event, value) => {
                        if (value) {
                          this.onChangeItemAttribute('itemGroup', value)
                        }
                      }}
                      disabled={isView}
                    />
                    {/* add rule to validate */}
                    {this.validator.message(
                      `itemGroup`,
                      itemGroup?.id,
                      `required`,
                    )}
                    {/* check isValid to show messages */}
                    {isSubmitForm &&
                      !this.validator.check(itemGroup?.id, `required`) && (
                        <FormHelperText error>
                          {t('form.required')}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Box>
              </Box>
              <Box width={1 / 2} className={clsx(classes.boxItem)} ml={5}>
                <label className={classes.labelItem}>
                  {t('defineItem.groupName')}
                </label>
                <Box width={2 / 3}>
                  <FormControl fullWidth>
                    <TextField
                      name="itemGroup"
                      id="itemGroup"
                      value={itemGroup?.name}
                      margin="dense"
                      placeholder={t('defineItem.groupName')}
                      variant="outlined"
                      disabled={true}
                    ></TextField>
                  </FormControl>
                </Box>
              </Box>
            </div>
            <div className={clsx(classes.boxItem, classes.marginLabel)}>
              <Box width={1 / 2} className={classes.boxItem}>
                <label className={classes.labelItem}>
                  {t('defineItem.unit')}
                  <span className={this.props.classes.required}> *</span>
                </label>
                <Box width={2 / 3}>
                  <FormControl fullWidth>
                    <Autocomplete
                      size="small"
                      name="itemUnit"
                      id="checkboxes-tags-demo"
                      value={itemUnit}
                      margin="dense"
                      variant="outlined"
                      options={itemUnits}
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
                          this.onChangeItemAttribute('itemUnit', value)
                        }
                      }}
                      disabled={isView}
                    />
                    {/* add rule to validate */}
                    {this.validator.message(
                      `itemUnit`,
                      itemUnit?.id,
                      `required`,
                    )}
                    {/* check isValid to show messages */}
                    {isSubmitForm &&
                      !this.validator.check(itemUnit?.id, `required`) && (
                        <FormHelperText error>
                          {t('form.required')}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Box>
              </Box>
              <Box width={1 / 2} className={clsx(classes.boxItem)} ml={5}>
                <label className={classes.labelItem}>
                  {t('defineItem.price')}
                </label>
                <Box width={2 / 3}>
                  <FormControl fullWidth>
                    <TextField
                      name="price"
                      id="price"
                      value={price}
                      margin="dense"
                      placeholder={t('defineItem.price')}
                      variant="outlined"
                      size="small"
                      onChange={(event) => onChangeTextField(this, event)}
                      disabled={isView}
                    />
                  </FormControl>
                </Box>
              </Box>
            </div>
            {/** Product list*/}
            <div className={clsx(classes.boxItem, classes.marginLabel)}>
              <Box width={1 / 2} className={classes.boxItem}>
                {!isView && (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isDetailed}
                        onChange={this.onToggleIsDetailed}
                        name="isDetailed"
                        color="primary"
                        disabled={disableIsDetailed}
                      />
                    }
                    label={t('defineItem.isDetailed') + '?'}
                  />
                )}
                {isView && (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isHasBom}
                        name="isHasBom"
                        color="primary"
                        disabled={isView}
                      />
                    }
                    label={t('defineItem.isHasBom') + '?'}
                  />
                )}
              </Box>
              <Box width={1 / 2} className={classes.boxItem} ml={5}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isProductionObject}
                      onChange={(event) =>
                        this.onToggleIsProductionObject(event)
                      }
                      name="isProductionObject"
                      color="primary"
                      disabled={isView}
                    />
                  }
                  label={t('defineItem.isProductionObject') + '?'}
                />
              </Box>
            </div>
            {isDetailed && (
              <>
                <Divider />
                <Box mb={2}>
                  <div className={clsx(classes.marginLabel)}>
                    <label className={classes.labelItem}>
                      {t('defineItem.detailList')}
                    </label>
                  </div>
                  {/* Product item  in CREATE and UPDATE*/}
                  {(isCreate || isUpdate) &&
                    itemDetails.map((detail, i) => (
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        key={i}
                        mb={1}
                      >
                        <Box className={classes.boxItem} mr={2} flex={1}>
                          <label className={classes.labelItem}>
                            {t('defineItem.detailName')}
                            <span className={this.props.classes.required}>
                              {' '}
                              *
                            </span>
                          </label>
                          <Box flex={1}>
                            <FormControl fullWidth>
                              <Autocomplete
                                size="small"
                                id="checkboxes-tags-demo"
                                variant="outlined"
                                options={detailList || []}
                                value={detail.detailInfo || {}}
                                getOptionLabel={(option) => option?.name}
                                isOptionEqualToValue={(option, value) =>
                                  option.id === value.id
                                }
                                renderOption={(option, { selected }) => (
                                  <React.Fragment>
                                    {option?.name}
                                  </React.Fragment>
                                )}
                                renderInput={(params) => (
                                  <TextField {...params} variant="outlined" />
                                )}
                                onChange={(event, value) =>
                                  this.onChangeItemDetail(
                                    i,
                                    'detailInfo',
                                    value,
                                  )
                                }
                                getOptionDisabled={(option) => {
                                  return itemDetails
                                    .map((item) => item?.detailInfo?.id)
                                    .includes(option.id)
                                }}
                              />
                              {/* add rule to validate */}
                              {isDetailed &&
                                this.validator.message(
                                  `name${i}`,
                                  detail?.detailInfo?.id,
                                  `required`,
                                )}
                              {/* check isValid to show messages */}
                              {isDetailed &&
                                isSubmitForm &&
                                !this.validator.check(
                                  detail?.detailInfo?.id,
                                  `required`,
                                ) && (
                                  <FormHelperText error>
                                    {t('form.required')}
                                  </FormHelperText>
                                )}
                            </FormControl>
                          </Box>
                        </Box>
                        <Box className={classes.boxItem} mr={2} flex={1}>
                          <label className={classes.labelItem}>
                            {t('defineItem.detailAmount')}
                          </label>
                          <Box flex={1}>
                            <FormControl fullWidth>
                              <TextField
                                name="amount"
                                id="amount"
                                value={detail.amount}
                                margin="dense"
                                variant="outlined"
                                size="small"
                                onChange={(event) =>
                                  this.onChangeItemDetail(
                                    i,
                                    'amount',
                                    +event.target.value,
                                  )
                                }
                                inputProps={{
                                  min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER
                                    .MIN,
                                }}
                                disabled={isView}
                                type="number"
                              />
                              {/* add rule to validate */}
                              {this.validator.message(
                                `amount${i}`,
                                detail.amount,
                                `numeric|integer|min:${NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN},num|max:${NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MAX},num`,
                              )}
                              {/* check isValid to show messages */}
                              {isSubmitForm &&
                                !this.validator.check(
                                  detail?.amount,
                                  `min:${NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN},num`,
                                ) && (
                                  <FormHelperText error>
                                    {t('form.minNumber', {
                                      min: NUMBER_FIELD_REQUIRED_SIZE
                                        .AMOUNT_INTEGER.MIN,
                                    })}
                                  </FormHelperText>
                                )}

                              {isSubmitForm &&
                                !this.validator.check(
                                  detail?.amount,
                                  `max:${NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MAX},num`,
                                ) && (
                                  <FormHelperText error>
                                    {t('form.maxNumber', {
                                      max: NUMBER_FIELD_REQUIRED_SIZE
                                        .AMOUNT_INTEGER.MAX,
                                    })}
                                  </FormHelperText>
                                )}

                              {isSubmitForm &&
                                !this.validator.check(
                                  detail?.amount,
                                  `numeric|integer`,
                                ) && (
                                  <FormHelperText error>
                                    {t('form.integer')}
                                  </FormHelperText>
                                )}
                            </FormControl>
                          </Box>
                        </Box>
                        <IconButton
                          type="button"
                          className={classes.iconButton}
                          onClick={() => this.onRemoveProduct(i)}
                          disabled={i === 0}
                          size="large"
                        >
                          <RemoveCircleOutlined />
                        </IconButton>
                      </Box>
                    ))}
                  {(isCreate || isUpdate) && (
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={this.onAddProduct}
                      startIcon={<AddCircle />}
                    >
                      {t('defineItem.addDetailButton')}
                    </Button>
                  )}
                  {/* Product item  in VIEW*/}
                  {isView && (
                    <DataTable
                      rows={this.getProductRows()}
                      columns={this.detailColumns}
                      hideFooter
                      minWidth={1000}
                    />
                  )}
                </Box>
              </>
            )}
            <Divider />
            {/** Block description */}
            <Box mt={2}>
              <div className={clsx(classes.marginLabel)}>
                <label className={classes.labelItem}>
                  {t('defineItem.descriptionInput')}
                </label>
              </div>
              <FormControl fullWidth>
                <TextField
                  name="description"
                  id="description"
                  value={description}
                  margin="dense"
                  variant="outlined"
                  placeholder={t('defineItem.descriptionInput')}
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
                {this.state.isSubmitForm &&
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

            {isView && (
              <Box display="flex">
                <Box fontWeight="bold" mr={2}>
                  {t('common.createdAt')}
                </Box>
                <Box
                  fontStyle="italic"
                  className={classes.textUppercase}
                  mr={4}
                >
                  {formatDateTimeUtc(createdAt, DATE_TIME_12_HOURS_FORMAT)}
                </Box>
                <Box fontWeight="bold" mr={2}>
                  {t('common.updatedAt')}
                </Box>
                <Box fontStyle="italic" className={classes.textUppercase}>
                  {formatDateTimeUtc(updatedAt, DATE_TIME_12_HOURS_FORMAT)}
                </Box>
              </Box>
            )}
          </Box>
        </form>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  commonManagement: state.commonManagement,
  defineItem: state.defineItem,
  itemGroups: state.appStore.itemGroups,
  itemTypes: state.appStore.itemTypes,
  itemUnits: state.appStore.itemUnits,
})

const mapDispatchToProps = {
  createItem,
  updateItem,
  getItemDetailsById,
  getItemGroups,
  getItemTypes,
  getItemUnits,
  getDetails,
}

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(ItemForm)),
)
