import React, { useEffect, useMemo } from 'react'

import { Grid, IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import useCommonManagement from '~/modules/wmsx/redux/hooks/useCommonManagement'
import { scrollToBottom } from '~/utils'

const PackagesSettingTable = ({ items, arrayHelpers }) => {
  const { t } = useTranslation(['wmsx'])
  const {
    data: { packageList, blockList },
    actions,
  } = useCommonManagement()

  useEffect(() => {
    actions.getBlocks({ isGetAll: 1 })
    actions.getPackages({ isGetAll: 1, withItem: 1 })
  }, [])
  const columns = useMemo(
    () => [
      {
        field: 'packageId',
        width: 400,
        renderCell: (params, index) => {
          const itemIdCodeList = items.map((item) => item?.packageId)
          return (
            <Field.Autocomplete
              name={`packages[${index}].packageId`}
              label={t('definePallet.package.name')}
              placeholder={t('definePallet.package.choosePackage')}
              options={[...packageList, blockList]}
              getOptionLabel={(opt) => opt?.name}
              getOptionValue={(opt) => opt?.id}
              getOptionSubLabel={(opt) => opt?.code}
              getOptionDisabled={(opt) =>
                itemIdCodeList.some((id) => id === opt?.id) &&
                opt?.id !== items[index]?.packageId
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
              name={`packages[${index}].quantity`}
              label={t('definePallet.package.amount')}
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
    [items, packageList, blockList],
  )

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h4" mt={1} mb={1}>
          {t('definePallet.packageList')}
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
              packageId: '',
              quantity: 1,
            })
            scrollToBottom()
          }}
        >
          {t('definePallet.addPackageButton')}
        </Button>
      </Box>
    </>
  )
}

PackagesSettingTable.defaultProps = {
  items: [],
  arrayHelpers: {},
}

PackagesSettingTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  items: PropTypes.array,
}

export default PackagesSettingTable
