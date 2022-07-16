import React, { useMemo } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'

import {} from '~/modules/mmsx/constants'

const ItemSettingDetail = ({ items }) => {
  const { t } = useTranslation(['mmsx'])

  const columns = useMemo(
    () => [
      {
        field: 'id',
        headerName: '#',
        width: 80,
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'materialCode',
        headerName: t('suppliesRequest.form.field.materialCode'),
        width: 200,
        renderCell: (params) => {
          return <>{params.row.materialCode}</>
        },
      },
      {
        field: 'materialName',
        headerName: t('suppliesRequest.form.field.materialName'),
        width: 200,
        renderCell: (params) => {
          return <>{params.row.materialName}</>
        },
      },
      {
        field: 'materialType',
        headerName: t('suppliesRequest.form.field.materialType'),
        width: 100,
        renderCell: (params) => {
          return <>{params.row.materialType}</>
        },
      },
      {
        field: 'materialUnit',
        headerName: t('suppliesRequest.form.field.materialUnit'),
        width: 150,
        renderCell: (params) => {
          return <>{params.row.materialUnit}</>
        },
      },
      {
        field: 'materialPrice',
        headerName: t('suppliesRequest.form.field.materialPrice'),
        width: 150,
        align: 'right',
        renderCell: (params) => {
          return <>{params.row.materialPrice}</>
        },
      },
      {
        field: 'requireAmount',
        headerName: t('suppliesRequest.form.field.requireAmount'),
        width: 150,
        align: 'right',
        renderCell: (params) => {
          return <>{params.row.requireAmount}</>
        },
      },
      {
        field: 'stockQuantity',
        headerName: t('suppliesRequest.form.field.stockQuantity'),
        width: 150,
        align: 'right',
        renderCell: (params) => {
          return <>{params.row.stockQuantity}</>
        },
      },
      {
        field: 'planQuantity',
        headerName: t('suppliesRequest.form.field.planQuantity'),
        width: 150,
        align: 'right',
        renderCell: (params) => {
          return <>{params.row.planQuantity}</>
        },
      },
      {
        field: 'buyQuantity',
        headerName: t('suppliesRequest.form.field.buyQuantity'),
        width: 150,
        align: 'right',
        renderCell: (params) => {
          return <>{params.row.buyQuantity}</>
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
        <Typography variant="h4" mt={1} mb={1}>
          {t('suppliesRequest.form.table')}
        </Typography>
      </Box>
      <DataTable
        rows={items || []}
        columns={columns}
        striped={false}
        hideSetting
        hideFooter
      />
    </>
  )
}

ItemSettingDetail.defaultProps = {
  items: [],
}

ItemSettingDetail.propTypes = {
  items: PropTypes.array,
}

export default ItemSettingDetail
