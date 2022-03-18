import { useEffect } from 'react'

import { Box, IconButton, Typography } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { scrollToBottom } from '~/utils'

function RelaxTable(props) {
  const { shifts, breakTimes, arrayHelpers, setFieldValue } = props
  const { t } = useTranslation(['mesx'])
  const getColumns = () => {
    const columns = [
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
        headerName: t('planCalendar.setupYearCalendar.shiftRelaxName'),
        width: 150,
        align: 'center',
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`breakTimes[${index}].title`}
              variant="outlined"
              margin="dense"
              placeholder={t('planCalendar.setupYearCalendar.shiftRelaxName')}
            />
          )
        },
      },
    ]
    if (shifts) {
      shifts?.map((shift, shiftIndex) => {
        columns.push({
          field: shift?.title,
          headerName: shift?.title,
          width: 200,
          align: 'center',
          renderCell: (params, index) => {
            return (
              <Box flex={1} alignItems="center" key={shiftIndex}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flex={1}
                >
                  <Field.TextField
                    name={`breakTimes[${index}].shifts[${shiftIndex}].from`}
                    type="time"
                  />
                  <Box mx={1} display="flex" alignItems="center">
                    {t('planCalendar.to')}
                  </Box>
                  <Field.TextField
                    name={`breakTimes[${index}].shifts[${shiftIndex}].to`}
                    type="time"
                  />
                </Box>
              </Box>
            )
          },
        })
        return columns
      })
    }

    const removeColumns = [
      {
        field: 'remove',
        headerName: '',
        width: 50,
        align: 'center',
        renderCell: (params) => {
          const idx = breakTimes.findIndex(
            (item) => item?.id === params?.row?.id,
          )
          return (
            <IconButton
              onClick={() => {
                arrayHelpers.remove(idx)
              }}
              disabled={breakTimes?.length === 1}
            >
              <Icon name="remove" />
            </IconButton>
          )
        },
      },
    ]
    return columns.concat(removeColumns)
  }

  useEffect(() => {
    const newBreakTimes = breakTimes?.map((item) => {
      const newShifts = shifts?.map((shift) => {
        const currentShift = item?.shifts?.find(
          (itemShift) => itemShift?.shiftId === shift?.id,
        )
        if (currentShift) {
          return currentShift
        }
        return {
          shiftId: shift.id,
          from: '',
          to: '',
        }
      })
      return {
        ...item,
        shifts: newShifts,
      }
    })
    setFieldValue('breakTimes', newBreakTimes)
  }, [shifts?.length])
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
          {t('planCalendar.setupYearCalendar.relaxTime')}
        </Typography>
        <Box>
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                id: new Date().getTime(),
              })
              scrollToBottom()
            }}
          >
            {t('planCalendar.setupYearCalendar.addShiftRelax')}
          </Button>
        </Box>
      </Box>
      <DataTable
        rows={breakTimes}
        columns={getColumns()}
        total={breakTimes?.length}
        striped={false}
        hideSetting
        hideFooter
      />
    </>
  )
}

RelaxTable.defaultProps = {
  shifts: [],
  arrayHelpers: {},
  breakTimes: [],
}

RelaxTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  shifts: PropTypes.array,
  breakTimes: PropTypes.array,
}
export default RelaxTable
