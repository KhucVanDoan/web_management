import { useMemo } from 'react'

import { css } from '@emotion/css'
import { useTheme } from '@mui/material/styles'

export const useClasses = (style) => {
  const theme = useTheme()
  return useMemo(() => {
    const rawClasses = typeof style === 'function' ? style(theme) : style
    const prepared = {}

    Object.entries(rawClasses).forEach(([key, value = {}]) => {
      prepared[key] = css(value)
    })

    return prepared
  }, [style, theme])
}

export const withClasses = (style) => (Component) => (props) => {
  const classes = useClasses(style)

  return <Component {...props} classes={classes} />
}
