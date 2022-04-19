import React, { useState } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

import { ASYNC_SEARCH_LIMIT, IMPORT_EXPORT_MODE } from '~/common/constants'
import Autocomplete from '~/components/Autocomplete'
import Button from '~/components/Button'
import DatePicker from '~/components/DatePicker'
import DateRangePicker from '~/components/DateRangePicker'
import Dialog from '~/components/Dialog'
import Dropdown from '~/components/Dropdown'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import TextField from '~/components/TextField'
import { searchItemsApi } from '~/modules/mesx/redux/sagas/define-item/search-items.saga'

const Elements = () => {
  const theme = useTheme()
  const [dateValue, setDateValue] = useState(null)
  const [dateRangeValue, setDateRangeValue] = useState([null, null])
  const [selectedItem, setSlectedItem] = useState([])

  const [openDialog, setOpenDialog] = useState(false)
  const [openCustomizedColorDialog, setOpenCustomizedColorDialog] =
    useState(false)
  const [openCustomizedFooterDialog, setOpenCustomizedFooterDialog] =
    useState(false)

  const [importFile, setImportFile] = useState(null)

  const mockOptions = new Array(10).fill({}).map((_, index) => ({
    value: index,
    label: `Option ${index + 1}`,
    subLabel: 'abc',
  }))
  const mockOptionsDropDown = new Array(3).fill({}).map((_, index) => ({
    value: index,
    text: `Option dropdown ${index + 1}`,
  }))

  return (
    <Box sx={{ maxWidth: 1200, m: 'auto', p: 4 }}>
      <Typography
        variant="h1"
        color="primary"
        sx={{ bgcolor: 'primary.a1', p: 1, mb: 2 }}
      >
        Import from '@mui/...'
      </Typography>
      <Grid container columns={2} sx={{ 'div *': { mb: 0.5 } }}>
        <Grid item sm={1}>
          <Typography variant="h1">Typography h1 - 24px Bold 700</Typography>
          <Typography variant="h2">Typography h2 - 20px Bold 700</Typography>
          <Typography variant="h3">Typography h3 - 18px Bold 700</Typography>
          <Typography variant="h4">
            Typography h4 - 16px Semi Bold 600
          </Typography>
          <Typography variant="h5">
            Typography h5 - 14px Semi Bold 600
          </Typography>
          <Typography variant="body1">
            Typography body1 (default) - 14px Regular 400
          </Typography>
          <Typography variant="subtitle">
            Typography subtitle - 12px Regular 400
          </Typography>
        </Grid>
        <Grid item sm={1}>
          <Typography variant="h3" color="primary">
            Typography color="primary"
          </Typography>
          <Typography variant="h3" color="primary.a3">
            Typography color="primary.a3"
          </Typography>
          <Typography variant="h3" color="secondary">
            Typography color="secondary"
          </Typography>
          <Typography variant="h3" color="error">
            Typography color="error"
          </Typography>
          <Typography variant="h3">Typography default color</Typography>
          <Typography variant="h3" sx={{ color: 'text.secondary' }}>
            Custom color with sx
          </Typography>
          ...
        </Grid>
      </Grid>

      <Typography variant="h2" sx={{ mt: 2 }}>
        Checkbox
      </Typography>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
      <Checkbox defaultChecked></Checkbox>
      <Checkbox defaultChecked color="secondary"></Checkbox>
      <Checkbox defaultChecked color="error"></Checkbox>
      <Checkbox defaultChecked color="subText"></Checkbox>

      <Typography variant="h2" sx={{ mt: 2 }}>
        Radio
      </Typography>
      <RadioGroup
        aria-label="gender"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel
          value="male"
          control={<Radio color="secondary" />}
          label="Male"
        />
        <FormControlLabel
          value="other"
          control={<Radio color="error" />}
          label="Other"
        />
      </RadioGroup>

      <Typography variant="h2" sx={{ mt: 2, mb: 1 }}>
        Switch
      </Typography>
      <Box sx={{ mb: 1 }}>
        <Switch defaultChecked />
      </Box>
      <Box>
        <FormControlLabel
          sx={{ ml: 0 }}
          control={<Switch defaultChecked color="secondary" />}
          label="Label"
        />
      </Box>

      <Typography
        variant="h1"
        color="primary"
        sx={{ bgcolor: 'primary.a1', p: 1, mt: 4, mb: 2 }}
      >
        Import from '~/components/...'
      </Typography>

      <Typography variant="h2" sx={{ mt: 2, mb: 1 }}>
        Icon
      </Typography>
      <Box>
        <Icon name="setting" size={20} />
        <Icon name="setting" size={20} fill={theme.palette.primary.main} />
        <Icon name="setting" size={20} fill={theme.palette.secondary.main} />
        <Icon name="setting" size={20} fill={theme.palette.error.main} />
      </Box>

      <Typography variant="h2" sx={{ mt: 2, mb: 1 }}>
        Icon within IconButton
      </Typography>
      <Box>
        <IconButton>
          <Icon name="setting" size={20} />
        </IconButton>
        <IconButton>
          <Icon name="setting" size={20} fill={theme.palette.primary.main} />
        </IconButton>
        <IconButton>
          <Icon name="setting" size={20} fill={theme.palette.secondary.main} />
        </IconButton>
        <IconButton>
          <Icon name="setting" size={20} fill={theme.palette.error.main} />
        </IconButton>
      </Box>

      <Typography variant="h2" sx={{ mt: 2, mb: 1 }}>
        Button
      </Typography>
      <Box sx={{ button: { mr: 1, mb: 1 } }}>
        <Button>Button</Button>
        <Button color="secondary" icon="add">
          Button
        </Button>
        <Button color="error">Button</Button>
        <Button color="grayEE">Button</Button>
        <Button variant="outlined">Button</Button>
        <Button variant="outlined" color="secondary">
          Button
        </Button>
        <Button variant="outlined" color="error" icon="setting">
          Button
        </Button>
        <Button variant="outlined" color="text">
          Button
        </Button>
        <Button icon="setting" color="grayEE" />
        <br />
        <Button loading>Button</Button>
        <Button loading color="secondary" icon="add">
          Button
        </Button>
        <Button loading color="error">
          Button
        </Button>
        <Button loading color="grayEE">
          Button
        </Button>
        <Button loading variant="outlined">
          Button
        </Button>
        <Button loading variant="outlined" color="secondary">
          Button
        </Button>
        <Button loading variant="outlined" color="error" icon="setting">
          Button
        </Button>
        <Button loading variant="outlined" color="text">
          Button
        </Button>
        <br />
        <Button disabled>Button</Button>
        <Button disabled color="secondary" icon="add">
          Button
        </Button>
        <Button disabled color="error">
          Button
        </Button>
        <Button disabled color="grayEE">
          Button
        </Button>
        <Button disabled variant="outlined">
          Button
        </Button>
        <Button disabled variant="outlined" color="secondary">
          Button
        </Button>
        <Button disabled variant="outlined" color="error" icon="setting">
          Button
        </Button>
        <Button disabled variant="outlined" color="text">
          Button
        </Button>
      </Box>

      <Typography variant="h2" sx={{ mt: 2, mb: 1 }}>
        TextField
      </Typography>

      <Grid container rowSpacing={4 / 3} columnSpacing={4}>
        <Grid item xs={6}>
          <TextField label="Mã sản phẩm" placeholder="Mã sản phẩm" />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Tài khoản" required />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Tên đăng nhập"
            helperText="Tên đăng nhập không đúng"
            error
          />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Disabled" disabled value="Disabled" />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Number" placeholder="Number" type="number" />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Textarea"
            placeholder="Enter somthing"
            multiline
            rows={5}
          />
        </Grid>
      </Grid>

      <Typography variant="h2" sx={{ mt: 3, mb: 1 }}>
        DatePicker/DateRangePicker
      </Typography>
      <Grid container rowSpacing={4 / 3} columnSpacing={4}>
        <Grid item xs={6}>
          <DatePicker
            label="Chọn ngày đặt hàng"
            placeholder="Chọn ngày đặt hàng"
            value={dateValue}
            onChange={(value) => setDateValue(value)}
          />
        </Grid>
        <Grid item xs={6}>
          <DateRangePicker
            label="Chọn ngày đặt hàng"
            placeholder="Chọn ngày đặt hàng"
            value={dateRangeValue}
            onChange={(value) => setDateRangeValue(value)}
          />
        </Grid>
      </Grid>

      <Typography variant="h2" sx={{ mt: 3, mb: 1 }}>
        Autocomplete
      </Typography>
      <Grid container rowSpacing={4 / 3} columnSpacing={4}>
        <Grid item xs={6}>
          <Autocomplete
            options={mockOptions}
            label="Autocomplete Single"
            uncontrolled
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            options={mockOptions}
            multiple
            label="Autocomplete Multiple"
            uncontrolled
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            multiple
            label="Async search"
            placeholder="Tìm sản phẩm"
            asyncRequest={(s) =>
              searchItemsApi({ keyword: s, limit: ASYNC_SEARCH_LIMIT })
            }
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) => opt?.code}
            // isOptionEqualToValue={(opt, val) => opt?.code === val?.code}
            value={selectedItem}
            onChange={(val) => {
              setSlectedItem(val)
            }}
          />
        </Grid>
      </Grid>

      <Typography variant="h2" sx={{ mt: 3, mb: 1 }}>
        Dropdown
      </Typography>
      <Box sx={{ display: 'flex', mt: 1, button: { mr: 1 } }}>
        <Dropdown
          options={mockOptionsDropDown}
          title="Create"
          icon="add"
          handleMenuItemClick={() => {}}
          getOptionLabel={(opt) => opt.text}
        />

        <Dropdown options={mockOptionsDropDown} title="Disable" disabled />

        <Dropdown
          options={mockOptionsDropDown}
          title="Icon drop"
          endIcon={<KeyboardArrowDownIcon />}
        />
      </Box>

      <Typography variant="h2" sx={{ mt: 3, mb: 1 }}>
        Dialog
      </Typography>
      <Box sx={{ button: { mr: 1, mb: 1 } }}>
        <Button onClick={() => setOpenDialog(true)}>Open Dialog</Button>
        <Button onClick={() => setOpenCustomizedColorDialog(true)}>
          Open Dialog
        </Button>
        <Button onClick={() => setOpenCustomizedFooterDialog(true)}>
          Open Dialog
        </Button>
        <Dialog
          open={openDialog}
          title="Open Dialog"
          onCancel={() => setOpenDialog(false)}
          cancelLabel="Hủy"
          onSubmit={() => {}}
          submitLabel="Tạo mới"
        >
          Dialog content
        </Dialog>
        <Dialog
          open={openCustomizedColorDialog}
          title="Open Dialog"
          onCancel={() => setOpenCustomizedColorDialog(false)}
          cancelLabel="Hủy"
          onSubmit={() => {}}
          submitLabel="Xóa bỏ"
          submitProps={{
            color: 'error',
          }}
          noBorderBottom
        >
          Dialog content
        </Dialog>
        <Dialog
          open={openCustomizedFooterDialog}
          onCancel={() => setOpenCustomizedFooterDialog(false)}
          title="Open Dialog"
          renderFooter={() => <Box>Add your footer here</Box>}
        >
          Dialog content
        </Dialog>
      </Box>

      <Typography variant="h2" sx={{ mt: 3, mb: 1 }}>
        Import / Export
      </Typography>
      <Box sx={{ button: { mr: 1, mb: 1 } }}>
        <ImportExport
          importFile={importFile}
          setImportFile={setImportFile}
          onDownloadTemplate={() =>
            alert('Called download import template action')
          }
          onDownloadLog={() => alert('Called download import log action')}
          onImport={() => {
            const result = { success: 10, fail: 20, log: null }
            const error = null

            return { result, error }
          }}
        />

        <ImportExport
          mode={IMPORT_EXPORT_MODE.IMPORT_ONLY}
          importFile={importFile}
          setImportFile={setImportFile}
          onDownloadTemplate={() =>
            alert('Called download import template action')
          }
          onDownloadLog={() => alert('Called download import log action')}
          onImport={() => {
            const result = null
            const error = 'Example error'

            return { result, error }
          }}
        />
        <ImportExport
          mode={IMPORT_EXPORT_MODE.EXPORT_ONLY}
          onExport={() => alert('Called export action')}
        />
      </Box>

      <Typography variant="h2" sx={{ mt: 3, mb: 1 }}>
        DataTable, TableCollapse
      </Typography>

      <Typography variant="h2" sx={{ mt: 3, mb: 1 }}>
        Và nhiều component khác...
      </Typography>
    </Box>
  )
}

export default Elements
