/* eslint-disable no-param-reassign */

import React, { useState } from 'react'

import { IconButton } from '@mui/material'
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

const BreakTimeTable = ({ breakTimes, shifts, mode, arrayHelpers }) => {
  const [pageSize, setPageSize] = useState(5)
  const [page, setPage] = useState(1)
  const { t } = useTranslation(['mesx'])
  const getColumns = () => {
    const columns = [
      {
        field: 'breakTimeName',
        headerName: t('workCenter.relaxName'),
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params, index) => {
          const { id } = params.row
          const isView = mode === MODAL_MODE.DETAIL
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
          sortable: false,
          filterable: false,
          align: 'center',
          headerAlign: 'center',
          renderCell: (params, index) => {
            const { id } = params.row
            const isView = mode === MODAL_MODE.DETAIL
            const content =
              shift?.breakTimes[id]?.from && shift?.breakTimes[id]?.to
                ? `${shift.breakTimes[id]?.from} - ${shift.breakTimes[id]?.to}`
                : ''
            return isView ? (
              <>{content}</>
            ) : (
              <Box flex={1} alignItems="center" key={shiftIndex}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flex={1}
                >
                  <Field.TextField
                    name={`breakTimes[${index}].from`}
                    type="time"
                  />
                  <Box mx={1} display="flex" alignItems="center">
                    {t('workCenter.to')}
                  </Box>
                  <Field.TextField
                    name={`breakTimes[${index}].to`}
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
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
        hide: mode === MODAL_MODE.DETAIL,
        renderCell: (params) => {
          const idx = breakTimes.findIndex((item) => item.id === params.row.id)
          const hide = mode === MODAL_MODE.DETAIL
          return hide ? null : (
            <IconButton
              type="button"
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

  const onPageSizeChange = ({ pageSize }) => {
    setPageSize(pageSize)
  }

  const onPageChange = ({ page }) => {
    setPage(page)
  }

  const isView = mode === MODAL_MODE.DETAIL
  return (
    <Box width={8 / 8}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h3>{t('workCenter.breakTime')}</h3>
        <Box>
          {!isView && (
            <Button
              onClick={() => {
                arrayHelpers.push({
                  id: new Date().getTime(),
                })
                scrollToBottom()
              }}
              icon="add"
            >
              {t('workCenter.timeSetup')}
            </Button>
          )}
        </Box>
      </Box>
      <DataTable
        height={250}
        rows={breakTimes}
        pageSize={pageSize}
        page={page}
        columns={getColumns()}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        total={breakTimes?.length}
        hideFooter
        hideSetting
      />
    </Box>
  )
}
BreakTimeTable.defaultProps = {
  shifts: [],
  mode: '',
  arrayHelpers: {},
  breakTimes: [],
}

BreakTimeTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  shifts: PropTypes.array,
  breakTimes: PropTypes.array,
  mode: PropTypes.string,
}
export default BreakTimeTable
