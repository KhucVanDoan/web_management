import React, { Component } from 'react'

import { FormHelperText } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { withStyles } from '@mui/styles'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'

import Modal from '~/UNSAFE_components/shared/modal'
import { MODAL_MODE, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import {
  createItemType,
  updateItemType,
  getItemTypeDetailsById,
} from '~/modules/mesx/redux/actions/item-type-setting.action'
import {
  onChangeTextField,
  formatDateTimeUtc,
  onChangeSelect,
  formatInput,
} from '~/utils'

import useStyles from './style'

class ItemTypeForm extends Component {
  /**
   *
   * @param {object} props
   * @param {int} props.id
   * @param {string} props.mode
   */
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      name: '',
      description: '',
      hasItemDetail: false,
      createdAt: '',
      updatedAt: '',
      isSubmitForm: false,
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
    //item-type-change
    if (prevProps.id !== this.props.id && this.props.isOpenModal) {
      this.props.getItemTypeDetailsById(this.props.id, (data) => {
        const { code, name, description, hasItemDetail, createdAt, updatedAt } =
          data
        this.setState({
          code,
          name,
          description,
          hasItemDetail,
          createdAt,
          updatedAt,
        })
      })
    }
    if (prevProps.id !== this.props.id && !this.props.id) {
      this.resetForm()
    }
  }

  onSubmit = () => {
    this.setState({ isSubmitForm: true })
    const { code, name, description, hasItemDetail } = this.state
    const params = {
      code: code.trim(),
      name: name.trim(),
      description: description.trim(),
      hasItemDetail: hasItemDetail ? '1' : '0',
    }
    if (this.validator.allValid()) {
      if (this.props.modalMode === MODAL_MODE.CREATE) {
        this.props.createItemType(params, () => {
          this.onCloseModal()
        })
      } else {
        params.id = this.props.id
        this.props.updateItemType(params, () => {
          this.onCloseModal()
        })
      }
    }
  }

  onCloseModal = () => {
    this.resetForm()

    // callback action from parent
    this.props.handleCloseModal(true)
  }

  onCancel = () => {
    const { modalMode } = this.props
    if (modalMode === MODAL_MODE.CREATE) {
      this.resetForm()
    }
    if (modalMode === MODAL_MODE.UPDATE) {
      const { code, name, description, hasItemDetail } =
        this.props.itemTypeSetting.itemTypeDetails
      const newState = JSON.parse(
        JSON.stringify({ code, name, description, hasItemDetail }),
      )
      this.setState(newState)
    }
  }

  resetForm = () => {
    this.setState({
      code: '',
      name: '',
      description: '',
      isSubmitForm: false,
      hasItemDetail: false,
    })
  }

  render() {
    const { code, name, description, hasItemDetail, createdAt, updatedAt } =
      this.state

    const { title, isOpenModal, submitLabel, modalMode, t, classes } =
      this.props
    const isView = modalMode === MODAL_MODE.DETAIL
    const isUpdate = modalMode === MODAL_MODE.UPDATE
    return (
      <Modal
        title={title}
        size={'sm'}
        isOpen={isOpenModal}
        submitLabel={submitLabel}
        onClose={this.onCloseModal}
        onSubmit={this.onSubmit}
        onCancel={this.onCancel}
        hideCancel={isView}
        hideSubmit={isView}
      >
        <form>
          <Box width={1} mt={2}>
            <div>
              <label className={this.props.classes.labelItem}>
                {t('itemTypeSetting.code')}
                <span className={this.props.classes.required}> *</span>
              </label>
            </div>
            <FormControl fullWidth>
              <TextField
                name="code"
                id="code"
                margin="dense"
                placeholder={t('itemTypeSetting.code')}
                onBlur={(event) => formatInput(this, event)}
                value={code}
                variant="outlined"
                size="small"
                disabled={isView || isUpdate}
                onChange={(event) => onChangeTextField(this, event)}
              />
              {/* add rule to validate */}
              {this.validator.message(
                'code',
                code,
                `required|alpha_num|max:${TEXTFIELD_REQUIRED_LENGTH.CODE_2.MAX}`,
              )}
              {/* check isValid to show messages */}
              {this.state.isSubmitForm &&
                !this.validator.check(code.trim(), 'required') && (
                  <FormHelperText error>{t('form.required')}</FormHelperText>
                )}

              {this.state.isSubmitForm &&
                !this.validator.check(code.trim(), 'alpha_num') && (
                  <FormHelperText error>{t('form.validCode')}</FormHelperText>
                )}

              {this.state.isSubmitForm &&
                !this.validator.check(
                  code.trim(),
                  `max:${TEXTFIELD_REQUIRED_LENGTH.CODE_2.MAX}`,
                ) && (
                  <FormHelperText error>
                    {t('form.maxLength', {
                      max: TEXTFIELD_REQUIRED_LENGTH.CODE_2.MAX,
                    })}
                  </FormHelperText>
                )}
            </FormControl>
          </Box>
          <Box width={1} mt={2}>
            <div>
              <label className={this.props.classes.labelItem}>
                {t('itemTypeSetting.name')}
                <span className={this.props.classes.required}> *</span>
              </label>
            </div>
            <FormControl fullWidth>
              <TextField
                name="name"
                id="name"
                margin="dense"
                placeholder={t('itemTypeSetting.name')}
                onBlur={(event) => formatInput(this, event)}
                value={name}
                variant="outlined"
                size="small"
                disabled={isView}
                onChange={(event) => onChangeTextField(this, event)}
              />
              {/* add rule to validate */}
              {this.validator.message(
                'name',
                name,
                `required|max:${TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX}`,
              )}
              {/* check isValid to show messages */}
              {this.state.isSubmitForm &&
                !this.validator.check(name.trim(), 'required') && (
                  <FormHelperText error>{t('form.required')}</FormHelperText>
                )}
              {this.state.isSubmitForm &&
                !this.validator.check(
                  name.trim(),
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
          <Box width={1} mt={2} flex={1} alignItems="center" display="flex">
            <div>
              <label className={this.props.classes.labelItem}>
                {t('itemTypeSetting.isItemTypeDetail')}
                <span className={this.props.classes.required}> *</span>
              </label>
            </div>
            <FormControl size="small">
              <Select
                name="hasItemDetail"
                id="hasItemDetail"
                variant="outlined"
                value={hasItemDetail}
                className={classes.widthBoxSelect}
                disabled={isView}
                onChange={(event) => onChangeSelect(this, event)}
              >
                <MenuItem value={false}>{t('common.no')}</MenuItem>
                <MenuItem value={true}>{t('common.yes')}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box width={1} mt={2}>
            <div>
              <label className={this.props.classes.labelItem}>
                {t('itemTypeSetting.description')}
              </label>
            </div>
            <FormControl fullWidth>
              <TextField
                name="description"
                id="description"
                margin="dense"
                variant="outlined"
                size="small"
                value={description}
                rows={5}
                multiline
                disabled={isView}
                placeholder={t('itemTypeSetting.description')}
                onChange={(event) => onChangeTextField(this, event)}
              />
            </FormControl>
            {!this.validator.check(
              description?.trim(),
              `max:${TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX}`,
            ) && (
              <FormHelperText error>
                {t('form.maxLength', {
                  max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                })}
              </FormHelperText>
            )}
          </Box>
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
                  <strong>{t('itemTypeSetting.createDate')}: </strong>{' '}
                  <span>{formatDateTimeUtc(createdAt)}</span>
                </label>
              </div>
              <div>
                <label>
                  <strong>{t('itemTypeSetting.updateDate')}: </strong>{' '}
                  <span>{formatDateTimeUtc(updatedAt)}</span>
                </label>
              </div>
            </Box>
          )}
        </form>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  itemTypeSetting: state.itemTypeSetting,
})

const mapDispatchToProps = {
  createItemType,
  updateItemType,
  getItemTypeDetailsById,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(ItemTypeForm)),
)
