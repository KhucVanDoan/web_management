import React from 'react'
import { Box, Typography } from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import { useTheme } from '@mui/system'
import { useClasses } from 'themes'
import LogoMESX from 'assets/images/auth/Logo-MESX.png'
import { useTranslation } from 'react-i18next'
import style from './style'

const IntroSlider = () => {
  const classes = useClasses(style)
  const theme = useTheme()
  const { t } = useTranslation('auth')
  const items = [
    {
      src: LogoMESX,
      title: (
        <Typography variant="h1" color="primary.contrastText">
          MES
          <Typography component="span" variant="h1" color="secondary.main">
            X
          </Typography>
        </Typography>
      ),
      description: t('introductionSlider.description1'),
    },
    {
      src: LogoMESX,
      title: (
        <Typography variant="h1" color="primary.contrastText">
          MES
        </Typography>
      ),
      description: t('introductionSlider.description2'),
    },
    {
      src: LogoMESX,
      title: (
        <Typography variant="h1" color="primary.contrastText">
          MMS
          <Typography component="span" variant="h1" color="secondary.main">
            X
          </Typography>
        </Typography>
      ),
      description: t('introductionSlider.description3'),
    },
  ]

  return (
    <Carousel
      autoPlay
      swipe
      animation="slide"
      timeout={500}
      indicators
      indicatorIconButtonProps={{
        style: {
          color: theme.palette.primary.main,
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          color: theme.palette.primary.contrastText,
        },
      }}
      indicatorContainerProps={{
        style: {
          borderRadius: 8,
          width: 52,
          margin: '0 auto',
          marginTop: 42,
          background: 'rgba(255, 255, 255, 0.1)',
        },
      }}
      navButtonsWrapperProps={{
        style: {
          display: 'none',
        },
      }}
    >
      {items.map((item, i) => {
        return (
          <Box key={i} className={classes.sliderItem}>
            <img src={item.src} alt="" style={{ marginBottom: 21 }} />
            {item.title}
            <Typography
              variant="h4"
              color="primary.contrastText"
              sx={{ textAlign: 'center', paddingTop: '8px' }}
            >
              {item.description}
            </Typography>
          </Box>
        )
      })}
    </Carousel>
  )
}

export default IntroSlider
