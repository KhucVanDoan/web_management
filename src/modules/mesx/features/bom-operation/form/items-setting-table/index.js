import React from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'

const ItemSettingTable = ({ items, mode }) => {
  const { t } = useTranslation(['mesx'])
  const isView = mode === MODAL_MODE.DETAIL

  const {
    data: { itemList },
    // actions: actionCommon,
  } = useCommonManagement()

  const getItemObject = (id) => {
    return itemList.find((item) => item?.id === id)
  }

  const extendedColumns = items?.[0]?.producingStepData || []

  const columns = [
    // {
    //   field: 'id',
    //   headerName: '#',
    //   width: 50,
    //   align: 'center',
    //   renderCell: (_, index) => {
    //     return index + 1
    //   },
    // },
    {
      field: 'materialCode',
      headerName: t('bomProducingStep.materialCode'),
      width: 150,
      align: 'center',
      renderCell: (params) => {
        return params?.row?.bomDetail?.itemId
      },
    },
    {
      field: 'materialName',
      headerName: t('bomProducingStep.materialName'),
      width: 150,
      align: 'center',
      renderCell: (params) => {
        const itemId = params.row?.bomDetail?.itemId
        return getItemObject(itemId)?.name || ''
      },
    },
    {
      field: 'total',
      headerName: t('bomProducingStep.total'),
      width: 120,
      align: 'center',
      renderCell: (params) => {
        return params?.row?.bomDetail?.quantity
      },
    },
    {
      field: 'unit',
      headerName: t('bomProducingStep.unit'),
      width: 120,
      align: 'center',
      renderCell: (params) => {
        const itemId = params.row?.bomDetail?.itemId
        return getItemObject(itemId)?.itemUnit?.name || ''
      },
    },
    ...extendedColumns.map((col, stepIndex) => {
      return {
        field: `step_${stepIndex}`,
        headerName: col?.producingStep?.name,
        width: 120,
        align: 'center',
        renderCell: (params, index) => {
          const { producingStepData } = params.row
          if (!producingStepData) return 0

          return isView ? (
            <>{producingStepData?.[stepIndex]?.quantity}</>
          ) : (
            <Field.TextField
              name={`items[${index}].producingStepData[${stepIndex}].quantity`}
              type="number"
            />
          )
        },
      }
    }),
  ]

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
          {t('bomProducingStep.detailInfo')}
        </Typography>
      </Box>

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
  mode: '',
  arrayHelpers: {},
}

ItemSettingTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  items: PropTypes.array,
  mode: PropTypes.string,
}

export default ItemSettingTable
