import { Button as MuiButton, CircularProgress } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import clsx from 'clsx'
import { PropTypes } from 'prop-types'

import { useClasses } from '~/themes'

import Icon from '../Icon'
import style from './style'

const Button = ({
  loading,
  icon,
  children,
  className,
  color,
  variant,
  disabled,
  bold,
  ...props
}) => {
  const theme = useTheme()
  const classes = useClasses(style)
  const getIconColor = () => {
    if (variant === 'outlined') return theme.palette[color || 'primary'].main
    if (
      !color ||
      color === 'primary' ||
      color === 'secondary' ||
      color === 'error'
    )
      return theme.palette.primary.contrastText
    return theme.palette.text.main
  }

  return (
    <MuiButton
      className={clsx(
        className,
        {
          [classes.bold]: bold,
          [classes.disabled]: disabled,
          [classes.iconOnly]: icon && !children,
        },
        loading ? classes.loading : '',
      )}
      color={color}
      variant={variant}
      startIcon={
        icon ? (
          loading ? (
            <CircularProgress size={18} color="inherit" />
          ) : (
            <Icon name={icon} fill={getIconColor()} />
          )
        ) : (
          ''
        )
      }
      {...props}
    >
      {loading && !icon && (
        <CircularProgress size={18} color="inherit" sx={{ mr: 1 }} />
      )}
      {children}
    </MuiButton>
  )
}

Button.defaultProps = {
  children: '',
  color: 'primary',
  className: '',
  variant: 'contained',
  bold: true,
  disabled: false,
  loading: false,
}

Button.propTypes = {
  loading: PropTypes.bool,
  icon: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  bold: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.shape(),
    PropTypes.string,
  ]),
}

export default Button
