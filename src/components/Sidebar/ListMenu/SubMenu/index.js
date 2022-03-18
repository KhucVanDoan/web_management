import React from 'react'

import { Collapse, Popover } from '@mui/material'
import { isEmpty } from 'lodash'
import { PropTypes } from 'prop-types'

import { useClasses } from '~/themes'

import { useSidebar } from '../../hooks'
import style from './style'

const SubMenu = ({
  route,
  isCollapse,
  anchorEl,
  handlePopoverOpen,
  handlePopoverClose,
  openPopover,
  hoverMenu,
  children,
}) => {
  const classes = useClasses(style(isEmpty(route.subMenu)))

  const { isMinimal, isMdUp } = useSidebar()

  if (isMinimal && isMdUp) {
    return (
      <Popover
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={openPopover && hoverMenu === route.name}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        PaperProps={{
          onMouseEnter: () => handlePopoverOpen(hoverMenu),
          onMouseLeave: handlePopoverClose,
          ...(!isEmpty(route.subMenu) ? { sx: { width: 250 } } : {}),
        }}
      >
        {children}
      </Popover>
    )
  }

  return (
    <Collapse in={isCollapse} timeout="auto" unmountOnExit>
      {children}
    </Collapse>
  )
}

SubMenu.defaultProps = {
  route: {},
  children: null,
}

SubMenu.propTypes = {
  route: PropTypes.shape(),
  isCollapse: PropTypes.bool,
  children: PropTypes.node,
}

export default SubMenu
