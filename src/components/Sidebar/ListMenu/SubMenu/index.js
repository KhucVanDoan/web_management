import React from 'react'
import { PropTypes } from 'prop-types'
import { Collapse, Popover } from '@mui/material'
import { useClasses } from 'themes'
import style from './style'
import { isEmpty } from 'lodash'

const SubMenu = ({
  router,
  isMinimal,
  isCollapse,
  anchorEl,
  handlePopoverOpen,
  handlePopoverClose,
  openPopover,
  hoverMenu,
  children,
}) => {
  const classes = useClasses(style(isEmpty(router.subMenu)))

  if (isMinimal) {
    return (
      <Popover
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={openPopover && hoverMenu === router.name}
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
  router: {},
  children: null,
}

SubMenu.propTypes = {
  router: PropTypes.shape(),
  isCollapse: PropTypes.bool,
  children: PropTypes.node,
}

export default SubMenu
