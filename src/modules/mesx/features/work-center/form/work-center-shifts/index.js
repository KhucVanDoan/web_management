import { Button, FormHelperText, IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { isAfter } from 'date-fns'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { scrollToBottom } from '~/utils'

const ShiftTable = ({
  mode,
  shifts,
  setShifts,
  isSubmitForm,
  arrayHelpers,
}) => {
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
            <Field.TextField name={`shifts[${index}].shiftName`} />
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
              <Field.TextField name={`shifts[${index}].startAt`} type="time" />
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
            <Field.TextField name={`shifts[${index}].endAt`} type="time" />
          )
        },
      },
      {
        field: 'price',
        headerName: t('workCenter.pricePerHour'),
        width: 200,
        align: 'center',
        renderCell: (params, index) => {
          const { id } = params.row
          const shiftObject = shifts?.find((x) => x.id === id)
          const isView = mode === MODAL_MODE.DETAIL
          return isView ? (
            <>{shiftObject?.pricePerHour}</>
          ) : (
            <Field.TextField
              name={`shifts[${index}].pricePerHour`}
              type="number"
            />
          )
        },
      },
      {
        field: 'unit',
        headerName: t('workCenter.priceUnit'),
        width: 200,
        align: 'center',
        renderCell: (params, index) => {
          const { id } = params.row
          const shiftObject = shifts?.find((x) => x.id === id)
          const isView = mode === MODAL_MODE.DETAIL
          return isView ? (
            <>{shiftObject?.priceUnit}</>
          ) : (
            <Field.TextField name={`shifts[${index}].priceUnit`} />
          )
        },
      },
      {
        field: 'remove',
        headerName: '',
        width: 50,
        align: 'center',
        hide: mode === MODAL_MODE.DETAIL,
        renderCell: (params, index) => {
          const idx = shifts.findIndex((shift) => shift.id === params.row.id)
          const hide = mode === MODAL_MODE.DETAIL
          return hide ? null : (
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
        </Typography>
        {!isView && (
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                id: new Date().getTime(),
                name: null,
                startAt: null,
                endAt: null,
                pricePerHour: '',
                priceUnit: '',
                breakTimes: [
                  {
                    id: new Date().getTime(),
                    name: t('workCenter.shiftPreparationTime'),
                    from: null,
                    to: null,
                  },
                ],
              })
              scrollToBottom()
            }}
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
