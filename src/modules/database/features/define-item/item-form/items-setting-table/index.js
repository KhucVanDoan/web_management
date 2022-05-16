import React, { useMemo } from 'react'

import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT, TEXTFIELD_ALLOW } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { getDetailsApi } from '~/modules/mesx/redux/sagas/common/get-details'
import { scrollToBottom } from '~/utils'

const ItemSettingTable = ({ items, arrayHelpers }) => {
  const { t } = useTranslation(['database'])

  const columns = useMemo(
    () => [
      {
        field: 'detailId',
        width: 400,
        align: 'center',
        renderCell: (params, index) => {
          const itemIdCodeList = items.map((item) => item?.detailId?.id)
          return (
            <Field.Autocomplete
              name={`items[${index}].detailId`}
              label={t('defineItem.detailName')}
              options={items}
              asyncRequest={(s) =>
                getDetailsApi({ keyword: s, limit: ASYNC_SEARCH_LIMIT })
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
        field: 'quantity',
        width: 100,
        align: 'center',
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].quantity`}
              label={t('defineItem.detailAmount')}
              type="number"
              allow={TEXTFIELD_ALLOW.NUMERIC}
            />
          )
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
          {t('defineItem.addDetailButton')}
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
