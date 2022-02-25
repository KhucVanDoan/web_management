import React from 'react'

import { Typography, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { getCurrentModule } from '~/utils/menu'

const ColorStatus = ({ isContain, value, options }) => {
  const theme = useTheme()
  const { pathname } = useLocation()

  const currentModule = getCurrentModule(pathname)
  const { t } = useTranslation([currentModule])
  const genStatus = options.find((item) => item.id === value)

  return (
    <>
      {genStatus &&
        (isContain ? (
          <Box
            sx={{
              background: theme.palette.status[genStatus?.color].main,
              borderRadius: '3px',
              p: '0 8px',
              width: 'fit-content',
            }}
          >
            <Typography
              variant="body2"
              color={`status.${genStatus?.color}.contrast`}
            >
              {t(genStatus?.text || genStatus?.name)}
            </Typography>
          </Box>
        ) : (
          <Typography variant="body2" color={`status.${genStatus?.color}.main`}>
            {t(genStatus?.text || genStatus?.name)}
          </Typography>
        ))}
    </>
  )
}

ColorStatus.defaultProps = {
  isContain: false,
  value: 0,
  options: [],
}

ColorStatus.propTypes = {
  isContain: PropTypes.bool,
  value: PropTypes.number,
  options: PropTypes.array,
}

export default ColorStatus
