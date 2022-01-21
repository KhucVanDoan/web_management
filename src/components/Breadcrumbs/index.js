import React, { Component } from 'react'
import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import Icon from '../Icon'
import style from './style'
import { useClasses } from 'themes'
import { getCurrentModule } from 'utils/menu'

export const Breadcrumbs = ({ breadcrumbs, ...props }) => {
  const classes = useClasses(style)
  const { pathname } = useLocation()

  const currentModule = getCurrentModule(pathname)
  const { t } = useTranslation([currentModule])

  return (
    <MuiBreadcrumbs
      aria-label="breadcrumb"
      classes={{ root: classes.root }}
      {...props}
    >
      <Link className={classes.home} to="/">
        <Icon name="home" size={14} />
      </Link>

      {currentModule &&
        (breadcrumbs?.length ? (
          <Link className={classes.link} to={`/${currentModule}`}>
            {t(`menu.${currentModule}`)}
          </Link>
        ) : (
          <Typography variant="subtitle" color="primary.main">
            {t(`menu.${currentModule}`)}
          </Typography>
        ))}

      {breadcrumbs?.map((breadcrumb, index) => {
        if (index === breadcrumbs.length - 1) {
          return (
            <Typography key={index} variant="subtitle" color="primary.main">
              {t(`menu.${breadcrumb.title}`)}
            </Typography>
          )
        }

        if (breadcrumb.route) {
          return (
            <Link
              key={breadcrumb.route}
              to={breadcrumb.route}
              color="inherit"
              className={classes.link}
            >
              {t(`menu.${breadcrumb.title}`)}
            </Link>
          )
        }

        return (
          <Typography key={index} variant="subtitle">
            {t(`menu.${breadcrumb.title}`)}
          </Typography>
        )
      })}
    </MuiBreadcrumbs>
  )
}

Breadcrumbs.defaultProps = {
  breadcrumbs: [],
}

Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.array.isRequired,
}

/**
 *
 * @param {*} WrappedComponent
 * @param {*} breadcrumbs
 * @returns
 */
export default function withBreadcrumbs(WrappedComponent, breadcrumbs = []) {
  // eslint-disable-next-line react/display-name
  return class extends Component {
    /**
     * @param {any} props
     */
    constructor(props) {
      super(props)
      this.state = {
        breadcrumbs: breadcrumbs,
      }
    }

    render() {
      const { breadcrumbs } = this.state
      return (
        <>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <WrappedComponent />
        </>
      )
    }
  }
}
