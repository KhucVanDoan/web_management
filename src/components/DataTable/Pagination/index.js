import React, { Component } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Box, MenuItem, Select, Typography } from '@mui/material'
import { Pagination as MuiPagination } from '@mui/material'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

const ROWS_PER_PAGE_OPTIONS = [20, 50, 100]

/**
 * Pagination component
 */
class Pagination extends Component {
  /**
   */
  render() {
    const { t, total, pageSizeOptions, pageSize, page } = this.props
    const numberOfPages = Math.ceil(total / pageSize)

    if (total < 0) return null
    return (
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
        {!this.props.isDisabledRowPerPage && (
          <Select
            displayEmpty
            value={pageSize}
            onChange={(e) => this.props.onChange(1, e.target.value)}
            variant="standard"
            autoWidth
            IconComponent={KeyboardArrowDownIcon}
            renderValue={(val) => (
              <Box>
                <Typography component="span" variant="body2" sx={{ mr: '8px' }}>
                  {t('pagination.rowsPerPage')}
                </Typography>
                <Typography component="span">{val}</Typography>
              </Box>
            )}
            sx={{
              mt: 1,
              mr: 1,
              '&:before, &:after': { display: 'none' },
              '.MuiSelect-select': {
                bgcolor: 'grayF4.main',
                p: '2px 28px 2px 16px !important',
                borderRadius: 1,
              },
              '.MuiSelect-icon': {
                top: 4,
                right: 10,
                width: 18,
                height: 18,
                color: 'subText.main',
              },
            }}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'right',
              },
            }}
          >
            {pageSizeOptions.map((option, i) => (
              <MenuItem key={i} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        )}

        <MuiPagination
          count={numberOfPages}
          page={page}
          onChange={(_, newPage) => this.props.onChange(newPage, pageSize)}
          variant="outlined"
          shape="rounded"
          sx={{
            mt: 1,
            '.MuiPagination-ul': {
              m: '-4px',
            },
            '.MuiPaginationItem-root': {
              borderColor: 'grayF4.main',
              bgcolor: 'transparent',
              transition: 'all .3s ease',
              m: '4px',

              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'transparent',
              },
            },
            '.MuiPaginationItem-root.Mui-selected': {
              borderColor: 'primary.main',
              bgcolor: 'transparent',
              color: 'primary.main',
              fontWeight: 700,
            },
            '.MuiPaginationItem-root.Mui-disabled': {
              opacity: 1,
              bgcolor: 'grayF4.main',
              color: 'subText.a5',
            },
          }}
        />
      </Box>
    )
  }
}

Pagination.defaultProps = {
  pageSizeOptions: ROWS_PER_PAGE_OPTIONS,
}

Pagination.propsTypes = {
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageSizeOptions: PropTypes.array,
  onChange: PropTypes.func,
}

export default withTranslation()(Pagination)
