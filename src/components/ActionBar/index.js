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
  disableSaveButton,
}) => {
  const { t } = useTranslation()

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        justifyContent: 'flex-end',
        py: 2,
        mb: -2,
        mt: 2,
        position: 'sticky',
        bottom: 0,
        zIndex: 100,
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
            <Button variant="outlined" color="subText" onClick={onCancel}>
              {t('actionBar.cancel')}
            </Button>
          )}

          {mode === MODAL_MODE.CREATE && (
            <Button type="submit" icon="save" disabled={disableSaveButton}>
              {t('actionBar.create')}
            </Button>
          )}

          {mode === MODAL_MODE.UPDATE && (
            <Button type="submit" icon="save" disabled={disableSaveButton}>
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
  disableSaveButton: false,
}

ActionBar.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.shape(),
  onBack: PropTypes.func,
  onCancel: PropTypes.func,
  mode: PropTypes.oneOf([MODAL_MODE.CREATE, MODAL_MODE.UPDATE]),
  elBefore: PropTypes.node,
  elAfter: PropTypes.node,
  disableSaveButton: PropTypes.bool,
}

export default ActionBar
