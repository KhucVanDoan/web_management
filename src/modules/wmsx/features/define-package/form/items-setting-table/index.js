import React, { useMemo } from 'react'

import { Grid, IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT, TEXTFIELD_ALLOW } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { getItemsApi } from '~/modules/mesx/redux/sagas/common/get-items'
import { scrollToBottom } from '~/utils'

const ItemSettingTable = ({ items, arrayHelpers }) => {
  const { t } = useTranslation(['wmsx'])

  const columns = useMemo(
    () => [
      {
        field: 'itemId',
        width: 400,
        renderCell: (params, index) => {
          const itemIdCodeList = items.map((item) => item?.itemId?.id)
          return (
            <Field.Autocomplete
              name={`items[${index}].itemId`}
              label={t('definePackage.productName')}
              placeholder={t('definePackage.productName')}
              asyncRequest={(s) =>
                getItemsApi({ keyword: s, limit: ASYNC_SEARCH_LIMIT })
              }
              asyncRequestHelper={(res) => res?.data?.items}
              getOptionLabel={(opt) => opt?.name}
              getOptionSubLabel={(opt) => opt?.code}
              getOptionDisabled={(opt) =>
                itemIdCodeList.some((id) => id === opt?.id) &&
                opt?.id !== items[index]?.itemId?.id
              }
              required
            />
          )
        },
      },
      {
        field: 'quantity',
        width: 100,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].quantity`}
              label={t('definePackage.productAmount')}
              type="number"
              allow={TEXTFIELD_ALLOW.NUMERIC}
            />
          )
        },
      },
      {
        field: 'action',
        width: 100,
        renderCell: (params) => {
          const idx = items.findIndex(
            (item) => item?.itemId?.id === params.row?.itemId?.id,
          )
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
      <Grid item xs={12}>
        <Typography variant="h4" mt={1} mb={1}>
          {t('definePackage.productList')}
        </Typography>
      </Grid>
      <DataTable
        rows={items}
        columns={columns}
        total={items.length}
        striped={false}
        hideSetting
        hideFooter
      />

      <Box mt={1}>
        <Button
          variant="outlined"
          onClick={() => {
            arrayHelpers.push({
              itemId: '',
              quantity: 1,
            })
            scrollToBottom()
          }}
        >
          {t('definePackage.addProductButton')}
        </Button>
      </Box>
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
