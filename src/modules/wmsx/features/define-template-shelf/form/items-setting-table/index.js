import React, { useMemo } from 'react'

import { Grid, Hidden, IconButton } from '@mui/material'
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

  const validateName = (name, index) => {
    let error = ''
    if (
      items?.some(
        (item, itemIndex) => item?.name === name && itemIndex !== index,
      )
    ) {
      error = t('defineTemplateShelf.shelfFloorNameIsDuplicated')
    }
    return error
  }

  const columns = useMemo(
    () => [
      {
        field: 'name',
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].name`}
              label={t('defineTemplateShelf.shelfFloor.name')}
              placeholder={t('defineTemplateShelf.shelfFloor.name')}
              inputProps={{
                maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
              }}
              validate={(name) => validateName(name, index)}
              required
            />
          )
        },
      },
      {
        field: 'height',
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
      <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
        <Grid item lg={4} xs={12}>
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
        </Grid>
        <Hidden lgDown>
          <Grid item lg={4} xs={12}></Grid>
        </Hidden>
        <Grid item lg={4} xs={12}>
          <Field.TextField
            name="numberOfFloors"
            value={(items || []).length}
            label={t('defineTemplateShelf.shelfFloor.numberOfFloors')}
            sx={{ flex: 1 }}
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
