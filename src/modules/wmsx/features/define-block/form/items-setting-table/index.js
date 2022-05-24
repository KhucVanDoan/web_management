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
import { convertFilterParams, scrollToBottom } from '~/utils'

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
              label={t('defineBlock.productName')}
              placeholder={t('defineBlock.productName')}
              options={items}
              asyncRequest={(s) =>
                getItemsApi({
                  keyword: s,
                  limit: ASYNC_SEARCH_LIMIT,
                  filter: convertFilterParams({
                    hasItemDetail: true,
                    isGetAll: 1,
                  }),
                })
              }
              asyncRequestHelper={(res) => res?.data?.items}
              getOptionLabel={(opt) => opt?.name}
              getOptionSubLabel={(opt) => opt?.code}
              getOptionDisabled={(opt) =>
                itemIdCodeList.some((id) => id === opt?.id)
              }
              required
            />
          )
        },
      },
      {
        field: 'detailId',
        width: 400,
        renderCell: (params, index) => {
          const itemId = params.row?.itemId
          return (
            <Field.Autocomplete
              name={`items[${index}].detailId`}
              label={t('defineBlock.details')}
              options={[]}
              placeholder={t('defineBlock.details')}
              getOptionLabel={(opt) => opt?.name}
              getOptionSubLabel={(opt) => opt?.code}
              required
              disabled={itemId ? false : true}
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
              label={t('defineBlock.productAmount')}
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
      <Grid item xs={12}>
        <Typography variant="h4" mt={1} mb={1}>
          {t('defineBlock.productList')}
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
              detailId: '',
              quantity: 1,
            })
            scrollToBottom()
          }}
        >
          {t('defineBlock.addProductButton')}
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