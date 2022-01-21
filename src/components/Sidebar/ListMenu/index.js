import React, { useState, useEffect, useRef } from 'react'
import { PropTypes } from 'prop-types'
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Icon from 'components/Icon'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { isEmpty } from 'lodash'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import ListMenuStyled from './style'
import SubMenu from './SubMenu'

const ListMenu = ({ routes, currentModule, isMinimal }) => {
  const [open, setOpen] = useState()
  const { pathname } = useLocation()
  const { t } = useTranslation([currentModule])
  const theme = useTheme()
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

  return (
    <ListMenuStyled open={!isMinimal} component="div">
      {routes.map((router, index) => (
        <React.Fragment key={index}>
          <ListItemButton
            ref={(el) => (popoverAnchor.current[index] = el)}
            {...(router.path ? { component: Link, to: router.path } : {})}
            {...(isMinimal
              ? {
                  onMouseEnter: () => handlePopoverOpen(router.name),
                  onMouseLeave: handlePopoverClose,
                }
              : {
                  onClick: () => toggle(index, router.subMenu),
                })}
            sx={{
              mt: index === 0 ? 0 : '8px',
              pr: '10px',
            }}
            className={clsx('button', {
              active:
                isActive(router.path) ||
                (isMinimal && isActiveChildren(router.subMenu)),
            })}
          >
            <ListItemIcon
              sx={{
                minWidth: 'unset',
                mr: '10px',
              }}
            >
              <Icon
                name={router.icon}
                fill={
                  isActive(router.path)
                    ? theme.palette.text.main
                    : theme.palette.subText.main
                }
                size={20}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant="h5"
                  color="text.main"
                  noWrap
                  sx={{
                    fontWeight: isActive(router.path) ? 700 : 400,
                  }}
                >
                  {t(`menu.${router.name}`)}
                </Typography>
              }
            />
            {!isEmpty(router.subMenu) && !isMinimal && (
              <ExpandMore
                sx={{
                  transform: 'rotate(-90deg)',
                  fontSize: '18px',
                  color: '#999999',
                  ...(isOpen(index, router.subMenu)
                    ? { transform: 'rotate(0)' }
                    : {}),
                }}
              />
            )}
          </ListItemButton>

          {
            <SubMenu
              router={router}
              currentModule={currentModule}
              isCollapse={isOpen(index, router.subMenu)}
              anchorEl={popoverAnchor.current[index]}
              openPopover={openedPopover}
              handlePopoverOpen={handlePopoverOpen}
              handlePopoverClose={handlePopoverClose}
              isMinimal={isMinimal}
              hoverMenu={hoverMenu}
            >
              <List component="div" disablePadding>
                {router.subMenu
                  ? router.subMenu.map((menuItem) => (
                      <ListItemButton
                        component={Link}
                        to={menuItem?.path}
                        key={menuItem?.path}
                        sx={{ py: '5px', pl: isMinimal ? '16px' : '46px' }}
                        className={clsx({
                          active: isActive(menuItem.path),
                        })}
                      >
                        <ListItemText
                          primary={
                            <Typography
                              variant="h5"
                              color="text.main"
                              noWrap
                              sx={{
                                fontWeight: isActive(menuItem.path) ? 700 : 400,
                              }}
                            >
                              {t(`menu.${menuItem.name}`)}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    ))
                  : 'Dashboard'}
              </List>
            </SubMenu>
          }
        </React.Fragment>
      ))}
    </ListMenuStyled>
  )
}

ListMenu.defaultProps = {
  routes: [],
  currentModule: '',
}

ListMenu.propTypes = {
  routes: PropTypes.array,
  currentModule: PropTypes.string,
}

export default ListMenu
