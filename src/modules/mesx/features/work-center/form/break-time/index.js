import React, { useCallback, useEffect } from 'react'

import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { flatMap, uniqBy } from 'lodash'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { scrollToBottom } from '~/utils'

const BreakTimeTable = ({
  breakTimes,
  shifts,
  mode,
  arrayHelpers,
  setFieldValue,
}) => {
  const { t } = useTranslation(['mesx'])
  const isView = mode === MODAL_MODE.DETAIL
  const getColumns = useCallback(() => {
    const columns = [
      {
        field: 'breakTimeName',
        headerName: t('workCenter.relaxName'),
        width: 200,
        align: 'center',
        renderCell: (params, index) => {
          const { id } = params.row
          const relaxTimes = uniqBy(flatMap(shifts, 'breakTimes'), 'id')
          const name = relaxTimes[id]?.name
          return isView ? (
            <>{name}</>
          ) : (
            <Field.TextField
              name={`breakTimes[${index}].breakTimeName`}
              variant="outlined"
              margin="dense"
            />
          )
        },
      },
    ]

    if (shifts) {
      shifts?.map((shift, shiftIndex) => {
        columns.push({
          field: shift?.length + 1,
          headerName: shift?.shiftName,
          width: 200,
          align: 'center',
          renderCell: (params, index) => {
            const { id } = params.row
            const content =
              shift?.breakTimes[id]?.from && shift?.breakTimes[id]?.to
                ? `${shift.breakTimes[id]?.from} - ${shift.breakTimes[id]?.to}`
                : ''
            return isView ? (
              <>{content}</>
            ) : (
              <Box alignItems="center" key={shiftIndex}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Field.TimePicker
                    name={`breakTimes[${index}].shifts[${shiftIndex}].from`}
                  />
                  <Box mx={1} display="flex" alignItems="center">
                    {t('workCenter.to')}
                  </Box>
                  <Field.TimePicker
                    name={`breakTimes[${index}].shifts[${shiftIndex}].to`}
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
        hide: isView,
        renderCell: (params, index) => {
          return isView ? null : (
            <IconButton
              onClick={() => {
                arrayHelpers.remove(index)
              }}
              disabled={index === 0}
            >
              <Icon name="remove" />
            </IconButton>
          )
        },
      },
    ]
    return columns.concat(removeColumns)
  }, [shifts])

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
          mb: 1,
        }}
      >
        <Typography variant="h4" component="span">
          {t('workCenter.breakTime')}
          <Typography color="error" component="span" ml="3px">
            *
          </Typography>
        </Typography>

        {!isView && (
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                id: `breakTimes-${new Date().getTime()}`,
                shifts: shifts.map((shift) => ({
                  shiftId: shift.id,
                  from: '',
                  to: '',
                })),
              })
              scrollToBottom()
            }}
          >
            {t('workCenter.addWorkCenterBreakTimes')}
          </Button>
        )}
      </Box>
      <DataTable
        rows={breakTimes}
        columns={getColumns()}
        total={breakTimes?.length}
        striped={false}
        hideFooter
        hideSetting
      />
    </>
  )
}
BreakTimeTable.defaultProps = {
  shifts: [],
  mode: '',
  arrayHelpers: {},
  breakTimes: [],
  setFieldValue: () => {},
}

BreakTimeTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  shifts: PropTypes.array,
  breakTimes: PropTypes.array,
  mode: PropTypes.string,
  setFieldValue: PropTypes.func,
}
export default BreakTimeTable
