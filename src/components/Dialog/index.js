import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material'
import { PropTypes } from 'prop-types'
import Icon from '../Icon'
import Button from '../Button'

const Dialog = ({
  title,
  maxWidth,
  fullWidth,
  open,
  children,
  renderFooter,
  scroll,
  onCancel,
  cancelLabel,
  cancelProps,
  onSubmit,
  submitLabel,
  submitProps,
  disableBackdropClick,
  ...props
}) => {
  return (
    <MuiDialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open}
      onClose={(_, reason) => {
        if (reason === 'backdropClick' && disableBackdropClick) return
        onCancel()
      }}
      {...props}
    >
      <DialogTitle>
        {title}
        {onCancel && (
          <IconButton onClick={onCancel}>
            <Icon name="close" sx={{ width: 18, height: 18 }} />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      {(cancelLabel || submitLabel || typeof renderFooter === 'function') && (
        <DialogActions>
          {renderFooter ? (
            renderFooter()
          ) : (
            <>
              {cancelLabel && (
                <Button
                  onClick={onCancel}
                  color="grayF4"
                  bold={false}
                  {...cancelProps}
                >
                  {cancelLabel}
                </Button>
              )}
              {submitLabel && (
                <Button onClick={onSubmit} {...submitProps}>
                  {submitLabel}
                </Button>
              )}
            </>
          )}
        </DialogActions>
      )}
    </MuiDialog>
  )
}

Dialog.defaultProps = {
  title: '',
  open: false,
  children: '',
  maxWidth: 'sm',
  fullWidth: true,
  scroll: true,
  disableBackdropClick: false,
  onCancel: null,
  cancelLabel: '',
  cancelProps: null,
  onSubmit: null,
  submitLabel: '',
  submitProps: null,
}

Dialog.propTypes = {
  title: PropTypes.string,
  maxWidth: PropTypes.string,
  fullWidth: PropTypes.bool,
  open: PropTypes.bool,
  scroll: PropTypes.bool,
  onCancel: PropTypes.func,
  cancelLabel: PropTypes.string,
  cancelProps: PropTypes.shape(),
  onSubmit: PropTypes.func,
  submitLabel: PropTypes.string,
  submitProps: PropTypes.shape(),
  disableBackdropClick: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.shape(),
    PropTypes.string,
  ]),
  renderFooter: PropTypes.func,
}

export default Dialog
