import React, { useEffect } from 'react'

import { IconButton, InputAdornment } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import useCommonInfo from '~/modules/mmsx/redux/hooks/useCommonInfo'
import { convertFilterParams, scrollToBottom } from '~/utils'

function ItemSettingTable(props) {
  const { t } = useTranslation(['mmsx'])
  const { items, arrayHelpers, infoData } = props

  const DEVICE_STATUS_ENUM_CUSTOMIZE = [
    {
      text: 'deviceStatus.status.activating',
      id: 1,
    },
    {
      text: 'deviceStatus.status.stop',
      id: 2,
    },
    {
      text: 'deviceStatus.status.error',
      id: 3,
    },
    {
      text: 'deviceStatus.status.off',
      id: 4,
    },
    {
      text: 'deviceStatus.status.maintenanceOff',
      id: 5,
    },
  ]

  const {
    data: { moListByWorkCenter },
    actions: commonActs,
  } = useCommonInfo()

  useEffect(() => {
    commonActs.getMoByWorkCenter({
      filter: convertFilterParams({
        workCenterId: infoData?.workCenterId,
      }),
    })
  }, [infoData])

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 50,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'date',
      headerName: t('deviceStatus.date'),
      width: 180,
      renderCell: (params, index) => {
        return <Field.DateRangePicker name={`items[${index}].date`} />
      },
    },
    {
      field: 'moId',
      headerName: t('deviceStatus.moName'),
      width: 180,
      renderCell: (params, index) => {
        return (
          <Field.Autocomplete
            name={`items[${index}].moId`}
            placeholder={t('deviceStatus.moName')}
            options={moListByWorkCenter}
            getOptionLabel={(opt) => opt?.name}
            getOptionValue={(opt) => opt?.id}
          />
        )
      },
    },
    {
      field: 'status',
      headerName: t('deviceStatus.status.title'),
      width: 180,
      renderCell: (params, index) => {
        return (
          <Field.Autocomplete
            name={`items[${index}].status`}
            placeholder={t('deviceStatus.status.title')}
            options={DEVICE_STATUS_ENUM_CUSTOMIZE}
            getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
            getOptionValue={(opt) => opt?.id?.toString()}
          />
        )
      },
    },
    {
      field: 'manufacturedDevice',
      headerName: t('deviceStatus.manufacturedDevice'),
      width: 150,
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`items[${index}].manufacturedDevice`}
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                  {''}
                </InputAdornment>
              ),
            }}
          />
        )
      },
    },
    {
      field: 'passedDevice',
      headerName: t('deviceStatus.passedDevice'),
      width: 150,
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`items[${index}].passedDevice`}
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                  {''}
                </InputAdornment>
              ),
            }}
          />
        )
      },
    },
    {
      field: 'remove',
      headerName: '',
      width: 50,
      renderCell: (params) => {
        const idx = items.findIndex((item) => item.id === params.row.id)
        return (
          <IconButton
            onClick={() => arrayHelpers.remove(idx)}
            disabled={items?.length === 1}
            size="large"
          >
            <Icon name="remove" />
          </IconButton>
        )
      },
    },
  ]
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
          {t('deviceStatus.form.tableTitle')}
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
            {t('deviceStatus.form.addInfo')}
          </Button>
        </Box>
      </Box>
      <DataTable
        rows={items}
        columns={columns}
        hideSetting
        hideFooter
        striped={false}
      />
    </>
  )
}

export default ItemSettingTable
