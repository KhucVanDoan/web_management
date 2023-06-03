import React, { useState, useEffect, useRef } from 'react'

import ExpandMore from '@mui/icons-material/ExpandMore'
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  Typography,
} from '@mui/material'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import { PropTypes } from 'prop-types'
import { Link, useLocation } from 'react-router-dom'

import Icon from '~/components/Icon'
import { getLocalItem } from '~/utils'

import { useSidebar } from '../hooks'
import SubMenu from './SubMenu'
import ListMenuStyled from './style'

const ListMenu = ({ routes = [] }) => {
  const [open, setOpen] = useState()
  const { pathname } = useLocation()
  const { isMdUpMinimal, isMdDown, setIsMinimal } = useSidebar()
  const userInfo = getLocalItem('userInfo')

  const isActive = (path = '') =>
    pathname === path ||
    pathname === `${path}/` ||
    (path.split('/').length > 2 && pathname.includes(`${path}/`))

  const isActiveChildren = (subs = []) => subs.some((m) => isActive(m.path))

  const isOpen = (index, subs) =>
    open === index || (open === undefined && isActiveChildren(subs))

  const toggle = (index, subs) => {
    if (isEmpty(subs)) return

    setOpen(isOpen(index, subs) ? null : index)
  }
  const [hoverMenu, setHoverMenu] = useState('')

  const [openedPopover, setOpenedPopover] = useState(false)
  const popoverAnchor = useRef([])

  useEffect(() => {
    popoverAnchor.current = popoverAnchor.current.slice(0, routes.length)
  }, [routes])

  const handlePopoverOpen = (menuName) => {
    setHoverMenu(menuName)
    setOpenedPopover(true)
  }

  const handlePopoverClose = () => {
    setOpenedPopover(false)
  }

  const visibleMenus = routes.filter((r) => {
    return r?.role.includes(userInfo.role)
  })
  return (
    <ListMenuStyled open={!isMdUpMinimal} component="div">
      {visibleMenus.map((route, index) => {
        const visibleSubMenu = route?.subMenu?.filter(
          (item) => item?.isInSidebar,
        )

        return (
          <React.Fragment key={index}>
            <ListItemButton
              ref={(el) => (popoverAnchor.current[index] = el)}
              {...(route.path ? { component: Link, to: route.path } : {})}
              {...(isMdUpMinimal
                ? {
                    onMouseOver: () => handlePopoverOpen(route.name),
                    onMouseOut: handlePopoverClose,
                  }
                : {
                    onClick: () => toggle(index, visibleSubMenu),
                  })}
              sx={{
                mt: index === 0 ? 0 : '8px',
                px: '10px',
              }}
              className={clsx({
                active:
                  isActive(route.path) ||
                  (isMdUpMinimal && isActiveChildren(route.subMenu)),
              })}
            >
              <ListItemIcon
                sx={{
                  minWidth: 'unset',
                  mr: '10px',
                }}
              >
                <Icon name={route.icon} fill="#fff" size={20} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="h5"
                    color="#fff"
                    noWrap
                    sx={{
                      fontWeight: 400,
                    }}
                  >
                    {route.name}
                  </Typography>
                }
              />
              {!isEmpty(visibleSubMenu) && !isMdUpMinimal && (
                <ExpandMore
                  sx={{
                    transform: 'rotate(-90deg)',
                    fontSize: '18px',
                    color: '#ddd',
                    ...(isOpen(index, route.subMenu)
                      ? { transform: 'rotate(0)' }
                      : {}),
                  }}
                />
              )}
            </ListItemButton>

            <SubMenu
              route={route}
              visibleSubMenu={visibleSubMenu}
              isExpanded={isOpen(index, visibleSubMenu)}
              anchorEl={popoverAnchor.current[index]}
              openPopover={openedPopover}
              handlePopoverOpen={handlePopoverOpen}
              handlePopoverClose={handlePopoverClose}
              hoverMenu={hoverMenu}
            >
              {!isEmpty(visibleSubMenu) ? (
                <List
                  component="div"
                  disablePadding
                  sx={isMdUpMinimal ? {} : { pl: '40px' }}
                >
                  {visibleSubMenu.map((menuItem) => (
                    <ListItemButton
                      component={Link}
                      to={menuItem?.path}
                      key={menuItem?.path}
                      sx={{ py: '5px', px: '10px' }}
                      className={clsx({
                        active: isActive(menuItem.path),
                      })}
                      {...(isMdDown
                        ? {
                            onClick: () => setIsMinimal(true),
                          }
                        : {})}
                    >
                      <ListItemText
                        primary={
                          <Typography
                            variant="h5"
                            color="#fff"
                            noWrap
                            sx={{
                              fontWeight: 400,
                            }}
                          >
                            {menuItem.name}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  ))}
                </List>
              ) : (
                route.name
              )}
            </SubMenu>
          </React.Fragment>
        )
      })}
    </ListMenuStyled>
  )
}

ListMenu.defaultProps = {
  routes: [],
}

ListMenu.propTypes = {
  routes: PropTypes.array,
}

export default ListMenu
