import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material'
import { Formik, Form } from 'formik'
import { isEmpty } from 'lodash'
import { PropTypes } from 'prop-types'

import Button from '../Button'
import Icon from '../Icon'

const Dialog = ({
  title,
  maxWidth,
  fullWidth,
  open,
  children,
  renderFooter,
  onCancel,
  cancelLabel,
  cancelProps,
  onSubmit,
  submitLabel,
  submitProps,
  disableBackdropClick,
  noBorderBottom,
  formikProps,
  ...props
}) => {
  const DialogWrapper = ({ children }) =>
    !isEmpty(formikProps) ? (
      <Formik {...formikProps}>
        {() => (
          <Form
            style={{
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
            }}
          >
            {children}
          </Form>
        )}
      </Formik>
    ) : (
      children
    )
  const DialogInner = () => (
    <>
      <DialogContent
        dividers
        sx={{
          ...(noBorderBottom ? { borderBottom: 'none' } : {}),
        }}
      >
        {children}
      </DialogContent>
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
    </>
  )

  return (
    <MuiDialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open}
      onClose={(_, reason) => {
        if (reason === 'backdropClick' && disableBackdropClick) return
        onCancel && onCancel()
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
      <DialogWrapper>
        <DialogInner />
      </DialogWrapper>
    </MuiDialog>
  )
}

Dialog.defaultProps = {
  title: '',
  open: false,
  children: '',
  maxWidth: 'sm',
  fullWidth: true,
  disableBackdropClick: false,
  onCancel: null,
  cancelLabel: '',
  cancelProps: null,
  onSubmit: null,
  submitLabel: '',
  submitProps: null,
  noBorderBottom: false,
  formikProps: {},
}

Dialog.propTypes = {
  title: PropTypes.string,
  maxWidth: PropTypes.string,
  fullWidth: PropTypes.bool,
  open: PropTypes.bool,
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
  noBorderBottom: PropTypes.bool,
  formikProps: PropTypes.shape(),
}

export default Dialog
