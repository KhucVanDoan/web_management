import React from 'react'
import clsx from 'clsx'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import useStyles from './style'
import { useTranslation } from 'react-i18next'

/**
 *
 * @param {*} props
 * @param {string} props.title Title of the modal
 * @param {boolean | string} props.size false|"xs"|"sm"|"md"|"lg"|"xl". Default "xl"
 * @param {boolean} props.isOpen Modal is open?
 * @param {string} props.children Content of the modal
 * @param {string} props.submitLabel Not required
 * @param {string} props.cancelLabel Not required
 * @param {string} props.onSubmit Handle on submit
 * @param {string} props.onClose Handle on close
 * @param {boolean} props.hideSubmit Hide submit button
 * @param {string} props.onCancel Handle on cancel
 * @returns {JSX.Element}
 */
const Modal = ({
  title,
  size = 'md',
  isOpen,
  submitLabel,
  cancelLabel,
  closeLabel,
  children,
  leftButton,
  onSubmit,
  onClose,
  onCancel,
  hideSubmit = false,
  hideClose = false,
  hideCancel = false,
}) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth={size}
        maxHeight={size}
        open={isOpen}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          className={clsx(classes.titleBox)}
          id="responsive-dialog-title"
        >
          {title}
          <div className={classes.closeBox}>
            <CloseIcon onClick={onClose} />
          </div>
        </DialogTitle>
        <DialogContent className={classes.contentBox}>{children}</DialogContent>
        <DialogActions>
          {leftButton}
          <div className={classes.centerSpace} />
          {!hideSubmit && (
            <Button
              variant="contained"
              color="primary"
              autoFocus
              onClick={onSubmit}
            >
              {submitLabel || t('modal.btnSubmit')}
            </Button>
          )}
          {!hideCancel && (
            <Button variant="contained" onClick={onCancel} autoFocus>
              {cancelLabel || t('modal.btnCancel')}
            </Button>
          )}
          {!hideClose && (
            <Button variant="contained" onClick={onClose} autoFocus>
              {closeLabel || t('modal.btnClose')}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Modal
