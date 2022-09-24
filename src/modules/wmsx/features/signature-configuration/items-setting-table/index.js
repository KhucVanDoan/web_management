import React, { useMemo } from 'react'

import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { searchWarehouseApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouse'
import { scrollToBottom } from '~/utils'

const ItemSettingTable = ({ items, arrayHelpers }) => {
  const { t } = useTranslation(['wmsx'])

  const getColumns = useMemo(
    () => [
      {
        field: 'id',
        headerName: t('#'),
        width: 50,
        align: 'center',
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'role',
        headerName: t('signatureConfiguration.role'),
        width: 200,
        renderCell: (params, index) => {
          return (
            <Field.Autocomplete
              name={`items[${index}].role`}
              placeholder={t('signatureConfiguration.role')}
              asyncRequest={(s) =>
                searchWarehouseApi({
                  keyword: s,
                  limit: ASYNC_SEARCH_LIMIT,
                })
              }
              asyncRequestHelper={(res) => res?.data?.items}
              isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
              getOptionLabel={(opt) => opt?.code}
              getOptionSubLabel={(opt) => opt?.name}
            />
          )
        },
      },
      {
        field: 'signerName',
        headerName: t('signatureConfiguration.signerName'),
        width: 200,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].signerName`}
              placeholder={t('signatureConfiguration.signerName')}
              inputProps={{
                maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
              }}
              required
            />
          )
        },
      },
      {
        field: 'remove',
        headerName: t('signatureConfiguration.action'),
        width: 50,
        align: 'center',
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
          {t('signatureConfiguration.list')}
        </Typography>

        <Button
          icon="add"
          onClick={() => {
            arrayHelpers.push({
              id: new Date().getTime(),
              itemId: '',
            })
            scrollToBottom()
          }}
        >
          {t('signatureConfiguration.add')}
        </Button>
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
  arrayHelpers: {},
}

ItemSettingTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  items: PropTypes.array,
  mode: PropTypes.string,
}

export default ItemSettingTable