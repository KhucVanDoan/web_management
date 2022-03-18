import { Box, FormHelperText, IconButton, Typography } from '@mui/material'
import { isAfter } from 'date-fns'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { scrollToBottom } from '~/utils'

function ShiftTable(props) {
  const { shifts, arrayHelpers } = props
  const { t } = useTranslation(['mesx'])
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
      field: 'title',
      headerName: t('planCalendar.setupYearCalendar.shiftName'),
      width: 150,
      align: 'center',
      renderCell: (_, index) => {
        return (
          <Field.TextField
            name={`shifts[${index}].title`}
            placeholder={t('planCalendar.setupYearCalendar.shiftName')}
          />
        )
      },
    },
    {
      field: 'from',
      headerName: t('planCalendar.setupYearCalendar.startTime'),
      width: 200,
      align: 'center',
      renderCell: (params, index) => {
        const { id, startAt, endAt } = params.row
        return (
          <Box flex={1} alignItems="center" key={`startAt${id}`}>
            <Field.TextField name={`shifts[${index}].from`} type="time" />
            {startAt && endAt && isAfter(startAt, endAt) && (
              <FormHelperText error>
                {t('form.invalidTimeRange')}
              </FormHelperText>
            )}
          </Box>
        )
      },
    },
    {
      field: 'to',
      headerName: t('planCalendar.setupYearCalendar.endTime'),
      width: 200,
      align: 'center',
      renderCell: (params, index) => {
        return <Field.TextField name={`shifts[${index}].to`} type="time" />
      },
    },
    {
      field: 'remove',
      headerName: '',
      width: 50,
      align: 'center',
      renderCell: (params) => {
        const idx = shifts.findIndex((shift) => shift.id === params.row.id)
        return (
          <IconButton
            onClick={() => {
              arrayHelpers.remove(idx)
            }}
            disabled={shifts?.length === 1}
          >
            <Icon name="remove" />
          </IconButton>
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
          mb: 1,
        }}
      >
        <Typography variant="h4" component="span">
          {t('planCalendar.setupYearCalendar.shift')}
        </Typography>
        <Box>
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                id: new Date().getTime(),
                title: null,
                from: null,
                to: null,
                breakTimes: [
                  {
                    id: new Date().getTime(),
                    name: t('planCalendar.shiftPreparationTime'),
                    from: null,
                    to: null,
                  },
                ],
              })
              scrollToBottom()
            }}
          >
            {t('planCalendar.setupYearCalendar.addShift')}
          </Button>
        </Box>
      </Box>
      <DataTable
        rows={shifts || []}
        columns={getColumns}
        total={shifts?.length}
        striped={false}
        hideSetting
        hideFooter
      />
    </>
  )
}

ShiftTable.defaultProps = {
  shifts: [],
  arrayHelpers: {},
}

ShiftTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  shifts: PropTypes.array,
}

export default ShiftTable
