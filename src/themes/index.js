import { createTheme } from '@mui/material/styles'

import breakpoints from './breakpoints'
import components from './components'
import palette from './palette'
import shadows from './shadows'
import typography from './typography'

const theme = createTheme({
  palette,
  spacing: 12,
  shape: { borderRadius: 3 },
  breakpoints,
  typography,
  components,
  shadows,
})

export default theme

export { globalStyles } from './globalStyles'
export * from './helper'
