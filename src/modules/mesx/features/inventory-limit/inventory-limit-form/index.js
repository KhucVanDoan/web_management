import React, { Component } from 'react'

import { FormHelperText, Grid, MenuItem, Select } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { withStyles } from '@mui/styles'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'

import Modal from '~/UNSAFE_components/shared/modal'
import {
  MODAL_MODE,
  NOTIFICATION_TYPE,
  NUMBER_FIELD_REQUIRED_SIZE,
} from '~/common/constants'
import {
  searchItems,
  getItemDetailsById,
} from '~/modules/mesx/redux/actions/define-item.action'
import {
  createInventoryLimit,
  updateInventoryLimit,
  getInventoryLimitDetailsById,
} from '~/modules/mesx/redux/actions/inventory-limit.action'
import { onChangeTextField, onChangeSelect, formatInput } from '~/utils'

import useStyles from './style'

class InventoryLimitForm extends Component {
  /**
   *
   * @param {object} props
   * @param {int} props.id
   * @param {string} props.mode
   */
  constructor(props) {
    super(props)
    this.state = {
      itemId: '',
      minLimit: 0,
      limit: 0,
      maxLimit: 0,
      isSubmitForm: false,
      itemOject: [],
    }
    this.validator = new SimpleReactValidator()
  }
  /**
   * componentDidMount
   */
  componentDidMount() {
    this.getListItem()
  }

  /**
   *
   * @param {*} prevProps
   * @param {*} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    //item-group-change
    if (
      prevProps.id !== this.props.id &&
      this.props.id &&
      this.props.isOpenModal
    ) {
      this.props.getInventoryLimitDetailsById(this.props.id, (data) => {
        const { item, inventoryLimit, minInventoryLimit, maxInventoryLimit } =
          data
        this.setState({
          itemId: item?.id,
          itemName: item?.name,
          itemTypeName: item?.itemType.name,
          itemUnitName: item.itemUnit.name,
          minLimit: minInventoryLimit,
          limit: inventoryLimit,
          maxLimit: maxInventoryLimit,
          itemOject: [
            {
              id: item?.id,
              code: item?.code,
            },
          ],
        })
      })
    }
    if (prevProps.id !== this.props.id && !this.props.id) {
      this.resetForm()
    }
  }

  onSubmit = () => {
    this.setState({ isSubmitForm: true })
    const { itemId, minLimit, limit, maxLimit } = this.state
    const params = {
      itemId: itemId,
      minInventoryLimit: parseFloat(minLimit),
      inventoryLimit: parseFloat(limit),
      maxInventoryLimit: parseFloat(maxLimit),
    }
    if (this.validator.allValid() && this.onSubmitCheckNumber()) {
      if (this.props.modalMode === MODAL_MODE.CREATE) {
        this.props.createInventoryLimit(params, () => {
          this.onCloseModal()
        })
      } else {
        params.id = this.props.id
        this.props.updateInventoryLimit(params, () => {
          this.onCloseModal()
        })
      }
    }
  }
  getListItem = () => {
    const { keyword, page, pageSize, filters, sort } = this.state

    const filterData = filters?.map((item) => ({
      column: item.field,
      text: '' + item?.value?.trim(),
    }))

    const sortData = sort
      ? [
          {
            column: sort?.orderBy,
            order: sort?.order?.toUpperCase(),
          },
        ]
      : []

    const params = {
      keyword: '',
      page,
      limit: pageSize,
      filter: JSON.stringify(filterData),
      sort: JSON.stringify(sortData),
      isGetAll: 1,
      inventoryNorms: true,
    }
    this.props.searchItems(params)
  }
  onCloseModal = () => {
    this.resetForm()
    // callback action from parent
    this.props.handleCloseModal(true)
    this.getListItem()
  }
  onChangeItem = (event) => {
    onChangeSelect(this, event)
    const id = event.target?.value
    this.props.getItemDetailsById(id, (data) => {
      const { name, itemUnit, itemType } = data
      this.setState({
        itemName: name,
        itemTypeName: itemType.name,
        itemUnitName: itemUnit.name,
      })
    })
  }
  onCancel = () => {
    const { modalMode } = this.props
    if (modalMode === MODAL_MODE.CREATE) {
      this.resetForm()
    }
    if (modalMode === MODAL_MODE.UPDATE) {
      const { item, inventoryLimit, minInventoryLimit, maxInventoryLimit } =
        this.props.inventoryLimit.inventoryLimitDetails
      this.setState({
        itemId: item?.id,
        itemName: item?.name,
        itemTypeName: item?.itemType.name,
        itemUnitName: item.itemUnit.name,
        minLimit: minInventoryLimit,
        limit: inventoryLimit,
        maxLimit: maxInventoryLimit,
      })
    }
  }

  resetForm = () => {
    this.setState({
      itemId: null,
      itemName: '',
      itemTypeName: '',
      itemUnitName: '',
      minLimit: 0,
      limit: 0,
      maxLimit: 0,
    })
  }
  checkThanZero = (number) => {
    const { t } = this.props
    if (+number < 0) {
      return (
        <FormHelperText error>{t('inventoryLimit.thanZero')}</FormHelperText>
      )
    }
    return false
  }
  checkMinLimit = (limit: number) => {
    const { t } = this.props
    const { minLimit } = this.state
    if (+minLimit > +limit) {
      return (
        <FormHelperText error>
          {t('inventoryLimit.minThanLimit')}
        </FormHelperText>
      )
    }
    return false
  }
  checkLimit = (limit: number) => {
    const { t } = this.props
    const { minLimit, maxLimit } = this.state
    if (+minLimit > +limit) {
      return (
        <FormHelperText error>
          {t('inventoryLimit.minThanLimit')}
        </FormHelperText>
      )
    }
    if (+limit > +maxLimit) {
      return (
        <FormHelperText error>
          {t('inventoryLimit.limitThanMax')}
        </FormHelperText>
      )
    }
    return false
  }
  checkMaxLimit = (maxLimit) => {
    const { t } = this.props
    const { limit } = this.state
    if (+limit > +maxLimit) {
      return (
        <FormHelperText error>
          {t('inventoryLimit.limitThanMax')}
        </FormHelperText>
      )
    }
    return false
  }
  onSubmitCheckNumber = () => {
    const { minLimit, limit, maxLimit } = this.state
    if (
      !this.checkThanZero(limit) &&
      !this.checkThanZero(minLimit) &&
      !this.checkThanZero(maxLimit) &&
      !this.checkLimit(limit) &&
      !this.checkMaxLimit(maxLimit) &&
      !this.checkMinLimit(minLimit)
    ) {
      return true
    }
    return false
  }
  render() {
    const {
      itemId,
      itemName,
      itemTypeName,
      itemUnitName,
      minLimit,
      limit,
      maxLimit,
      itemOject,
      isSubmitForm,
    } = this.state
    const { title, isOpenModal, submitLabel, modalMode, t, defineItem } =
      this.props
    const isView = modalMode === MODAL_MODE.DETAIL
    const isCreate = modalMode === MODAL_MODE.CREATE
    let listItem
    if (!isCreate) {
      listItem = itemOject
      defineItem?.itemList.map((item) => listItem.push(item))
    } else {
      listItem = []
      defineItem?.itemList.map((item) => listItem.push(item))
    }

    return (
      <Modal
        title={title}
        size={'sm'}
        isOpen={isOpenModal}
        submitLabel={submitLabel}
        onClose={this.onCloseModal}
        onCancel={this.onCancel}
        onSubmit={this.onSubmit}
        hideCancel={isView}
        hideSubmit={isView}
      >
        <form>
          <Box width={1} mt={2}>
            <div>
              <label className={this.props.classes.labelItem}>
                {t('inventoryLimit.itemCode')}
                <span className={this.props.classes.required}> *</span>
              </label>
            </div>
            <FormControl fullWidth>
              <Select
                name="itemId"
                labelId="demo-customized-select-label"
                id="itemId"
                variant="outlined"
                value={itemId}
                onChange={this.onChangeItem}
                disabled={isView}
              >
                {listItem?.map((item) => (
                  <MenuItem value={item.id}>{item.code}</MenuItem>
                ))}
              </Select>
              {/* add rule to validate */}
              {this.validator.message('itemId', itemId, `required`)}
              {/* check isValid to show messages */}
              {isSubmitForm && !this.validator.check(itemId, 'required') && (
                <FormHelperText error>{t('form.required')}</FormHelperText>
              )}
            </FormControl>
          </Box>
          <Grid container>
            <Grid item xs={12} lg={4} md={4}>
              <Box width={1} mt={2}>
                <div>
                  <label className={this.props.classes.labelItem}>
                    {t('inventoryLimit.itemName')}
                  </label>
                </div>
                <FormControl fullWidth>
                  <TextField
                    name="name"
                    id="name"
                    margin="dense"
                    value={itemName}
                    onBlur={(event) => formatInput(this, event)}
                    variant="outlined"
                    size="small"
                    onChange={(event) => onChangeTextField(this, event)}
                    disabled
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} lg={4} md={4}>
              <Box width={1} mt={2}>
                <div>
                  <label className={this.props.classes.labelItem}>
                    {t('inventoryLimit.itenUnit')}
                  </label>
                </div>
                <FormControl fullWidth>
                  <TextField
                    name="name"
                    id="name"
                    margin="dense"
                    value={itemUnitName}
                    onBlur={(event) => formatInput(this, event)}
                    variant="outlined"
                    size="small"
                    onChange={(event) => onChangeTextField(this, event)}
                    disabled
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} lg={4} md={3}>
              <Box width={1} mt={2}>
                <div>
                  <label className={this.props.classes.labelItem}>
                    {t('inventoryLimit.itemType')}
                  </label>
                </div>
                <FormControl fullWidth>
                  <TextField
                    name="name"
                    id="name"
                    margin="dense"
                    value={itemTypeName}
                    onBlur={(event) => formatInput(this, event)}
                    variant="outlined"
                    size="small"
                    onChange={(event) => onChangeTextField(this, event)}
                    disabled
                  />
                </FormControl>
              </Box>
            </Grid>
          </Grid>

          <Box width={1} mt={2}>
            <div>
              <label className={this.props.classes.labelItem}>
                {t('inventoryLimit.inventoryLimitDown')}
              </label>
            </div>
            <FormControl fullWidth>
              <TextField
                name="minLimit"
                id="minLimit"
                margin="dense"
                value={minLimit}
                onBlur={(event) => formatInput(this, event)}
                variant="outlined"
                size="small"
                onChange={(event) => onChangeTextField(this, event)}
                type="number"
                disabled={isView}
                inputProps={{
                  min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
                }}
              />
              {this.validator.message('minLimit', minLimit, `required`)}
              {isSubmitForm && (
                <>
                  {this.checkMinLimit(minLimit)}
                  {this.checkThanZero(minLimit)}
                </>
              )}
              {isSubmitForm && !this.validator.check(minLimit, 'required') && (
                <FormHelperText error>{t('form.required')}</FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box width={1} mt={2}>
            <div>
              <label className={this.props.classes.labelItem}>
                {t('inventoryLimit.inventoryLimit')}
              </label>
            </div>
            <FormControl fullWidth>
              <TextField
                name="limit"
                id="limit"
                margin="dense"
                value={limit}
                onBlur={(event) => formatInput(this, event)}
                variant="outlined"
                size="small"
                onChange={(event) => onChangeTextField(this, event)}
                type="number"
                disabled={isView}
                inputProps={{
                  min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
                }}
              />
              {this.validator.message('limit', limit, `limit`)}
              {isSubmitForm && (
                <>
                  {this.checkLimit(limit)}
                  {this.checkThanZero(limit)}
                </>
              )}
              {isSubmitForm && !this.validator.check(limit, 'required') && (
                <FormHelperText error>{t('form.required')}</FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box width={1} mt={2}>
            <div>
              <label className={this.props.classes.labelItem}>
                {t('inventoryLimit.inventoryLimitUp')}
              </label>
            </div>
            <FormControl fullWidth>
              <TextField
                name="maxLimit"
                id="maxLimit"
                margin="dense"
                value={maxLimit}
                onBlur={(event) => formatInput(this, event)}
                variant="outlined"
                size="small"
                onChange={(event) => onChangeTextField(this, event)}
                type="number"
                disabled={isView}
                inputProps={{
                  min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
                }}
              />
              {this.validator.message('maxLimit', maxLimit, `maxLimit`)}
              {isSubmitForm && (
                <>
                  {this.checkMaxLimit(maxLimit)}
                  {this.checkThanZero(maxLimit)}
                </>
              )}
              {isSubmitForm && !this.validator.check(maxLimit, 'required') && (
                <FormHelperText error>{t('form.required')}</FormHelperText>
              )}
            </FormControl>
          </Box>
        </form>
      </Modal>
    )
  }
}
const mapStateToProps = (state) => ({
  itemGroupSetting: state.itemGroupSetting,
  defineItem: state.defineItem,
  inventoryLimit: state.inventoryLimit,
})

const mapDispatchToProps = {
  createInventoryLimit,
  updateInventoryLimit,
  getInventoryLimitDetailsById,
  searchItems,
  getItemDetailsById,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(InventoryLimitForm)),
)
