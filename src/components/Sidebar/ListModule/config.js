import { Typography } from '@mui/material'

import mesx_icon from '~/assets/images/menu/mesx_icon.svg'
import wmsx_icon from '~/assets/images/menu/wmsx_icon.svg'

const modules = [
  {
    name: 'wmsx',
    path: process.env.REACT_APP_WMSX_URL || 'wmsx',
    icon: wmsx_icon,
    title: (
      <>
        WMS<span style={{ color: '#ff9054' }}>X</span>
      </>
    ),
  },

  {
    name: 'configuration',
    path: process.env.REACT_APP_CONFIGURATION_URL || 'configuration',
    icon: mesx_icon,
    title: (t) => (
      <Typography component="span" sx={{ fontSize: 11, fontWeight: 500 }}>
        {t('moduleMenu.configuration')}
      </Typography>
    ),
  },
]

export default modules
