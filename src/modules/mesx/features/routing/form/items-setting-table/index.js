import React, { useEffect, useMemo } from 'react'

import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import useProducingStep from '~/modules/mesx/redux/hooks/useProducingStep'
import useRouting from '~/modules/mesx/redux/hooks/useRouting'
import { ROUTE } from '~/modules/mesx/routes/config'
import { scrollToBottom } from '~/utils'

const ItemSettingTable = ({ items, mode, arrayHelpers }) => {
  const { t } = useTranslation(['mesx'])
  const { id } = useParams()
  const history = useHistory()

  const { actions: routingActions } = useRouting()
  const {
    data: { list },
    actions: producingStepActions,
  } = useProducingStep()

  useEffect(() => {
    if (id) {
      if (mode === MODAL_MODE.UPDATE) {
        routingActions.getRoutingDetailsById(id)
      }
    }
  }, [id])

  useEffect(() => {
    producingStepActions.getProducingSteps()
  }, [])

  const isView = mode === MODAL_MODE.DETAIL

  const getItemObject = (id) => {
    return list.find((item) => item?.id === id)
  }

  const columns = useMemo(
    () => [
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
        field: 'code',
        headerName: t('producingStep.code'),
        width: 200,
        align: 'center',
        renderCell: (params, index) => {
          const itemIdCodeList = items.map((item) => item.itemId)
          return isView ? (
            <>{getItemObject(params.row?.id)?.code || ''}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].itemId`}
              options={list}
              getOptionLabel={(option) => option.code || ''}
              getOptionDisabled={(opt) =>
                itemIdCodeList.some((id) => id === opt?.id)
              }
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
          mb: 2,
        }}
      >
        <Typography variant="h4" component="span">
          {t('routing.detailInfo')}
        </Typography>
        {!isView && (
          <Box
            sx={{
              justifyContent: 'flex-end',
            }}
          >
            <Button
              sx={{ mr: 4 / 3 }}
              onClick={() => {
                arrayHelpers.push({
                  id: new Date().getTime(),
                  itemId: '',
                  order: 1,
                  stepNumber: items?.length + 1,
                })
                scrollToBottom()
              }}
              variant="outlined"
            >
              {t('routing.addProducingStep')}
            </Button>
            <Button
              onClick={() => history.push(ROUTE.PRODUCING_STEP.LIST.PATH)}
              variant="outlined"
            >
              {t('routing.createProducingStep')}
            </Button>
          </Box>
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
