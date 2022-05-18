import { Typography } from '@mui/material'

import mesx_icon from '~/assets/images/menu/mesx_icon.svg'
import mmsx_icon from '~/assets/images/menu/mmsx_icon.svg'
import qmsx_icon from '~/assets/images/menu/qmsx_icon.svg'
import solution_icon from '~/assets/images/menu/solution_icon.svg'
import tnt_icon from '~/assets/images/menu/tnt_icon.svg'
import wmsx_icon from '~/assets/images/menu/wmsx_icon.svg'

const modules = [
  {
    name: 'mesx',
    path: process.env.REACT_APP_MESX_URL || 'mesx',
    icon: mesx_icon,
    title: <>MES</>,
  },
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
    name: 'qmsx',
    path: process.env.REACT_APP_QMSX_URL || 'qmsx',
    icon: qmsx_icon,
    title: (
      <>
        QMS<span style={{ color: '#ff9054' }}>X</span>
      </>
    ),
  },
  {
    name: 'mmsx',
    path: process.env.REACT_APP_MMSX_URL || 'mmsx',
    icon: mmsx_icon,
    title: (
      <>
        MMS<span style={{ color: '#ff9054' }}>X</span>
      </>
    ),
  },
  {
    name: 'tnt',
    // path: process.env.REACT_APP_TNT_URL || 'tnt',
    icon: tnt_icon,
    title: (
      <Typography component="span" sx={{ fontSize: 11, fontWeight: 500 }}>
        Track & Trace
      </Typography>
    ),
  },
  {
    name: 'database',
    path: process.env.REACT_APP_DATABASE_URL || 'database',
    icon: mesx_icon,
    title: (t) => (
      <Typography component="span" sx={{ fontSize: 11, fontWeight: 500 }}>
        {t('moduleMenu.database')}
      </Typography>
    ),
  },
  {
    name: 'solution',
    // path: process.env.REACT_APP_SOLUTION_URL || 'solution',
    icon: solution_icon,
    title: (t) => (
      <Typography component="span" sx={{ fontSize: 11, fontWeight: 500 }}>
        {t('moduleMenu.other')}
      </Typography>
    ),
  },
]

export default modules
