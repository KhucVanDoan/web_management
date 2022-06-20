import { IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT, MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { searchItemsApi } from '~/modules/database/redux/sagas/define-item/search-items'
function SupperCapacity({ arrayHelpers, mode, vendorAbilities }) {
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL
  const getColumns = () => {
    return [
      // {
      //   field: 'id',
      //   headerName: '#',
      //   sortable: false,
      //   align: 'center',
      //   renderCell: (_, index) => {
      //     return index
      //   },
      // },
      {
        field: 'itemCode',
        headerName: t('defineVendor.itemCode'),
        width: 200,
        align: 'center',
        renderCell: (params, index) => {
          const { id } = params.row
          const vendorCapacityObject = vendorAbilities?.find((x) => x.id === id)
          const itemIdCodeList = vendorAbilities.map((i) => i?.id)
          return isView ? (
            <>{vendorCapacityObject?.item?.code}</>
          ) : (
            <Field.Autocomplete
              name={`vendorAbilities[${index}].itemId`}
              asyncRequest={(s) =>
                searchItemsApi({
                  keyword: s,
                  limit: ASYNC_SEARCH_LIMIT,
                })
              }
              asyncRequestHelper={(res) => res?.data?.items}
              disabled={isView}
              getOptionLabel={(opt) => opt?.code}
              getOptionSubLabel={(opt) => opt?.name}
              getOptionDisabled={(opt) =>
                itemIdCodeList.some((id) => id === opt?.id) &&
                opt?.id !== vendorAbilities[index]?.id
              }
            />
          )
        },
      },
      {
        field: 'itemName',
        headerName: t('defineVendor.itemName'),
        align: 'center',
        width: 200,
        renderCell: (params, index) => {
          const { id } = params.row
          const vendorCapacityObject = vendorAbilities?.find((x) => x.id === id)
          return isView ? (
            <>{vendorCapacityObject?.item?.name}</>
          ) : (
            <Field.TextField
              name={`vendorAbilities[${index}].itemId.name`}
              disabled
            />
          )
        },
      },
      {
        field: 'unit',
        headerName: t('defineVendor.unit'),
        align: 'center',
        width: 200,
        renderCell: (params, index) => {
          const { id } = params.row
          const vendorCapacityObject = vendorAbilities?.find((x) => x.id === id)
          return isView ? (
            <>{vendorCapacityObject?.item?.itemUnit}</>
          ) : (
            <Field.TextField
              name={`vendorAbilities[${index}].itemId.itemUnit.name`}
              disabled
            />
          )
        },
      },
      {
        field: 'quantityAverage',
        headerName: t('defineVendor.quantityAverage'),
        width: 200,
        align: 'center',
        renderCell: (params, index) => {
          const { id } = params.row
          const vendorCapacityObject = vendorAbilities?.find((x) => x.id === id)
          return isView ? (
            <>{vendorCapacityObject?.quantity}</>
          ) : (
            <Field.TextField name={`vendorAbilities[${index}].quantity`} />
          )
        },
      },
      {
        field: 'timeAverage',
        headerName: t('defineVendor.timeAverage'),
        width: 200,
        align: 'center',
        renderCell: (params, index) => {
          const { id } = params.row
          const vendorCapacityObject = vendorAbilities?.find((x) => x.id === id)
          return isView ? (
            <>{vendorCapacityObject?.deliveryTime}</>
          ) : (
            <Field.TextField name={`vendorAbilities[${index}].deliveryTime`} />
          )
        },
      },
      {
        field: 'remove',
        headerName: '',
        width: 50,
        align: 'center',
        hide: mode === MODAL_MODE.DETAIL,
        renderCell: (params, index) => {
          const hide = mode === MODAL_MODE.DETAIL
          return hide ? null : (
            <IconButton
              onClick={() => {
                arrayHelpers.remove(index)
              }}
              disabled={vendorAbilities?.length === 1}
            >
              <Icon name="remove" />
            </IconButton>
          )
        },
      },
    ]
  }
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Typography variant="h4" component="span">
          {t('defineVendor.listItemAverage')}
        </Typography>

        {!isView && (
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                id: new Date().getTime(),
                itemCode: '',
                itemName: '',
                unit: '',
                quantityAverage: '',
                timeAverage: '',
              })
            }}
            icon="add"
          >
            {t('defineVendor.addItem')}
          </Button>
        )}
      </Box>
      <DataTable
        rows={vendorAbilities || []}
        columns={getColumns()}
        total={vendorAbilities?.length}
        striped={false}
        hideFooter
        hideSetting
      />
    </>
  )
}
SupperCapacity.defaultProps = {
  vendorAbilities: [],
  mode: '',
  arrayHelpers: {},
}

SupperCapacity.propTypes = {
  arrayHelpers: PropTypes.shape(),
  vendorAbilities: PropTypes.array,
  mode: PropTypes.string,
}

export default SupperCapacity
