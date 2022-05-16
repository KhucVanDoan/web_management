import React, { useMemo } from 'react'

import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import { scrollToBottom } from '~/utils'

const ItemSettingTable = ({ items, arrayHelpers }) => {
  const { t } = useTranslation(['wmsx'])

  const columns = useMemo(
    () => [
      {
        field: 'detailId',
        width: 400,
        align: 'center',
        renderCell: () => {
          return (
            <Field.TextField
              name="floorName"
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
        field: 'quantity',
        width: 100,
        align: 'center',
        renderCell: () => {
          return (
            <Field.TextField
              name="height.value"
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
        field: 'quantity',
        width: 100,
        align: 'center',
        renderCell: () => {
          return (
            <Field.TextField
              name="weightLoad"
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
    ],
    [items],
  )

  return (
    <>
      <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
        <Grid item lg={4} xs={12}>
          <Field.TextField
            name="numberOfFloors"
            label={t('defineTemplateShelf.shelfFloor.numberOfFloors')}
            placeholder={t('defineTemplateShelf.shelfFloor.numberOfFloors')}
            type="number"
          />
        </Grid>
        <Grid item lg={4} xs={12}>
          <Field.TextField
            name="long"
            label={t('defineTemplateShelf.long')}
            placeholder={t('defineTemplateShelf.long')}
            numberProps={{
              decimalScale: 3,
            }}
            disabled
          />
        </Grid>
        <Grid item lg={4} xs={12}>
          <Field.TextField
            name="width"
            label={t('defineTemplateShelf.width')}
            placeholder={t('defineTemplateShelf.width')}
            numberProps={{
              decimalScale: 3,
            }}
            disabled
          />
        </Grid>
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
