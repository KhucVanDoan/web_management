import React, { Component } from 'react'
import { withStyles } from '@mui/styles'
import { withTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import { MODAL_MODE, TEXTFIELD_REQUIRED_LENGTH } from 'common/constants'
import useStyles from './style'
import {
  createItemGroup,
  updateItemGroup,
  getItemGroupDetailsById,
} from 'modules/mesx/redux/actions/item-group-setting.action'
import { connect } from 'react-redux'
import { onChangeTextField, formatDateTimeUtc, formatInput } from 'utils'
import { FormHelperText } from '@mui/material'
import SimpleReactValidator from 'simple-react-validator'
import Modal from 'UNSAFE_components/shared/modal'

class ItemGroupForm extends Component {
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
      createdAt: '',
      updateAt: '',
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
    //item-group-change
    if (
      prevProps.id !== this.props.id &&
      this.props.id &&
      this.props.isOpenModal
    ) {
      this.props.getItemGroupDetailsById(this.props.id, (data) => {
        const { code, name, description, createdAt, updatedAt } = data
        this.setState({
          code,
          name,
          description,
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
    const { code, name, description } = this.state
    const params = {
      code: code.trim(),
      name: name.trim(),
      description: description.trim(),
    }
    if (this.validator.allValid()) {
      if (this.props.modalMode === MODAL_MODE.CREATE) {
        this.props.createItemGroup(params, () => {
          this.onCloseModal()
        })
      } else {
        params.id = this.props.id
        this.props.updateItemGroup(params, () => {
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
      const { code, name, description } =
        this.props.itemGroupSetting.itemGroupDetails
      const newState = JSON.parse(JSON.stringify({ code, name, description }))
      this.setState(newState)
    }
  }

  resetForm = () => {
    this.setState({
      code: '',
      name: '',
      description: '',
      isSubmitForm: false,
    })
  }

  render() {
    const { code, name, description, createdAt, updatedAt } = this.state

    const { title, isOpenModal, submitLabel, modalMode, t } = this.props
    const isView = modalMode === MODAL_MODE.DETAIL
    const isUpdate = modalMode === MODAL_MODE.UPDATE
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
                {t('itemGroupSetting.code')}
                <span className={this.props.classes.required}> *</span>
              </label>
            </div>
            <FormControl fullWidth>
              <TextField
                name="code"
                id="code"
                margin="dense"
                placeholder={t('itemGroupSetting.code')}
                value={code}
                onBlur={(event) => formatInput(this, event)}
                variant="outlined"
                size="small"
                disabled={isView || isUpdate}
                onChange={(event) => onChangeTextField(this, event)}
              />
              {/* add rule to validate */}
              {this.validator.message(
                'code',
                code,
                `required|alpha_num|max:${TEXTFIELD_REQUIRED_LENGTH.CODE_3.MAX}`,
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
                  `max:${TEXTFIELD_REQUIRED_LENGTH.CODE_3.MAX}`,
                ) && (
                  <FormHelperText error>
                    {t('form.maxLength', {
                      max: TEXTFIELD_REQUIRED_LENGTH.CODE_3.MAX,
                    })}
                  </FormHelperText>
                )}
            </FormControl>
          </Box>
          <Box width={1} mt={2}>
            <div>
              <label className={this.props.classes.labelItem}>
                {t('itemGroupSetting.name')}
                <span className={this.props.classes.required}> *</span>
              </label>
            </div>
            <FormControl fullWidth>
              <TextField
                name="name"
                id="name"
                margin="dense"
                placeholder={t('itemGroupSetting.name')}
                value={name}
                onBlur={(event) => formatInput(this, event)}
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
          <Box width={1} mt={2}>
            <div>
              <label className={this.props.classes.labelItem}>
                {t('itemGroupSetting.description')}
              </label>
            </div>
            <FormControl fullWidth>
              <TextField
                name="description"
                id="description"
                margin="dense"
                value={description}
                variant="outlined"
                size="small"
                disabled={isView}
                multiline
                rows={5}
                placeholder={t('itemGroupSetting.description')}
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
  itemGroupSetting: state.itemGroupSetting,
})

const mapDispatchToProps = {
  createItemGroup,
  updateItemGroup,
  getItemGroupDetailsById,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(ItemGroupForm)),
)
