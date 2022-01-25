import { Box } from '@mui/system'
import { PropTypes } from 'prop-types'

import { ReactComponent as Add } from '~/assets/images/icons/add.svg'
import { ReactComponent as ArrowLeft } from '~/assets/images/icons/arrowLeft.svg'
import { ReactComponent as Back } from '~/assets/images/icons/back.svg'
import { ReactComponent as Calendar } from '~/assets/images/icons/calendar.svg'
import { ReactComponent as Check } from '~/assets/images/icons/check.svg'
import { ReactComponent as Close } from '~/assets/images/icons/close.svg'
import { ReactComponent as Hide } from '~/assets/images/icons/hide.svg'
import { ReactComponent as Notification } from '~/assets/images/icons/notification.svg'
import { ReactComponent as Search } from '~/assets/images/icons/search.svg'
import { ReactComponent as Setting } from '~/assets/images/icons/setting.svg'
import { ReactComponent as Show } from '~/assets/images/icons/show.svg'
import { ReactComponent as TableFilter } from '~/assets/images/icons/tableFilter.svg'
import { ReactComponent as TableSetting } from '~/assets/images/icons/tableSetting.svg'
// menu
import { ReactComponent as Drawer } from '~/assets/images/menu/drawer.svg'
import { ReactComponent as Home } from '~/assets/images/menu/home.svg'

const icons = {
  add: <Add />,
  setting: <Setting />,
  close: <Close />,
  calendar: <Calendar />,
  notification: <Notification />,
  search: <Search />,
  back: <Back />,
  arrowLeft: <ArrowLeft />,
  tableSetting: <TableSetting />,
  tableFilter: <TableFilter />,
  check: <Check />,
  show: <Show />,
  hide: <Hide />,

  // menu
  drawer: <Drawer />,
  home: <Home />,
}

const Icon = ({ name, fill, size, sx, ...props }) => {
  return (
    <Box
      component="span"
      className="x-icon"
      {...props}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(size
          ? {
              width: size,
              height: size,
            }
          : {}),
        svg: {
          width: '100%',
          height: '100%',
          path: { fill: fill },
        },
        ...sx,
      }}
    >
      {icons[name]}
    </Box>
  )
}

Icon.defaultProps = {
  name: '',
  size: 20,
}

Icon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
}

export default Icon
