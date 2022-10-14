import React from 'react'

import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { ROUTE } from '~/modules/auth/routes/config'
import useLicense from '~/modules/public/redux/hooks/useLicense'
import { useClasses } from '~/themes'
import { convertUtcDateTimeToLocalTz } from '~/utils'

import style from './style'

const LicenseDetail = () => {
  const classes = useClasses(style)
  const { t } = useTranslation('auth')
  const history = useHistory()
  const {
    data: { license },
  } = useLicense()

  const columns = [
    {
      field: 'id',
      headerName: t('licenseActivation.table.#'),
      width: 50,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'license',
      headerName: t('licenseActivation.table.license'),
      width: 150,
    },
    {
      field: 'numberContract',
      headerName: t('licenseActivation.table.numberContract'),
      width: 150,
      renderCell: (params) => {
        return (
          <Typography className={classes.link}>
            {params.row.numberContract}
          </Typography>
        )
      },
    },
    {
      field: 'departmentNumber',
      headerName: t('licenseActivation.table.departmentUsedQuantity'),
      width: 150,
    },
    {
      field: 'departmentInfo',
      headerName: t('licenseActivation.table.departmentUsed'),
      width: 150,
      renderCell: ({ row }) => <span>{row?.departmentInfo || ''}</span>,
    },
    {
      field: 'dateExpired',
      headerName: t('licenseActivation.table.expiryDate'),
      width: 150,
    },
    {
      field: 'status',
      headerName: t('licenseActivation.table.status'),
      width: 150,
    },
    {
      field: 'dateActived',
      headerName: t('licenseActivation.table.activeDate'),
      width: 150,
      renderCell: (params) =>
        convertUtcDateTimeToLocalTz(params.row.dateActived),
    },
  ]

  return (
    <>
      <Box className={classes.main}>
        <Typography variant="h1" mb={3} sx={{ textAlign: 'center' }}>
          {t('licenseActivation.licenseInfo')}
        </Typography>
        <DataTable rows={[license]} columns={columns} hideSetting hideFooter />
      </Box>
      <Box className={classes.copyright}>
        <Box className={classes.copyrightText}>
          {t('licenseActivation.copyright')}
        </Box>
        <Button
          onClick={() => history.push(ROUTE.LOGIN.PATH)}
          fullWidth
          sx={{ mt: 2 }}
        >
          {t('licenseActivation.connectWMS')}
        </Button>
      </Box>
    </>
  )
}

export default LicenseDetail
