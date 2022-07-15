import React, { useEffect, useMemo } from 'react'

import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import useCommonInfo from '~/modules/mmsx/redux/hooks/useCommonInfo'
import { scrollToBottom } from '~/utils'

const ItemSettingTable = ({ items, mode, arrayHelpers }) => {
  const { t } = useTranslation(['mmsx'])
  const isView = mode === MODAL_MODE.DETAIL

  const {
    data: { deviceAssignUsingList },
    actions,
  } = useCommonInfo()

  useEffect(() => {
    actions.getUsingDeviceAssign()
  }, [])

  const getItemObject = (id) => {
    return deviceAssignUsingList?.find((item) => item?._id === id)
  }

  const getColumns = useMemo(
    () => [
      {
        field: 'id',
        headerName: '#',
        width: 50,
        align: 'center',
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'serial',
        headerName: t('requestDevice.form.field.serial'),
        width: 200,
        align: 'center',
        renderCell: (params, index) => {
          const itemIdCodeList = items.map((item) => item.itemId)
          return isView ? (
            <>{params?.row?.serial || ''}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].itemId`}
              options={deviceAssignUsingList}
              disabled={isView}
              getOptionLabel={(opt) => opt?.serial || ''}
              getOptionValue={(opt) => opt?._id}
              getOptionDisabled={(opt) =>
                itemIdCodeList.some((id) => id === opt?._id) &&
                opt?._id !== items[index]?.itemId
              }
            />
          )
        },
      },
      {
        field: 'deviceCode',
        headerName: t('requestDevice.form.field.deviceCode'),
        width: 200,
        align: 'center',
        renderCell: (params, index) => {
          const itemId = params.row?.itemId
          return isView ? (
            <>{params?.row?.device?.code || ''}</>
          ) : (
            <Field.TextField
              name={`items[${index}].code`}
              value={getItemObject(itemId)?.device[0]?.code || ''}
              disabled
            />
          )
        },
      },
      {
        field: 'deviceName',
        headerName: t('requestDevice.form.field.deviceName'),
        width: 200,
        align: 'center',
        renderCell: (params, index) => {
          const { itemId } = params?.row
          return isView ? (
            <>{params?.row?.device?.name || ''}</>
          ) : (
            <Field.TextField
              name={`items[${index}].name`}
              value={getItemObject(itemId)?.device[0]?.name || ''}
              disabled
            />
          )
        },
      },
      {
        field: 'user',
        headerName: t('requestDevice.form.field.personUsing'),
        width: 200,
        align: 'center',
        renderCell: (params, index) => {
          const itemId = params.row?.itemId
          return isView ? (
            <>{params?.row?.user?.username || ''}</>
          ) : (
            <Field.TextField
              name={`items[${index}].user`}
              value={getItemObject(itemId)?.user?.username || ''}
              disabled
            />
          )
        },
      },
      {
        field: 'remove',
        headerName: '',
        width: 50,
        align: 'center',
        hide: isView,
        renderCell: (params) => {
          const idx = items.findIndex((item) => item.id === params.row.id)
          return (
            <IconButton
              type="button"
              onClick={() => {
                arrayHelpers.remove(idx)
              }}
              disabled={items?.length === 1}
            >
              <Icon name="remove" />
            </IconButton>
          )
        },
      },
    ],
    [deviceAssignUsingList, items],
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
        <Typography variant="h4" component="span">
          {t('requestDevice.deviceList')}
        </Typography>

        {!isView && (
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                id: new Date().getTime(),
                itemId: '',
                quantity: 1,
              })
              scrollToBottom()
            }}
          >
            {t('requestDevice.addButton')}
          </Button>
        )}
      </Box>
      <DataTable
        rows={items}
        columns={getColumns}
        total={items.length}
        striped={false}
        hideSetting
        hideFooter
      />
    </>
  )
}

ItemSettingTable.defaultProps = {
  items: [],
  mode: '',
  arrayHelpers: {},
}

ItemSettingTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  items: PropTypes.array,
  mode: PropTypes.string,
}

export default ItemSettingTable
