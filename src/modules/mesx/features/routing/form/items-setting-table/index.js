import React, { useEffect, useMemo } from 'react'

import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import {
  // DEFAULT_ITEM_TYPE_ENUM,
  MODAL_MODE,
  NUMBER_FIELD_REQUIRED_SIZE,
} from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import useProducingStep from '~/modules/mesx/redux/hooks/useProducingStep'
import useRouting from '~/modules/mesx/redux/hooks/useRouting'
import { scrollToBottom } from '~/utils'

const ItemSettingTable = ({ items, mode, arrayHelpers }) => {
  const { t } = useTranslation(['mesx'])
  const params = useParams()

  const { actions: routingActions } = useRouting()
  const {
    data: { list },
    actions: producingStepActions,
  } = useProducingStep()

  useEffect((id) => {
    if (mode === MODAL_MODE.UPDATE) {
      const id = params?.id
      routingActions.getRoutingDetailsById(id)
    }
    producingStepActions.getProducingSteps()
  }, [])

  const isView = mode === MODAL_MODE.DETAIL

  const getItemObject = (id) => {
    return list.find((item) => item?.id === id)
  }

  const columns = useMemo(
    () => [
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
        field: 'code',
        headerName: t('producingStep.code'),
        width: 200,
        align: 'center',
        renderCell: (params, index) => {
          return isView ? (
            <>{getItemObject(params.row?.id)?.code || ''}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].itemId`}
              options={list}
              getOptionLabel={(option) => option.code || ''}
              getOptionValue={(option) => option?.id}
              disabled={isView}
            />
          )
        },
      },
      {
        field: 'name',
        headerName: t('producingStep.name'),
        width: 200,
        align: 'center',
        renderCell: (params, index) => {
          const itemId = params.row?.itemId
          return isView ? (
            <>{getItemObject(params.row?.id)?.name || ''}</>
          ) : (
            <Field.TextField
              name={`items[${index}].name`}
              value={getItemObject(itemId)?.name || ''}
              disabled={true}
            />
          )
        },
      },
      {
        field: 'order',
        headerName: t('routing.order'),
        width: 200,
        align: 'center',
        renderCell: (params, index) => {
          const { stepNumber } = params.row
          return isView ? (
            <>{+stepNumber}</>
          ) : (
            <Field.TextField
              name={`items[${index}].stepNumber`}
              inputProps={{
                min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
              }}
              type="number"
              disabled={isView}
            />
          )
        },
      },
      {
        field: 'action',
        headerName: t('common.action'),
        width: 200,
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
    [list, items],
  )

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
          {t('routing.detailInfo')}
        </Typography>
        {!isView && (
          <Button
            onClick={() => {
              arrayHelpers.push({
                id: new Date().getTime(),
                itemId: '',
                quantity: 1,
              })
              scrollToBottom()
            }}
            variant="outlined"
          >
            {t('routing.addProducingStep')}
          </Button>
        )}
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