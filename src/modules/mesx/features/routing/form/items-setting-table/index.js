import React, { useEffect, useMemo } from 'react'

import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { orderBy } from 'lodash'
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
          const { id, stepNumber, min, max } = params.row
          return isView ? (
            <>{+stepNumber}</>
          ) : (
            <Field.TextField
              name={`items[${index}].stepNumber`}
              value={+stepNumber}
              type="number"
              onChange={(e) => onChangeItem(id, 'stepNumber', e)}
              disabled={isView}
              inputProps={{
                min,
                max,
              }}
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
          const { id } = params.row
          // const idx = items.findIndex((item) => item.id === params.row.id)
          return (
            <IconButton
              onClick={() => {
                onRemoveItem(id)
                // arrayHelpers.remove(idx)
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

  const onRemoveItem = (id) => {
    let producingStep = [...items]
      .filter((item) => item.id !== id)
      .map((item, index) => ({
        ...item,
        id: index + 1,
      }))
    const newProducingSteps = sortOrder(producingStep)
    return newProducingSteps
  }

  const sortOrder = (v) => {
    let newStepNumber = 1
    const producingStep = orderBy(v, 'stepNumber', 'asc')

    const newProducingSteps = producingStep
      .map((step, index, stepArr) => {
        if (index > 0 && step.stepNumber > stepArr[index - 1].stepNumber) {
          newStepNumber++
          return {
            ...step,
            newStep: newStepNumber,
          }
        } else {
          return {
            ...step,
            newStep: newStepNumber,
          }
        }
      })
      .map((step) => {
        const { id, newStep, operationId } = step
        return { id, operationId, stepNumber: newStep }
      })
    return newProducingSteps
  }

  const onChangeItem = (id, key, e) => {
    const producingSteps = [...items]
    const indexItemToChange = producingSteps?.findIndex(
      (item) => item?.id === id,
    )

    producingSteps[indexItemToChange][key] = e

    //kiểm tra có tồn tại producing step trước ko nếu có tính lại min max của producing step hiện tại
    if (key === 'stepNumber' && producingSteps[indexItemToChange - 1]) {
      producingSteps[indexItemToChange].min =
        +producingSteps[indexItemToChange - 1].stepNumber
      producingSteps[indexItemToChange].max =
        +producingSteps[indexItemToChange - 1].stepNumber + 1
    }

    //kiểm tra có tồn tại producing step sau ko nếu có tính lại min max và stepNumber của producing step sau
    if (key === 'stepNumber' && producingSteps[indexItemToChange + 1]) {
      producingSteps[indexItemToChange + 1].min = +e
      producingSteps[indexItemToChange + 1].max = +e + 1
      if (
        producingSteps[indexItemToChange + 1].stepNumber >
        producingSteps[indexItemToChange + 1].max
      ) {
        producingSteps[indexItemToChange + 1].stepNumber =
          producingSteps[indexItemToChange + 1].max
      }
      if (producingSteps[indexItemToChange + 1].stepNumber > e + 1) {
        producingSteps[indexItemToChange + 1].stepNumber = +e + 1
      }
    }
  }

  const onChangeRowsOrder = (rows) => {
    setState({
      items: rows.map((item, index) => ({
        ...item,
        id: index + 1,
        stepNumber: index + 1,
      })),
    })
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
                let stepNow = 0
                let min = 1
                let max = 1
                for (let i = 0; i < items.length; i++) {
                  stepNow = +items[i].stepNumber + 1
                  min = items[i - 1] ? +items[i - 1]?.stepNumber : 1
                  max = items[i - 1] ? +items[i - 1]?.stepNumber + 1 : 2
                }
                arrayHelpers.push({
                  id: items.length + 1,
                  itemId: '',
                  stepNumber: stepNow,
                  min,
                  max,
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
        onChangeRowsOrder={onChangeRowsOrder}
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
