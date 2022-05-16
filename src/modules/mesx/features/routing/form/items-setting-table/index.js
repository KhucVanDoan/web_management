import React, { useEffect, useMemo } from 'react'

import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { last } from 'lodash'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { MODAL_MODE, ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { PRODUCING_STEP_STATUS } from '~/modules/mesx/constants'
import useProducingStep from '~/modules/mesx/redux/hooks/useProducingStep'
import useRouting from '~/modules/mesx/redux/hooks/useRouting'
import { searchProducingStepsApi } from '~/modules/mesx/redux/sagas/producing-steps/search'
import { ROUTE } from '~/modules/mesx/routes/config'
import { convertFilterParams, scrollToBottom } from '~/utils'

const ItemSettingTable = ({ items, mode, arrayHelpers, setFieldValue }) => {
  const { t } = useTranslation(['mesx'])
  const { id } = useParams()
  const history = useHistory()
  const { actions: routingActions } = useRouting()
  const {
    data: { list },
  } = useProducingStep()

  useEffect(() => {
    if (id) {
      if (mode === MODAL_MODE.UPDATE) {
        routingActions.getRoutingDetailsById(id)
      }
    }
  }, [id])

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
          return isView ? (
            <>{getItemObject(params.row?.id)?.code || ''}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].itemId`}
              asyncRequest={(s) =>
                searchProducingStepsApi({
                  keyword: s,
                  limit: ASYNC_SEARCH_LIMIT,
                  filter: convertFilterParams({
                    status: [PRODUCING_STEP_STATUS.CONFIRMED],
                  }),
                })
              }
              asyncRequestHelper={(res) => res?.data?.items}
              getOptionLabel={(opt) => opt?.code || ''}
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
          const itemId = params.row?.itemId?.id
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
        headerName: t('general:common.action'),
        width: 200,
        align: 'center',
        hide: isView,
        renderCell: (params) => {
          const { id } = params.row
          return (
            <IconButton
              onClick={() => {
                onRemoveItem(id)
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
    const newItems = (items || []).reduce((acc, cur) => {
      if (cur.id === id) return acc

      const removedStepNumber = Number(items[id - 1]?.stepNumber || 0)

      const isEqualNext =
        Number(items?.[id]?.stepNumber || 0) === removedStepNumber
      const isEqualPrev =
        Number(items?.[id - 2]?.stepNumber || 0) === removedStepNumber

      return [
        ...acc,
        {
          ...cur,
          id: last(acc)?.id ? last(acc)?.id + 1 : 1,
          stepNumber:
            Number(cur.stepNumber) <= removedStepNumber ||
            isEqualNext ||
            isEqualPrev
              ? cur.stepNumber
              : Number(cur.stepNumber) - 1,
        },
      ]
    }, [])

    setFieldValue('items', newItems)
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
                const lastItem = last(items || [])
                const lastStepNumber = Number(lastItem?.stepNumber || 0)

                const stepNow = +lastItem.stepNumber + 1
                const min = lastItem ? lastStepNumber : 1
                const max = lastItem ? lastStepNumber + 1 : 1

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
              onClick={() => history.push(ROUTE.PRODUCING_STEP.CREATE.PATH)}
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
