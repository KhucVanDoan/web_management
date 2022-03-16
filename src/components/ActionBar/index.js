import React from 'react'

import { Box } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'

const ActionBar = ({
  onBack,
  onCancel,
  mode,
  sx,
  children,
  elBefore,
  elAfter,
}) => {
  const { t } = useTranslation()

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        justifyContent: 'flex-end',
        py: 2,
        mb: -2,
        position: 'sticky',
        bottom: 0,
        zIndex: 20,
        background: '#fff',
        borderTop: `1px solid ${theme.palette.grayF4.main}`,

        '& button + button': {
          ml: 4 / 3,
        },
        ...sx,
      })}
    >
      {children ? (
        children
      ) : (
        <>
          {elBefore}

          {typeof onBack === 'function' && (
            <Button color="grayF4" onClick={onBack}>
              {t('actionBar.back')}
            </Button>
          )}

          {typeof onCancel === 'function' && (
            <Button
              variant="outlined"
              color="subText"
              sx={(theme) => ({
                border: `1px solid ${theme.palette.subText.a3} !important`,
              })}
              onClick={onCancel}
            >
              {t('actionBar.cancel')}
            </Button>
          )}

          {mode === MODAL_MODE.CREATE && (
            <Button type="submit" icon="save">
              {t('actionBar.create')}
            </Button>
          )}

          {mode === MODAL_MODE.UPDATE && (
            <Button type="submit" icon="save">
              {t('actionBar.save')}
            </Button>
          )}

          {elAfter}
        </>
      )}
    </Box>
  )
}

ActionBar.defaultProps = {
  children: null,
  elBefore: null,
  elAfter: null,
  sx: {},
}

ActionBar.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.shape(),
  onBack: PropTypes.func,
  onCancel: PropTypes.func,
  mode: PropTypes.oneOf([MODAL_MODE.CREATE, MODAL_MODE.UPDATE]),
  elBefore: PropTypes.node,
  elAfter: PropTypes.node,
}

export default ActionBar
