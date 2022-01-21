import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography, Hidden } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useClasses } from 'themes'
import style from './style'
import IntroSlider from './IntroSlider'

const AuthLayout = ({ children }) => {
  const { t } = useTranslation()
  const classes = useClasses(style)

  return (
    <Box className={classes.root}>
      <Hidden mdDown>
        <Box className={classes.leftPanel}>
          <Box className={classes.slider}>
            <IntroSlider />
          </Box>
        </Box>
      </Hidden>
      <Box className={classes.rightPanel}>
        <Box className={classes.main}>
          <Box className={classes.box}>{children}</Box>
          <Box className={classes.copyright}>
            <Typography variant="subtitle">{t('page.copyright')}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

AuthLayout.defaultProps = {
  children: null,
}

AuthLayout.propTypes = {
  children: PropTypes.node,
}

export default AuthLayout
