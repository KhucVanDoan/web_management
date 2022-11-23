import React, { useEffect } from 'react'

import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import Page from '~/components/Page'
import useLicense from '~/modules/wmsx/redux/hooks/useLicense'
import { useClasses } from '~/themes'
import { convertUtcDateTimeToLocalTz } from '~/utils'

import { ROUTE } from '../../routes/config'
import style from './style'
const breadcrumbs = [
  {
    title: 'setting',
  },
  {
    route: ROUTE.LICENSE.PATH,
    title: ROUTE.LICENSE.TITLE,
  },
]
const LicenseDetail = () => {
  const classes = useClasses(style)
  const { t } = useTranslation('wmsx')
  const {
    data: { license, isLoading },
    actions,
  } = useLicense()
  useEffect(() => {
    actions?.detailLicense()
  }, [])
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
      <Page
        breadcrumbs={breadcrumbs}
        title={t('menu.license')}
        loading={isLoading}
      >
        <DataTable
          title={t('menu.license')}
          rows={license}
          columns={columns}
          hideSetting
          hideFooter
        />
      </Page>
    </>
  )
}

export default LicenseDetail
