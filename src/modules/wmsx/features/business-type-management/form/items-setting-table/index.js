import React, { useMemo } from 'react'

import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'

const ItemSettingTable = ({ items, arrayHelpers, mode }) => {
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL

  const columns = useMemo(
    () => [
      {
        field: 'fieldName',
        headerName: t('businessTypeManagement.items.fieldName'),
        width: 250,
        renderCell: (params, index) => {
          return <Field.TextField name={`items[${index}].fieldName`} required />
        },
      },
      {
        field: 'type',
        headerName: t('businessTypeManagement.items.type'),
        width: 250,
        renderCell: (params, index) => {
          return (
            <Field.Autocomplete
              name={`items[${index}].type`}
              options={[]}
              getOptionLabel={(opt) => opt?.name}
              getOptionSubLabel={(opt) => opt?.code}
              required
            />
          )
        },
      },
      {
        field: 'isShow',
        headerName: t('businessTypeManagement.items.show'),
        width: 250,
        renderCell: (params, index) => {
          return <Field.Checkbox name={`items[${index}].show`} />
        },
      },
      {
        field: 'required',
        headerName: t('businessTypeManagement.items.required'),
        width: 250,
        renderCell: (params, index) => {
          return <Field.Checkbox name={`items[${index}].required`} />
        },
      },
      {
        field: 'action',
        width: 100,
        align: 'center',
        renderCell: (params) => {
          const idx = items.findIndex((item) => item.id === params.row.id)
          return (
            <IconButton
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
        <Typography variant="h4" component="span">
          {t('businessTypeManagement.items.list')}
        </Typography>

        {!isView && (
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                id: new Date().getTime(),
                fieldName: '',
                code: '',
                type: '',
                columnName: '',
                tableName: '',
                required: true,
              })
            }}
          >
            {t('businessTypeManagement.addButton')}
          </Button>
        )}
      </Box>
      <DataTable
        rows={items}
        columns={columns}
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
  arrayHelpers: {},
  mode: '',
}

ItemSettingTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  items: PropTypes.array,
  mode: PropTypes.string,
}

export default ItemSettingTable
