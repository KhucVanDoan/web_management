import { Box, Typography } from '@mui/material'

import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'

function itemTable() {
  const DEFAULT_ITEM = {
    name: '',
    start: '',
    end: '',
  }
  const items = [{ ...DEFAULT_ITEM }]
  const getColumns = [
    {
      field: 'id',
      headerName: '#',
      width: 50,
      align: 'center',
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'name',
      headerName: 'Tên ca',
      width: 150,
      align: 'center',
      renderCell: () => {
        return <Field.TextField name="name" placeholder="Tên ca" />
      },
    },
    {
      field: 'start',
      headerName: 'Thời gian bắt đầu',
      width: 200,
      align: 'center',
      renderCell: () => {
        return <Field.DatePicker name="start" placeholder="Thời gian bắt đầu" />
      },
    },
    {
      field: 'end',
      headerName: 'Thời gian kết thúc',
      width: 200,
      align: 'center',
      renderCell: () => {
        return (
          <Field.DatePicker name="start" placeholder="Thời gian kết thúc" />
        )
      },
    },
  ]
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h4" component="span">
          Ca làm việc
        </Typography>
        <Box>
          <Button icon="add">Thêm ca làm việc</Button>
        </Box>
      </Box>
      <DataTable
        rows={items}
        columns={getColumns}
        striped={false}
        hideSetting
        hideFooter
      />
    </>
  )
}
export default itemTable
