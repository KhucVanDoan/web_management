import React, { useState, useEffect } from 'react'

import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import { Typography, Grid, InputAdornment } from '@mui/material'
import Box from '@mui/material/Box'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { MODAL_MODE, DATE_FORMAT } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import TableCollapse from '~/components/TableCollapse'
import { ROUTE } from '~/modules/qmsx/routes/config'
import { formatDateTimeUtc } from '~/utils/date-time'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

const PreviousPlanDetailTable = (props) => {
  const { planBomPrevious, mode, setFieldValue } = props
  const { t } = useTranslation(['qmsx'])
  const [bomTree, setBomTree] = useState([])

  const columns = [
    {
      field: 'productName',
      headerName: t(
        'productionQualityControlPlan.headerDetailTable.productName',
      ),
      width: 150,
      renderCell: (params) => {
        const { item } = params.row
        return item?.name
      },
    },
    {
      field: 'bomName',
      headerName: t('productionQualityControlPlan.headerDetailTable.bomName'),
      width: 150,
      align: 'center',
      renderCell: (params) => {
        const { bom } = params.row
        return bom?.name
      },
    },
    {
      field: 'routingCode',
      headerName: t(
        'productionQualityControlPlan.headerDetailTable.routingCode',
      ),
      width: 150,
      align: 'center',
      renderCell: (params) => {
        const { routing } = params.row
        return routing?.code
      },
    },
    {
      field: 'planQuantity',
      headerName: t(
        'productionQualityControlPlan.headerDetailTable.planQuantity',
      ),
      width: 150,
      align: 'center',
      renderCell: (params) => {
        const { planningQuantity } = params.row
        return planningQuantity
      },
    },
    {
      field: 'itemUnit',
      headerName: t('productionQualityControlPlan.headerDetailTable.itemUnit'),
      width: 150,
      align: 'center',
      renderCell: (params) => {
        const { item } = params?.row
        return item?.itemUnitName
      },
    },
    {
      field: 'productionPlanDate',
      headerName: t(
        'productionQualityControlPlan.headerDetailTable.productionPlanDate',
      ),
      width: 200,
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const { planBom } = params?.row
        return (
          formatDateTimeUtc(planBom?.planFrom, DATE_FORMAT) +
          ' - ' +
          formatDateTimeUtc(planBom?.planTo, DATE_FORMAT)
        )
      },
    },
    {
      field: 'excuteDate',
      headerName: t(
        'productionQualityControlPlan.headerDetailTable.excuteDate',
      ),
      width: 150,
      align: 'center',
      renderCell: (params) => {
        const { planBom } = params?.row
        return formatDateTimeUtc(planBom?.executeDate, DATE_FORMAT)
      },
    },
    {
      field: 'endDate',
      headerName: t('productionQualityControlPlan.headerDetailTable.endDate'),
      width: 150,
      align: 'center',
      renderCell: (params) => {
        const { planBom } = params.row
        return formatDateTimeUtc(planBom?.endDate, DATE_FORMAT)
      },
    },
    {
      field: 'statusPlanBom',
      headerName: t('productionQualityControlPlan.headerDetailTable.status'),
      align: 'center',
      width: 150,
      renderCell: (params) => {
        const { planBom } = params.row
        return planBom?.status
      },
    },
  ]

  const producingStepColumns = [
    {
      field: 'producingStepName',
      headerName: t(
        'productionQualityControlPlan.headerDetailTable.producingStepName',
      ),
      width: 200,
      align: 'center',
      renderCell: (params) => {
        const { producingStep } = params?.row
        return producingStep?.name
      },
    },
    {
      field: 'planQuantity',
      headerName: t(
        'productionQualityControlPlan.headerDetailTable.planQuantity',
      ),
      width: 100,
      align: 'center',
      renderCell: (params) => {
        const { planningQuantity } = params.row
        return planningQuantity
      },
    },
    {
      field: 'productionQuantity',
      headerName: t(
        'productionQualityControlPlan.headerDetailTable.productionQuantity',
      ),
      width: 100,
      align: 'center',
      renderCell: (params) => {
        const { actualQuantityProducingStep } = params.row
        return actualQuantityProducingStep
      },
    },
    {
      field: 'productionPlanDate',
      headerName: t(
        'productionQualityControlPlan.headerDetailTable.productionPlanDate',
      ),
      width: 200,
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const { workOrders } = params?.row
        return (
          formatDateTimeUtc(workOrders[0]?.planFrom, DATE_FORMAT) +
          ' - ' +
          formatDateTimeUtc(workOrders[0]?.planTo, DATE_FORMAT)
        )
      },
    },
    {
      field: 'woCode',
      headerName: t('productionQualityControlPlan.headerDetailTable.woCode'),
      width: 200,
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const { workOrders } = params.row
        return workOrders[0]?.code ? workOrders[0].code : ''
      },
    },
    {
      field: 'qcCheck',
      headerName: t('productionQualityControlPlan.headerDetailTable.qcCheck'),
      width: 50,
      align: 'center',
      renderCell: (params) => {
        const { isQc } = params?.row
        return isQc ? checkedIcon : icon
      },
    },
    {
      field: 'qualityControlPoint',
      headerName: t(
        'productionQualityControlPlan.headerDetailTable.qualityControlPoint',
      ),
      width: 100,
      align: 'center',
      renderCell: (params) => {
        const { producingStep } = params?.row
        return producingStep?.qualityPoint?.name
      },
    },
    {
      field: 'numberOfTimesQc',
      headerName: t(
        'inputQualityControlPlan.headerDetailTable.numberOfTimesQc',
      ),
      width: 50,
      align: 'center',
      renderCell: (params) => {
        const { producingStep } = params?.row
        return producingStep?.qualityPoint?.numberOfTime
      },
    },
    {
      field: 'userQc1st',
      headerName: t('productionQualityControlPlan.headerDetailTable.userQc1st'),
      width: 300,
      align: 'center',
      renderCell: (params) => {
        const { producingStep, keyBomTree, isQc, bomId, type, routingId } =
          params?.row
        const { id, qualityPlanBom } = params?.row?.producingStep
        const { qualityPointUser1s } = producingStep?.qualityPoint
        if (mode === MODAL_MODE.DETAIL) {
          return !isEmpty(qualityPlanBom)
            ? qualityPlanBom[0]?.qualityPlanBomQualityPointUser1s
                ?.map((x) => x?.userName)
                ?.join(', ')
            : null
        } else {
          return (
            <Field.Autocomplete
              name={`formPrevious[${keyBomTree}-${id}].userQc1st`}
              multiple
              disabled={!isQc}
              options={qualityPointUser1s || []}
              getOptionValue={(option) => option?.userId}
              getOptionLabel={(option) => option?.userName}
              onChange={() => {
                setFieldValue(`formPrevious[${keyBomTree}-${id}].bomId`, bomId)
                setFieldValue(`formPrevious[${keyBomTree}-${id}].type`, type)
                setFieldValue(
                  `formPrevious[${keyBomTree}-${id}].routingId`,
                  routingId,
                )
              }}
            />
          )
        }
      },
    },
    {
      field: 'userQc2nd',
      headerName: t('productionQualityControlPlan.headerDetailTable.userQc2nd'),
      width: 300,
      align: 'center',
      renderCell: (params) => {
        const { producingStep, keyBomTree, isQc } = params?.row
        const { id, qualityPlanBom } = params?.row?.producingStep
        const { qualityPointUser2s } = producingStep?.qualityPoint
        const { numberOfTime } = producingStep?.qualityPoint
        if (mode === MODAL_MODE.DETAIL) {
          return !isEmpty(qualityPlanBom)
            ? qualityPlanBom[0]?.qualityPlanBomQualityPointUser2s
                ?.map((x) => x?.userName)
                ?.join(', ')
            : null
        } else {
          return (
            <Field.Autocomplete
              name={`formPrevious[${keyBomTree}-${id}].userQc2nd`}
              multiple
              disabled={!isQc || numberOfTime === 1}
              options={qualityPointUser2s || []}
              getOptionValue={(option) => option?.userId}
              getOptionLabel={(option) => option?.userName}
            />
          )
        }
      },
    },
    {
      field: 'productionQcPlanDate',
      headerName: t(
        'productionQualityControlPlan.headerDetailTable.productionQcPlanDate',
      ),
      align: 'center',
      width: 300,
      renderCell: (params) => {
        const { producingStep, keyBomTree, isQc, itemId, workOrders } =
          params?.row
        const { id, qualityPlanBom } = params?.row?.producingStep
        if (mode === MODAL_MODE.DETAIL) {
          return !isEmpty(qualityPlanBom)
            ? `${formatDateTimeUtc(
                qualityPlanBom[0]?.planFrom,
                DATE_FORMAT,
              )} - ${formatDateTimeUtc(
                qualityPlanBom[0]?.planTo,
                DATE_FORMAT,
              )} `
            : null
        } else {
          return (
            <Field.DateRangePicker
              name={`formPrevious[${keyBomTree}-${id}].productionQcPlanDate`}
              disabled={!isQc}
              minDate={new Date(workOrders[0]?.planFrom)}
              onChange={() => {
                setFieldValue(
                  `formPrevious[${keyBomTree}-${id}].itemId`,
                  itemId,
                )
                setFieldValue(
                  `formPrevious[${keyBomTree}-${id}].workOrderId`,
                  workOrders[0]?.id,
                )
                setFieldValue(
                  `formPrevious[${keyBomTree}-${id}].qualityPointId`,
                  producingStep?.qualityPoint?.id,
                )
              }}
            />
          )
        }
      },
    },
    {
      field: 'planErrorRate',
      headerName: t(
        'productionQualityControlPlan.headerDetailTable.planErrorRate',
      ),
      align: 'center',
      width: 150,
      renderCell: (params) => {
        const {
          producingStep,
          keyBomTree,
          isQc,
          planningQuantity,
          actualQuantityBom,
          actualQuantityProducingStep,
        } = params?.row
        const { id, qualityPlanBom } = params?.row?.producingStep
        const objectValue = {
          id: id,
          keyBomTree: keyBomTree,
          numberOfTime: producingStep?.qualityPoint?.numberOfTime,
          formalityRate: producingStep?.qualityPoint?.formalityRate,
          planQuantity: planningQuantity,
        }
        if (mode === MODAL_MODE.DETAIL) {
          return !isEmpty(qualityPlanBom)
            ? `${+qualityPlanBom[0]?.planErrorRate} %`
            : null
        } else {
          return (
            <Field.TextField
              name={`formPrevious[${keyBomTree}-${id}].planErrorRate`}
              disabled={!isQc}
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ mr: 1 }}>
                    %
                  </InputAdornment>
                ),
              }}
              onChange={(value) => {
                setFieldValue(
                  `formPrevious[${keyBomTree}-${id}].producingStepId`,
                  producingStep?.id,
                )
                setFieldValue(
                  `formPrevious[${keyBomTree}-${id}].keyBomTree`,
                  keyBomTree,
                )
                setFieldValue(
                  `formPrevious[${keyBomTree}-${id}].planningQuantity`,
                  planningQuantity,
                )
                setFieldValue(
                  `formPrevious[${keyBomTree}-${id}].actualQuantityBom`,
                  actualQuantityBom,
                )
                setFieldValue(
                  `formPrevious[${keyBomTree}-${id}].actualQuantityProducingStep`,
                  actualQuantityProducingStep,
                )
                return onChangePlanErrorRate(value, objectValue, setFieldValue)
              }}
            />
          )
        }
      },
    },
    {
      field: 'needQcQuantity',
      headerName: t(
        'productionQualityControlPlan.headerDetailTable.needQcQuantity',
      ),
      width: 100,
      align: 'center',
      renderCell: (params) => {
        const { needQCQuantity } = params?.row?.producingStep
        return needQCQuantity
      },
    },
    {
      field: 'planQcQuantity',
      headerName: t(
        'productionQualityControlPlan.headerDetailTable.qcPlanQuantity',
      ),
      align: 'center',
      width: 200,
      renderCell: (params) => {
        const { keyBomTree, isQc } = params?.row
        const { id, qualityPlanBom } = params?.row?.producingStep
        if (mode === MODAL_MODE.DETAIL) {
          return !isEmpty(qualityPlanBom)
            ? +qualityPlanBom[0]?.planQcQuantity
            : null
        } else {
          return (
            <Field.TextField
              name={`formPrevious[${keyBomTree}-${id}].planQcQuantity`}
              disabled={!isQc}
              type="number"
            />
          )
        }
      },
    },
    {
      field: 'qcDoneQuantity',
      headerName: t(
        'productionQualityControlPlan.headerDetailTable.qcDoneQuantity',
      ),
      width: 100,
      align: 'center',
      renderCell: (params) => {
        const { doneQCQuantity } = params?.row?.producingStep
        return doneQCQuantity ? doneQCQuantity : 0
      },
    },
    {
      field: 'qcPassQuantity',
      headerName: t(
        'productionQualityControlPlan.headerDetailTable.qcPassQuantity',
      ),
      width: 100,
      align: 'center',
      renderCell: (params) => {
        const { passedQCQuantity } = params?.row?.producingStep
        return passedQCQuantity ? passedQCQuantity : 0
      },
    },
    {
      field: 'errorReport',
      headerName: t(
        'productionQualityControlPlan.headerDetailTable.errorReport',
      ),
      width: 150,
      align: 'center',
      renderCell: (params) => {
        const { errorReportIds } = params?.row?.producingStep
        return errorReportIds?.length > 0 ? (
          <Button
            variant="text"
            size="small"
            bold={false}
            component={Link}
            to={
              ROUTE.DEFINE_ERROR_REPORT.LIST.PATH +
              '?errorReportId=' +
              errorReportIds
            }
          >
            {t('productionQualityControlPlan.headerDetailTable.errorReport')}
          </Button>
        ) : (
          ''
        )
      },
    },
  ]

  const onChangePlanErrorRate = (value, objectValue, setFieldValue) => {
    if (value !== '') {
      const cal =
        (1 + +value / 100) *
        objectValue?.numberOfTime *
        objectValue?.formalityRate *
        objectValue?.planQuantity
      setFieldValue(
        `formPrevious[${objectValue?.keyBomTree}-${objectValue?.id}].planQcQuantity`,
        Math.ceil(cal),
      )
    } else {
      setFieldValue(
        `formPrevious[${objectValue?.keyBomTree}-${objectValue?.id}].planQcQuantity`,
        null,
      )
    }
  }

  useEffect(() => {
    setBomTree(planBomPrevious)
  }, [planBomPrevious])

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
          {t('outputQualityControlPlan.planDetailTableTitle')}
          <Typography color="error" component="span" ml="3px">
            *
          </Typography>
        </Typography>
      </Box>
      <Grid>
        <TableCollapse
          rows={bomTree}
          columns={columns}
          producingStepColumns={producingStepColumns}
          isRoot={true}
          isView={true}
          total={planBomPrevious?.length}
          striped={false}
          hideSetting
          hideFooter
        />
      </Grid>
    </>
  )
}

export default PreviousPlanDetailTable
