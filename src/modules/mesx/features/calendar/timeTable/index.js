import { Box, Typography } from '@mui/material'

import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'

function timeTable() {
  const DEFAULT_ITEM = {
    name: '',
    time: [],
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
      headerName: 'Tên ca nghỉ',
      width: 150,
      align: 'center',
      renderCell: () => {
        return <Field.TextField name="name" placeholder="Tên ca nghỉ" />
      },
    },
    {
      field: 'time',
      headerName: 'Thời gian nghỉ',
      width: 200,
      align: 'center',
      renderCell: () => {
        return (
          <Field.DateRangePicker name="time" placeholder="Thời gian nghỉ" />
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
          Thời gian nghỉ
        </Typography>
        <Box>
          <Button icon="add">Thêm ca nghỉ</Button>
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
export default timeTable
