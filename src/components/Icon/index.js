import { Box } from '@mui/system'
import { PropTypes } from 'prop-types'

import { ReactComponent as Add } from '~/assets/images/icons/add.svg'
import { ReactComponent as AddRow } from '~/assets/images/icons/addRow.svg'
import { ReactComponent as ArrowBottom } from '~/assets/images/icons/arrowBottom.svg'
import { ReactComponent as ArrowDown } from '~/assets/images/icons/arrowDown.svg'
import { ReactComponent as ArrowLeft } from '~/assets/images/icons/arrowLeft.svg'
import { ReactComponent as Assign } from '~/assets/images/icons/assign.svg'
import { ReactComponent as Back } from '~/assets/images/icons/back.svg'
import { ReactComponent as Bag } from '~/assets/images/icons/bag.svg'
import { ReactComponent as Calendar } from '~/assets/images/icons/calendar.svg'
import { ReactComponent as Cart } from '~/assets/images/icons/cart.svg'
import { ReactComponent as Check } from '~/assets/images/icons/check.svg'
import { ReactComponent as Clone } from '~/assets/images/icons/clone.svg'
import { ReactComponent as Close } from '~/assets/images/icons/close.svg'
import { ReactComponent as Collapse } from '~/assets/images/icons/collapse.svg'
import { ReactComponent as Confirm } from '~/assets/images/icons/confirm.svg'
import { ReactComponent as Delete } from '~/assets/images/icons/delete.svg'
import { ReactComponent as Download } from '~/assets/images/icons/download.svg'
import { ReactComponent as DownloadAlt } from '~/assets/images/icons/downloadAlt.svg'
import { ReactComponent as Edit } from '~/assets/images/icons/edit.svg'
import { ReactComponent as Filter } from '~/assets/images/icons/filter.svg'
import { ReactComponent as GanntChart } from '~/assets/images/icons/gantt-chart.svg'
import { ReactComponent as ImportXlsx } from '~/assets/images/icons/importXlsx.svg'
import { ReactComponent as Invisible } from '~/assets/images/icons/invisible.svg'
import { ReactComponent as Invoid } from '~/assets/images/icons/invoid.svg'
import { ReactComponent as Lock } from '~/assets/images/icons/keylock.svg'
import { ReactComponent as UnLock } from '~/assets/images/icons/keyunlock.svg'
import { ReactComponent as ListView } from '~/assets/images/icons/listView.svg'
import { ReactComponent as Locked } from '~/assets/images/icons/locked.svg'
import { ReactComponent as Notification } from '~/assets/images/icons/notification.svg'
import { ReactComponent as Overdue } from '~/assets/images/icons/overdue.svg'
import { ReactComponent as Paper } from '~/assets/images/icons/paper.svg'
import { ReactComponent as QRWhite } from '~/assets/images/icons/qr-white.svg'
import { ReactComponent as QR } from '~/assets/images/icons/qr.svg'
import { ReactComponent as Remove } from '~/assets/images/icons/remove.svg'
import { ReactComponent as Rhombus } from '~/assets/images/icons/rhombus.svg'
import { ReactComponent as Save } from '~/assets/images/icons/save.svg'
import { ReactComponent as Search } from '~/assets/images/icons/search.svg'
import { ReactComponent as Setting } from '~/assets/images/icons/setting.svg'
import { ReactComponent as Show } from '~/assets/images/icons/show.svg'
import { ReactComponent as TableFilter } from '~/assets/images/icons/tableFilter.svg'
import { ReactComponent as TableSetting } from '~/assets/images/icons/tableSetting.svg'
import { ReactComponent as Tick } from '~/assets/images/icons/tick.svg'
import { ReactComponent as Unlock } from '~/assets/images/icons/unlock.svg'
import { ReactComponent as UpdateQuantity } from '~/assets/images/icons/updateQuantity.svg'
import { ReactComponent as Upload } from '~/assets/images/icons/upload.svg'
import { ReactComponent as User } from '~/assets/images/icons/user.svg'
import { ReactComponent as Visible } from '~/assets/images/icons/visible.svg'
// menu
import { ReactComponent as Chevron } from '~/assets/images/menu/chevron.svg'
import { ReactComponent as Database } from '~/assets/images/menu/database.svg'
import { ReactComponent as Drawer } from '~/assets/images/menu/drawer.svg'
import { ReactComponent as Export } from '~/assets/images/menu/export.svg'
import { ReactComponent as Home } from '~/assets/images/menu/home.svg'
import { ReactComponent as Key } from '~/assets/images/menu/key.svg'
import { ReactComponent as Keylock } from '~/assets/images/menu/keylock.svg'
import { ReactComponent as Plan } from '~/assets/images/menu/plan.svg'
import { ReactComponent as PrettyBag } from '~/assets/images/menu/prettyBag.svg'
const icons = {
  add: <Add />,
  addRow: <AddRow />,
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
  upload: <Upload />,
  importXlsx: <ImportXlsx />,
  clone: <Clone />,
  downloadAlt: <DownloadAlt />,
  collapse: <Collapse />,
  paper: <Paper />,
  lock: <Lock />,
  unLock: <UnLock />,
  assign: <Assign />,
  overdue: <Overdue />,
  filter: <Filter />,
  listView: <ListView />,
  ganttChart: <GanntChart />,
  qr: <QR />,
  qrWhite: <QRWhite />,
  locked: <Locked />,
  unlock: <Unlock />,
  updateQuantity: <UpdateQuantity />,
  confirm: <Confirm />,
  // menu
  drawer: <Drawer />,
  home: <Home />,
  database: <Database />,
  plan: <Plan />,
  key: <Key />,
  prettyBag: <PrettyBag />,
  export: <Export />,
  chevron: <Chevron />,
  keylock: <Keylock />,
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
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default Icon
