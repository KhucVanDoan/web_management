import React, { useState } from 'react'

import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'

const Toolbar = (props) => {
  const { t } = useTranslation()
  const [zoom, setZoom] = useState(t('general.months'))

  const selectZoom = (zoom) => {
    setZoom(zoom)
    props.onChangeZoom(zoom)
  }
  
  return (
    <Box
      sx={{
        display: 'flex',
        '& button + button': {
          ml: 4 / 3,
        },
        mb: 2
      }}
    >
      <Button
        variant={zoom === t('general.days') ? "contained" : "outlined"}
        color={zoom === t('general.days') ? "primary" : "subText"}
        onClick={() => selectZoom(t('general.days'))}
      >
        {t('days')}
      </Button>
      <Button
        variant={zoom === t('general.months') ? "contained" : "outlined"}
        color={zoom === t('general.months') ? "primary" : "subText"}
        onClick={() => selectZoom(t('general.months'))}
      >
        {t('months')}
      </Button>
      <Button
        variant={zoom === t('general.years') ? "contained" : "outlined"}
        color={zoom === t('general.years') ? "primary" : "subText"}
        onClick={() => selectZoom(t('general.years'))}
      >
        {t('years')}
      </Button>
    </Box>
  )
}

export default Toolbar
