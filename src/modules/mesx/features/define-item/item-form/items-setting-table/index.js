import React, { useEffect, useMemo } from 'react'

import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import { scrollToBottom } from '~/utils'

const ItemSettingTable = ({ items, mode, arrayHelpers }) => {
  const { t } = useTranslation(['mesx'])

  const {
    data: { detailList },
    actions: commonManagementActions,
  } = useCommonManagement()

  useEffect(() => {
    commonManagementActions.getDetails()
  }, [])

  const isView = mode === MODAL_MODE.DETAIL

  const columns = useMemo(
    () => [
      {
        field: 'detailId',
        width: 400,
        align: 'center',
        renderCell: (params, index) => {
          return (
            <Field.Autocomplete
              name={`items[${index}].detailId`}
              label={t('defineItem.detailName')}
              options={detailList}
              getOptionLabel={(option) => option?.name}
              getOptionValue={(option) => option?.id}
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
            />
          )
        },
      },
      {
        field: 'action',
        width: 100,
        align: 'center',
        hide: isView,
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
    [detailList, items],
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
            {t('defineItem.addDetailButton')}
          </Button>
        )}
      </Box>
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
