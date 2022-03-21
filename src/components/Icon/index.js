import { Box } from '@mui/system'
import { PropTypes } from 'prop-types'

import { ReactComponent as Add } from '~/assets/images/icons/add.svg'
import { ReactComponent as ArrowBottom } from '~/assets/images/icons/arrowBottom.svg'
import { ReactComponent as ArrowDown } from '~/assets/images/icons/arrowDown.svg'
import { ReactComponent as ArrowLeft } from '~/assets/images/icons/arrowLeft.svg'
import { ReactComponent as Back } from '~/assets/images/icons/back.svg'
import { ReactComponent as Bag } from '~/assets/images/icons/bag.svg'
import { ReactComponent as Calendar } from '~/assets/images/icons/calendar.svg'
import { ReactComponent as Cart } from '~/assets/images/icons/cart.svg'
import { ReactComponent as Check } from '~/assets/images/icons/check.svg'
import { ReactComponent as Close } from '~/assets/images/icons/close.svg'
import { ReactComponent as Delete } from '~/assets/images/icons/delete.svg'
import { ReactComponent as Download } from '~/assets/images/icons/download.svg'
import { ReactComponent as Edit } from '~/assets/images/icons/edit.svg'
import { ReactComponent as Invisible } from '~/assets/images/icons/invisible.svg'
import { ReactComponent as Invoid } from '~/assets/images/icons/invoid.svg'
import { ReactComponent as Notification } from '~/assets/images/icons/notification.svg'
import { ReactComponent as Remove } from '~/assets/images/icons/remove.svg'
import { ReactComponent as Rhombus } from '~/assets/images/icons/rhombus.svg'
import { ReactComponent as Save } from '~/assets/images/icons/save.svg'
import { ReactComponent as Search } from '~/assets/images/icons/search.svg'
import { ReactComponent as Setting } from '~/assets/images/icons/setting.svg'
import { ReactComponent as Show } from '~/assets/images/icons/show.svg'
import { ReactComponent as TableFilter } from '~/assets/images/icons/tableFilter.svg'
import { ReactComponent as TableSetting } from '~/assets/images/icons/tableSetting.svg'
import { ReactComponent as Tick } from '~/assets/images/icons/tick.svg'
import { ReactComponent as User } from '~/assets/images/icons/user.svg'
import { ReactComponent as Visible } from '~/assets/images/icons/visible.svg'
// menu
import { ReactComponent as Database } from '~/assets/images/menu/database.svg'
import { ReactComponent as Drawer } from '~/assets/images/menu/drawer.svg'
import { ReactComponent as Home } from '~/assets/images/menu/home.svg'
import { ReactComponent as Key } from '~/assets/images/menu/key.svg'
import { ReactComponent as Plan } from '~/assets/images/menu/plan.svg'
import { ReactComponent as PrettyBag } from '~/assets/images/menu/prettyBag.svg'

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
  invisible: <Invisible />,
  visible: <Visible />,
  edit: <Edit />,
  delete: <Delete />,
  tick: <Tick />,
  arrowDown: <ArrowDown />,
  download: <Download />,
  remove: <Remove />,
  user: <User />,
  arrowBottom: <ArrowBottom />,
  bag: <Bag />,
  cart: <Cart />,
  rhombus: <Rhombus />,
  invoid: <Invoid />,
  save: <Save />,

  // menu
  drawer: <Drawer />,
  home: <Home />,
  database: <Database />,
  plan: <Plan />,
  key: <Key />,
  prettyBag: <PrettyBag />,
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
