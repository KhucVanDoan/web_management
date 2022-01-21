import { createTheme } from '@mui/material/styles'
import palette from './palette'
import breakpoints from './breakpoints'
import typography from './typography'
import components from './components'
import shadows from './shadows'

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
