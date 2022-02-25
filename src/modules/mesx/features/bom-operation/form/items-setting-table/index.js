import React from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE, NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import useBomProducingStep from '~/modules/mesx/redux/hooks/useBomProducingStep'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'

const ItemSettingTable = ({ items, mode, arrayHelpers }) => {
  const { t } = useTranslation(['mesx'])
  const isView = mode === MODAL_MODE.DETAIL

  const {
    data: { bomProducingStepDetails },
    // actions,
  } = useBomProducingStep()

  const {
    data: { itemList },
    // actions: actionCommon,
  } = useCommonManagement()

  const producingStepList =
    bomProducingStepDetails?.materialDetails?.[0]?.producingStepData

  // useEffect(() => {
  //   if (productId) {
  //     actions.getBomProducingStepDetailsById(productId)
  //   }
  //   return () => {
  //     actions.resetBomProducingStepDetailsState()
  //   }
  // }, [productId])

  const getItemObject = (id) => {
    return itemList.find((item) => item?.id === id)
  }

  const getColumns = () => {
    const columns = [
      {
        field: 'id',
        headerName: '#',
        width: 50,
        align: 'center',
        renderCell: (_, index) => {
          return index + 1
        },
      },
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
        renderCell: (params, index) => {
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
        renderCell: (params, index) => {
          const itemId = params.row?.bomDetail?.itemId
          return getItemObject(itemId)?.itemUnit?.name || ''
        },
      },
    ]
    // [bomProducingStepDetails, items]

    if (!!producingStepList) {
      producingStepList.forEach((i) => {
        columns.push({
          field: 'quantity',
          headerName: i.producingStep.name,
          align: 'center',
          renderCell: (params) => {
            const { producingSteps } = params.row
            if (!producingSteps) return 0

            return isView ? (
              <>{params?.row?.producingStepData[0]?.quantity}</>
            ) : (
              <Field.TextField
                name={i.producingStep.name}
                inputProps={{
                  min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
                }}
                type="number"
                disabled={isView}
              />
            )
          },
        })
      })
    }

    return columns
  }

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
        columns={getColumns()}
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
