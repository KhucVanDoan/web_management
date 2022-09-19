import React from 'react'

import { Box, Hidden } from '@mui/material'
import PropTypes from 'prop-types'

// import { useTranslation } from 'react-i18next'
import LogoAvenue from '~/assets/images/auth/Logo-Avenue.png'
import { useClasses } from '~/themes'

// import IntroSlider from './IntroSlider'
import style from './style'

const AuthLayout = ({ children }) => {
  // const { t } = useTranslation()
  const classes = useClasses(style)

  return (
    <Box className={classes.root}>
      <Hidden mdDown>
        <Box className={classes.leftPanel}>
          <Box className={classes.logo}>
            {/* <IntroSlider /> */}
            <img src={LogoAvenue} alt="logo" />
          </Box>
        </Box>
      </Hidden>
      <Box className={classes.rightPanel}>
        <Box className={classes.main}>
          <Box className={classes.box}>{children}</Box>
          {/* <Box className={classes.copyright}>
            <Typography variant="subtitle">{t('page.copyright')}</Typography>
          </Box> */}
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
