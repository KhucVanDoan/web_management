import React from 'react'

import { InputAdornment, Typography } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import { TYPE_ITEM_MAP } from '~/modules/mmsx/constants'

const MaintainTable = ({ accessoriesMaintenanceInformation }) => {
  const { t } = useTranslation(['mmsx'])

  const accessoriesMaintenanceColumns = [
    {
      field: 'name',
      width: 200,
      headerName: t('deviceList.form.name'),
      renderCell: (params) => {
        return params.row?.supply?.name || params?.row?.name
      },
    },
    {
      field: 'type',
      width: 200,
      headerName: t('deviceList.form.type'),
      renderCell: (params) => {
        return t(
          `${TYPE_ITEM_MAP[params?.row?.supply?.type || params?.row?.type]}`,
        )
      },
    },
    {
      field: 'maintainFrequency',
      width: 200,
      headerName: t('deviceList.form.maintainFrequency'),
      align: 'center',
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`accessoriesMaintenanceInformation[${index}].maintenancePeriod`}
            placeholder={t('deviceList.form.maintainFrequency')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                  {`/ ${t('common.suffix.minute')}`}
                </InputAdornment>
              ),
            }}
            type="number"
            allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
            required
          />
        )
      },
    },
    {
      field: 'mttr',
      width: 200,
      headerName: t('deviceList.form.mttr'),
      align: 'center',
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`accessoriesMaintenanceInformation[${index}].mttrIndex`}
            placeholder={t('deviceList.form.mttr')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                  {`/ ${t('common.suffix.minute')}`}
                </InputAdornment>
              ),
            }}
            type="number"
            allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
            required
          />
        )
      },
    },
    {
      field: 'mtbf',
      width: 200,
      headerName: t('deviceList.form.mtbf'),
      align: 'center',
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`accessoriesMaintenanceInformation[${index}].mtbfIndex`}
            placeholder={t('deviceList.form.mtbf')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                  {`/ ${t('common.suffix.minute')}`}
                </InputAdornment>
              ),
            }}
            type="number"
            allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
            required
          />
        )
      },
    },
    {
      field: 'mtta',
      width: 200,
      headerName: t('deviceList.form.mtta'),
      align: 'center',
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`accessoriesMaintenanceInformation[${index}].mttaIndex`}
            placeholder={t('deviceList.form.mtta')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                  {`/ ${t('common.suffix.minute')}`}
                </InputAdornment>
              ),
            }}
            type="number"
            allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
            required
          />
        )
      },
    },
    {
      field: 'mttf',
      width: 200,
      headerName: t('deviceList.form.mttf'),
      align: 'center',
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`accessoriesMaintenanceInformation[${index}].mttfIndex`}
            placeholder={t('deviceList.form.mttf')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                  {`/ ${t('common.suffix.minute')}`}
                </InputAdornment>
              ),
            }}
            type="number"
            allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
            required
          />
        )
      },
    },
    {
      field: 'mttr',
      width: 200,
      headerName: t('deviceList.form.mttr'),
      align: 'center',
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`accessoriesMaintenanceInformation[${index}].mttrIndex`}
            placeholder={t('deviceList.form.mttr')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                  {`/ ${t('common.suffix.minute')}`}
                </InputAdornment>
              ),
            }}
            type="number"
            allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
            required
          />
        )
      },
    },
  ]

  return (
    <>
      <Typography variant="h4" mb={2}>
        {t('deviceList.maintenanceInformation')}
      </Typography>
      <DataTable
        rows={accessoriesMaintenanceInformation}
        columns={accessoriesMaintenanceColumns}
        striped={false}
        hideSetting
        hideFooter
      />
    </>
  )
}

MaintainTable.defaultProps = {
  accessoriesMaintenanceInformation: [],
}

MaintainTable.propTypes = {
  accessoriesMaintenanceInformation: PropTypes.array,
}

export default MaintainTable
