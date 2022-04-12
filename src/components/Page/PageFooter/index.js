import React from 'react'

import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { useClasses } from '~/themes'

import style from './style'

const PageFooter = () => {
  const classes = useClasses(style)
  const { t } = useTranslation()

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle" sx={{ width: '100%' }}>
        {t('page.copyright')}
      </Typography>
    </Box>
  )
}

export default PageFooter
