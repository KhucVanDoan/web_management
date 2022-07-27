import React, { useState } from 'react'

import { Box, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

import Autocomplete from '~/components/Autocomplete'
import Button from '~/components/Button'

const Toolbar = (props) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const [zoom, setZoom] = useState(t('general.months'))
  const handleReset = () => {}
  const selectZoom = (zoom) => {
    setZoom(zoom)
    props.onChangeZoom(zoom)
  }

  const CustomButton = ({ active, children, ...btnProps }) => (
    <Button
      variant="outlined"
      color="subText"
      sx={{
        borderRadius: 0,
        ...(active
          ? {
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.grayF4.main,
            }
          : {}),
        '&:hover': {
          border: `1px solid ${theme.palette.grayF4.main}`,
          backgroundColor: theme.palette.grayF4.a5,
        },
      }}
      {...btnProps}
    >
      {children}
    </Button>
  )

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Grid item xs={6} lg={12}>
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
      </Grid>
      {props?.display && (
        <>
          <Grid item xs={6} lg={12}>
            <Box>
              <Autocomplete
                options={props.planList}
                placeholder="Kế hoạch sản xuất"
                uncontrolled
                sx={{ maxWidth: '300px' }}
                onChange={(e) => props.onChangePlanFilter(e)}
              />
            </Box>
          </Grid>
          <Grid item xs={6} lg={12}>
            <Box sx={{ float: 'right' }}>
              <CustomButton onClick={handleReset}>
                {t('common.cancel')}
              </CustomButton>
              <Button onClick={handleReset} sx={{ ml: 1 }}>
                {t('common.save')}
              </Button>
            </Box>
          </Grid>
        </>
      )}
    </Box>
  )
}

export default Toolbar
