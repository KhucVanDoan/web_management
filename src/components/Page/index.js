import React from 'react'
import { PropTypes } from 'prop-types'
import { Box, Paper } from '@mui/material'
import Loading from 'components/Loading'
import { useClasses } from 'themes'
import PageFooter from './PageFooter'
import PageHeader from './PageHeader'
import style from './style'

const Page = ({
  onSearch,
  placeholder,
  onBack,
  title,
  renderHeaderRight,
  breadcrumbs,
  children,
  PaperProps,
  loading,
  sx,
  fitScreen,
}) => {
  const classes = useClasses(style)

  return (
    <Box className={classes.root} sx={sx}>
      <PageHeader
        onSearch={onSearch}
        placeholder={placeholder}
        onBack={onBack}
        title={title}
        renderHeaderRight={renderHeaderRight}
        breadcrumbs={breadcrumbs}
      />

      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          ...(fitScreen ? { overflow: 'auto' } : {}),
        }}
        {...PaperProps}
      >
        {children}
      </Paper>
      <PageFooter />

      <Loading open={loading}></Loading>
    </Box>
  )
}

Page.defaultProps = {
  title: '',
  PaperProps: {},
  loading: false,
  sx: {},
  fitScreen: false,
}

Page.propTypes = {
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  onBack: PropTypes.func,
  title: PropTypes.string,
  renderHeaderRight: PropTypes.func,
  breadcrumbs: PropTypes.array,
  PaperProps: PropTypes.shape(),
  loading: PropTypes.bool,
  sx: PropTypes.shape(),
  fitScreen: PropTypes.bool,
}

export default Page
