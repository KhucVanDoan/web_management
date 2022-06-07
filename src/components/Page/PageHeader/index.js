import React from 'react'

import { Box, Typography } from '@mui/material'
import { PropTypes } from 'prop-types'

import { Breadcrumbs } from '~/components/Breadcrumbs'

import GoBack from './GoBack'
import SearchBox from './SearchBox'
import Toolbar from './Toolbar'

const PageHeader = ({
  onSearch,
  placeholder,
  onBack,
  title,
  renderHeaderRight,
  renderSearchBox,
  breadcrumbs,
}) => {
  if ((!onSearch || !renderSearchBox) && !onBack && !renderHeaderRight) {
    return (
      <Box sx={{ display: 'flex', mb: 2 }}>
        <Box sx={{ mr: 1 }}>
          <Typography variant="h1">{title}</Typography>
          {breadcrumbs && (
            <Breadcrumbs breadcrumbs={breadcrumbs} sx={{ mt: '8px' }} />
          )}
        </Box>

        <Toolbar />
      </Box>
    )
  }

  return (
    <>
      <Box sx={{ display: 'flex', mb: 2 }}>
        {typeof onBack === 'function' && (
          <GoBack
            onBack={onBack}
            hasSearchBox={typeof onSearch === 'function'}
          />
        )}
        {(typeof onSearch === 'function' ||
          typeof renderSearchBox === 'function') && (
          <SearchBox
            onSearch={onSearch}
            placeholder={placeholder}
            renderSearchBox={renderSearchBox}
          />
        )}
        <Toolbar />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Box sx={{ mr: 2, mb: 2 }}>
          <Typography variant="h1">{title}</Typography>
          {breadcrumbs && (
            <Breadcrumbs breadcrumbs={breadcrumbs} sx={{ mt: '8px' }} />
          )}
        </Box>
        {typeof renderHeaderRight === 'function' && (
          <Box sx={{ mb: 2, ml: 'auto' }}>{renderHeaderRight()}</Box>
        )}
      </Box>
    </>
  )
}

PageHeader.defaultProps = {
  title: '',
}

PageHeader.propTypes = {
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  onBack: PropTypes.func,
  title: PropTypes.string,
  renderHeaderRight: PropTypes.func,
  renderSearchBox: PropTypes.func,
  breadcrumbs: PropTypes.array,
}

export default PageHeader
