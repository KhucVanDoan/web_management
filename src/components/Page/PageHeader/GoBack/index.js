import React from 'react'

import { Box, Typography } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import { useClasses } from '~/themes'

import style from './style'

const GoBack = ({ onBack, hasSearchBox }) => {
  const classes = useClasses(style)
  const { t } = useTranslation()

  return (
    <Box className={classes.root}>
      <Button icon="back" color="grayEE" onClick={onBack} />

      {!hasSearchBox && (
        <Typography variant="body1" sx={{ ml: 4 / 3 }}>
          {t('page.goBack')}
        </Typography>
      )}
    </Box>
  )
}

GoBack.defaultProps = {
  onBack: () => {},
  hasSearchBox: false,
}

GoBack.propTypes = {
  onBack: PropTypes.func,
  hasSearchBox: PropTypes.bool,
}

export default GoBack
