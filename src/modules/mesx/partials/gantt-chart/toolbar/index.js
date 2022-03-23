import React, { useState } from 'react'

import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'

const Toolbar = (props) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const [zoom, setZoom] = useState(t('general.months'))

  const selectZoom = (zoom) => {
    setZoom(zoom)
    props.onChangeZoom(zoom)
  }

  const CustomButton = ({ active, children, ...btnProps }) => (
    <Button
      {...(active
        ? { color: 'grayF4', variant: 'contained' }
        : { variant: 'outlined', color: 'subText' })}
      sx={{
        border: `1px solid ${theme.palette.grayF4.main}`,
        borderRadius: 0,
        '&:hover': {
          border: `1px solid ${theme.palette.grayF4.main}`,
        },
        ...(active ? { color: theme.palette.primary.main } : {}),
      }}
      {...btnProps}
    >
      {children}
    </Button>
  )

  return (
    <Box
      sx={{
        '& button:first-of-type': {
          borderTopLeftRadius: '3px',
        },
        '& button:last-of-type': {
          borderTopRightRadius: '3px',
        },
        mb: 2,
      }}
    >
      <CustomButton
        onClick={() => selectZoom(t('general.days'))}
        active={zoom === t('general.days')}
      >
        {t('days')}
      </CustomButton>
      <CustomButton
        onClick={() => selectZoom(t('general.months'))}
        active={zoom === t('general.months')}
      >
        {t('months')}
      </CustomButton>
      <CustomButton
        onClick={() => selectZoom(t('general.years'))}
        active={zoom === t('general.years')}
      >
        {t('years')}
      </CustomButton>
    </Box>
  )
}

export default Toolbar
