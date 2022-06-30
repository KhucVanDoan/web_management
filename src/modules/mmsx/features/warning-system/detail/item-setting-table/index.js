import React, { useMemo } from 'react'

import { Checkbox, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'

const ItemSettingTable = ({ items }) => {
  const { t } = useTranslation(['mmsx'])

  const columns = useMemo(
    () => [
      {
        field: 'id',
        headerName: '#',
        width: 50,
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'title',
        width: 150,
        headerName: t('jobList.checklistDetail.title'),
        align: 'center',
        renderCell: (params) => {
          return params?.row?.title
        },
      },
      {
        field: 'description',
        width: 300,
        headerName: t('jobList.checklistDetail.description'),
        align: 'center',
        renderCell: (params) => {
          return params?.row?.description ?? params?.subtitle
        },
      },
      {
        field: 'obligatory',
        width: 100,
        headerName: t('jobList.checklistDetail.obligatory'),
        align: 'center',
        renderCell: (params) => {
          return (
            <Checkbox
              checked={params?.row?.obligatory === '1' ? true : false}
              name="obligatory"
              disabled
            />
          )
        },
      },
      {
        field: 'result',
        width: 300,
        headerName: t('jobList.checklistDetail.result'),
        align: 'center',
        renderCell: (params) => {
          return params?.row?.status === '1'
            ? t('jobList.checklistDetail.pass')
            : params?.row?.status === '0'
            ? t('jobList.checklistDetail.fail')
            : ''
        },
      },
    ],
    [items],
  )

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
        <Typography variant="h4">
          {t('jobList.checklistDetail.cardTitle')}
        </Typography>
      </Box>
      <DataTable
        rows={items}
        columns={columns}
        hideSetting
        hideFooter
        total={items.length}
        striped={false}
      />
    </>
  )
}

ItemSettingTable.defaultProps = {
  items: [],
  arrayHelpers: {},
}

ItemSettingTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  items: PropTypes.array,
}

export default ItemSettingTable
