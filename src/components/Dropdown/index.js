import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { PropTypes } from 'prop-types'

import Button from '~/components/Button'

const Dropdown = ({
  options,
  title,
  handleMenuItemClick,
  getOptionLabel,
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const showDropdown = (event) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <>
      <Button color="primary" onClick={showDropdown} {...props}>
        {title}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        PaperProps={{ variant: 'caret' }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            onClick={(event) => handleMenuItemClick(option, event, index)}
          >
            {option?.icon && (
              <Box sx={{ display: 'inline-flex', mr: 1 }}>{option?.icon}</Box>
            )}
            {getOptionLabel(option)}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default Dropdown

Dropdown.defaultProps = {
  options: [],
  title: null,
  handleMenuItemClick: () => {},
  getOptionLabel: (option) => option.label || '',
}

Dropdown.propTypes = {
  options: PropTypes.array,
  title: PropTypes.node,
  handleMenuItemClick: PropTypes.func,
  getOptionLabel: PropTypes.func,
}
