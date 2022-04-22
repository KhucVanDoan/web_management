import { Button, FormHelperText, IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { isAfter } from 'date-fns'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import NumberFormatText from '~/components/NumberFormat'
import { WORK_CENTER_STATUS } from '~/modules/mesx/constants'
import { scrollToBottom } from '~/utils'

const ShiftTable = ({ mode, shifts, arrayHelpers, status }) => {
  const { t } = useTranslation(['mesx'])
  const getColumns = () => {
    return [
      // {
      //   field: 'id',
      //   headerName: '#',
      //   sortable: false,
      //   align: 'center',
      //   renderCell: (_, index) => {
      //     return index
      //   },
      // },
      {
        field: 'shiftName',
        headerName: t('workCenter.shiftName'),
        width: 200,
        align: 'center',
        renderCell: (params, index) => {
          const { id } = params.row
          const shiftObject = shifts?.find((x) => x.id === id)
          const isView = mode === MODAL_MODE.DETAIL
          return isView ? (
            <>{shiftObject?.shiftName}</>
          ) : (
            <Field.TextField
              name={`shifts[${index}].shiftName`}
              inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
              disabled={status === WORK_CENTER_STATUS.IN_PROGRESS}
            />
          )
        },
      },
      {
        field: 'startAt',
        headerName: t('workCenter.startTime'),
        align: 'center',
        width: 200,
        renderCell: (params, index) => {
          const { id, startAt, endAt } = params.row
          const shiftObject = shifts?.find((x) => x.id === id)
          const isView = mode === MODAL_MODE.DETAIL
          return isView ? (
            <>{shiftObject?.startAt}</>
          ) : (
            <Box flex={1} alignItems="center" key={`startAt${id}`}>
              <Field.TimePicker
                name={`shifts[${index}].startAt`}
                disabled={status === WORK_CENTER_STATUS.IN_PROGRESS}
              />
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
        field: 'endAt',
        headerName: t('workCenter.endTime'),
        align: 'center',
        width: 200,
        renderCell: (params, index) => {
          const { id } = params.row
          const shiftObject = shifts?.find((x) => x.id === id)
          const isView = mode === MODAL_MODE.DETAIL
          return isView ? (
            <>{shiftObject?.endAt}</>
          ) : (
            <Field.TimePicker
              name={`shifts[${index}].endAt`}
              disabled={status === WORK_CENTER_STATUS.IN_PROGRESS}
            />
          )
        },
      },
      {
        field: 'pricePerHour',
        headerName: t('workCenter.pricePerHour'),
        width: 200,
        align: 'center',
        renderCell: (params, index) => {
          const { id } = params.row
          const shiftObject = shifts?.find((x) => x.id === id)
          const isView = mode === MODAL_MODE.DETAIL
          return isView ? (
            <>
              <NumberFormatText value={shiftObject?.pricePerHour} />
            </>
          ) : (
            <Field.TextField
              name={`shifts[${index}].pricePerHour`}
              numberProps={{
                thousandSeparator: true,
                decimalScale: 3,
              }}
              disabled={status === WORK_CENTER_STATUS.IN_PROGRESS}
            />
          )
        },
      },
      {
        field: 'remove',
        headerName: '',
        width: 50,
        align: 'center',
        hide: mode === MODAL_MODE.DETAIL,
        renderCell: (params) => {
          const idx = shifts.findIndex((shift) => shift.id === params.row.id)
          const hide = mode === MODAL_MODE.DETAIL
          return hide ? null : (
            <IconButton
              onClick={() => {
                arrayHelpers.remove(idx)
              }}
              disabled={
                shifts?.length === 1 ||
                status === WORK_CENTER_STATUS.IN_PROGRESS
              }
            >
              <Icon name="remove" />
            </IconButton>
          )
        },
      },
    ]
  }

  const isView = mode === MODAL_MODE.DETAIL
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
          {t('workCenter.workCenterShift')}
          <Typography color="error" component="span" ml="3px">
            *
          </Typography>
        </Typography>

        {!isView && (
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                id: new Date().getTime(),
                name: null,
                startAt: '',
                endAt: '',
                pricePerHour: '',
                priceUnit: '',
                breakTimes: [
                  {
                    id: new Date().getTime(),
                    name: t('workCenter.shiftPreparationTime'),
                    from: '',
                    to: '',
                  },
                ],
              })

              scrollToBottom()
            }}
            disabled={status === WORK_CENTER_STATUS.IN_PROGRESS}
            icon="add"
          >
            {t('workCenter.addWorkCenterShift')}
          </Button>
        )}
      </Box>
      <DataTable
        rows={shifts || []}
        columns={getColumns()}
        total={shifts?.length}
        striped={false}
        hideFooter
        hideSetting
      />
    </>
  )
}
ShiftTable.defaultProps = {
  shifts: [],
  mode: '',
  arrayHelpers: {},
}

ShiftTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  shifts: PropTypes.array,
  mode: PropTypes.string,
}
export default ShiftTable
