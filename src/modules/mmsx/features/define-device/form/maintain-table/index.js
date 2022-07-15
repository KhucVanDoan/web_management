import React from 'react'

import InfoIcon from '@mui/icons-material/Info'
import { Box, InputAdornment, Tooltip, Typography } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE, TEXTFIELD_ALLOW } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import { TYPE_ITEM_MAP } from '~/modules/mmsx/constants'

const MaintainTable = ({
  accessoriesMaintenanceInformation,
  mode,
  deviceDetail,
}) => {
  const { t } = useTranslation(['mmsx'])
  const isView = mode === MODAL_MODE.DETAIL

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
        const maintenancePeriod = params?.row?.maintenancePeriod

        return isView ? (
          maintenancePeriod ? (
            `${maintenancePeriod} ${t('common.suffix.minute')}`
          ) : (
            ''
          )
        ) : (
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
      field: 'mtbf',
      width: 200,
      headerName: () => {
        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {t('deviceList.form.mtbf')}
            <Tooltip
              title={t('deviceList.tooltipHeader.mtbf')}
              arrow
              placement="top"
            >
              <InfoIcon sx={{ fontSize: 16 }} />
            </Tooltip>
          </Box>
        )
      },
      align: 'center',
      renderCell: (params, index) => {
        const mtbfIndex =
          params?.row?.mtbfIndex?.indexValue || params?.row?.mtbfIndex

        return isView ? (
          Math.round(+mtbfIndex) ? (
            `${Math.round(+mtbfIndex)} ${t('common.suffix.minute')} ~ ${
              Math.round(+mtbfIndex) * Math.round(+deviceDetail?.frequency)
            }
         ${deviceDetail?.maintenanceAttribute?.name}`
          ) : (
            ''
          )
        ) : (
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
      field: 'mttr',
      width: 200,
      headerName: () => {
        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {t('deviceList.form.mttr')}
            <Tooltip
              title={t('deviceList.tooltipHeader.mttr')}
              arrow
              placement="top"
            >
              <InfoIcon sx={{ fontSize: 16 }} />
            </Tooltip>
          </Box>
        )
      },
      align: 'center',
      renderCell: (params, index) => {
        const mttrIndex = params?.row?.mttrIndex
        return isView ? (
          mttrIndex ? (
            `${mttrIndex} ${t('common.suffix.minute')}`
          ) : (
            ''
          )
        ) : (
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
      field: 'mtta',
      width: 200,
      headerName: () => {
        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {t('deviceList.form.mtta')}
            <Tooltip
              title={t('deviceList.tooltipHeader.mtta')}
              arrow
              placement="top"
            >
              <InfoIcon sx={{ fontSize: 16 }} />
            </Tooltip>
          </Box>
        )
      },
      align: 'center',
      renderCell: (params, index) => {
        const mttaIndex = params?.row?.mttaIndex

        return isView ? (
          mttaIndex ? (
            `${mttaIndex} ${t('common.suffix.minute')}`
          ) : (
            ''
          )
        ) : (
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
      headerName: () => {
        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {t('deviceList.form.mttf')}
            <Tooltip
              title={t('deviceList.tooltipHeader.mttf')}
              arrow
              placement="top"
            >
              <InfoIcon sx={{ fontSize: 16 }} />
            </Tooltip>
          </Box>
        )
      },
      align: 'center',
      renderCell: (params, index) => {
        const mttfIndex =
          params?.row?.mttfIndex?.indexValue || params?.row?.mttfIndex

        return isView ? (
          Math.round(+mttfIndex) ? (
            `${Math.round(+mttfIndex)} ${t('common.suffix.minute')} ~ ${
              Math.round(+mttfIndex) * Math.round(+deviceDetail?.frequency)
            }
         ${deviceDetail?.maintenanceAttribute?.name}`
          ) : (
            ''
          )
        ) : (
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
            disabled={params?.row?.disableMttf || false}
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
  mode: '',
  deviceDetail: {},
}

MaintainTable.propTypes = {
  accessoriesMaintenanceInformation: PropTypes.array,
  mode: PropTypes.string,
  deviceDetail: PropTypes.shape(),
}

export default MaintainTable
