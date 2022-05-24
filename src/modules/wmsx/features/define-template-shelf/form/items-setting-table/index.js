import React, { useMemo } from 'react'

import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { scrollToBottom } from '~/utils'

const ItemSettingTable = ({ items, arrayHelpers }) => {
  const { t } = useTranslation(['wmsx'])

  const columns = useMemo(
    () => [
      {
        field: 'name',
        width: 400,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].name`}
              label={t('defineTemplateShelf.shelfFloor.name')}
              placeholder={t('defineTemplateShelf.shelfFloor.name')}
              inputProps={{
                maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
              }}
              required
            />
          )
        },
      },
      {
        field: 'height',
        width: 100,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].height.value`}
              label={t('defineTemplateShelf.height')}
              placeholder={t('defineTemplateShelf.height')}
              numberProps={{
                decimalScale: 3,
              }}
              required
            />
          )
        },
      },
      {
        field: 'weightLoad',
        width: 100,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].weightLoad.value`}
              label={t('defineTemplateShelf.weightLoad')}
              placeholder={t('defineTemplateShelf.weightLoad')}
              numberProps={{
                decimalScale: 3,
              }}
              required
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
              name: '',
              height: 0,
              weightLoad: 0,
            })
            scrollToBottom()
          }}
        >
          {t('defineTemplateShelf.addFloorButton')}
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
