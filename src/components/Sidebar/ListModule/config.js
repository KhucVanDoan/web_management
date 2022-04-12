import { Typography } from '@mui/material'

import mesx_icon from '~/assets/images/menu/mesx_icon.svg'
import mmsx_icon from '~/assets/images/menu/mmsx_icon.svg'
import qmsx_icon from '~/assets/images/menu/qmsx_icon.svg'
import solution_icon from '~/assets/images/menu/solution_icon.svg'
import tnt_icon from '~/assets/images/menu/tnt_icon.svg'
import wmsx_icon from '~/assets/images/menu/wmsx_icon.svg'

const modules = [
  {
    name: 'wmsx',
    icon: wmsx_icon,
    title: (
      <>
        WMS<span style={{ color: '#ff9054' }}>X</span>
      </>
    ),
  },
  {
    name: 'mesx',
    icon: mesx_icon,
    title: <>MES</>,
  },
  {
    name: 'mmsx',
    icon: mmsx_icon,
    title: (
      <>
        MMS<span style={{ color: '#ff9054' }}>X</span>
      </>
    ),
  },
  {
    name: 'qmsx',
    icon: qmsx_icon,
    title: (
      <>
        QMS<span style={{ color: '#ff9054' }}>X</span>
      </>
    ),
  },
  {
    name: 'tnt',
    icon: tnt_icon,
    title: (
      <Typography component="span" sx={{ fontSize: 11, fontWeight: 500 }}>
        Track & Trace
      </Typography>
    ),
  },
  {
    name: 'solution',
    icon: solution_icon,
    title: (
      <Typography component="span" sx={{ fontSize: 11, fontWeight: 500 }}>
        Giải pháp
      </Typography>
    ),
  },
]

export default modules
