/* eslint-disable */
import React, { Component } from 'react'

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Grid,
} from '@mui/material'
import { withStyles } from '@mui/styles'
import { withTranslation } from 'react-i18next'

import { DATE_FORMAT_2 } from '~/common/constants'
import { formatDateTimeUtc } from '~/utils'

import NewTable from './right-table'
import style from './style'

const rows = (data) => {
  const shift = data[0]?.scheduleShiftDetails?.length
  let rows = []
  ;[...Array(shift).keys()].map((e) => {
    data?.map((d) => {
      rows[e * 3] = {
        ...rows[e * 3],
        ...{
          [d.executionDay]: d.scheduleShiftDetails[e]?.quantity
            ? parseInt(d.scheduleShiftDetails[e]?.quantity)
            : 0,
        },
      }
      rows[e * 3 + 1] = {
        ...rows[e * 3 + 1],
        ...{
          [d.executionDay]: 0,
        },
      }
      rows[e * 3 + 2] = {
        ...rows[e * 3 + 2],
        ...{
          [d.executionDay]: 0,
        },
      }
      rows[e * 3 + 3] = {
        ...rows[e * 3 + 3],
        ...{
          [d.executionDay]: 0,
        },
      }
    })
  })
  rows.map((r) => {
    r['sum'] = sumValues(r)
  })
  return rows
}

const sumValues = (object) => Object.values(object).reduce((a, b) => a + b)
class CustomTable extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      shift: '',
    }
    const { data, t } = this.props

    this.columns = []

    data?.map((s) => {
      this.columns.push({
        field: s?.executionDay,
        headerName: formatDateTimeUtc(s?.executionDay, DATE_FORMAT_2),
        sortable: false,
        align: 'center',

        headerAlign: 'center',
      })
    })

    this.columns.push({
      field: 'sum',
      headerName: t('workCenterPlan.sum'),
      align: 'center',
      sortable: false,
    })
  }
  handleOnChange = (items) => {
    this.props.handleOnChange(items)
  }
  render() {
    const { data, t, mode } = this.props
    const shift = data[0]?.scheduleShiftDetails?.length

    return (
      <Grid style={{ display: 'flex' }}>
        <Table
          style={{
            borderLeft: '1px solid rgba(0,0,0,0.1)',
            maxWidth: '300px',
          }}
        >
          <TableHead
            style={{
              backgroundColor: '#bad9eb',
              fontWeight: 'bold',
            }}
          >
            <TableRow>
              <TableCell colspan={2} style={{ fontWeight: 'bold' }}>
                {t('workCenterPlan.plan')}
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {[...Array(shift).keys()].map((e) => {
              return (
                <>
                  <TableRow style={{ height: '85px' }}>
                    <TableCell rowSpan={3}>ca {e + 1}</TableCell>
                    <TableCell>{t('workCenterPlan.planingAmount')}</TableCell>
                  </TableRow>
                  <TableRow style={{ height: '85px' }}>
                    <TableCell>{t('workCenterPlan.planModeration')}</TableCell>
                  </TableRow>
                  <TableRow style={{ height: '85px' }}>
                    <TableCell>{t('workCenterPlan.productAmount')}</TableCell>
                  </TableRow>
                </>
              )
            })}
            <TableRow style={{ height: '85px' }}>
              <TableCell></TableCell>
              <TableCell colspan={2}>
                {t('workCenterPlan.delayAmount')}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <NewTable
          rows={rows(data)}
          columns={this.columns}
          mode={mode}
          handleOnChange={this.handleOnChange}
        />
      </Grid>
    )
  }
}

export default withTranslation()(withStyles(style)(CustomTable))
