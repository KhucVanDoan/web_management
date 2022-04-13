import React, { useState, useEffect } from 'react'

import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import { Typography, Grid, InputAdornment } from '@mui/material'
import Box from '@mui/material/Box'
import { isEmpty, isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { MODAL_MODE, DATE_FORMAT } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import TableMaterialsCollapse from '~/modules/qmsx/partials/TableMaterialsCollapse'
import { ROUTE } from '~/modules/qmsx/routes/config'
import { formatDateTimeUtc } from '~/utils/date-time'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

const MaterialPlanDetailTable = (props) => {
  const { planBomMaterials, mode, setFieldValue, values } = props
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
      headerName: t(
        'productionQualityControlPlan.headerDetailTable.qcCheckMaterial',
      ),
      width: 50,
      align: 'center',
      renderCell: (params) => {
        const { isQc, materials } = params?.row
        return isQc && materials.length > 0 ? checkedIcon : icon
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
        const { producingStep, keyBomTree, isQc, materials } = params?.row
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
              name={`formMaterial[${keyBomTree}-${id}].userQc1st`}
              multiple
              disabled={!isQc || isEmpty(materials)}
              options={qualityPointUser1s || []}
              getOptionValue={(option) => option?.userId}
              getOptionLabel={(option) => option?.userName}
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
        const { producingStep, keyBomTree, isQc, materials } = params?.row
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
              name={`formMaterial[${keyBomTree}-${id}].userQc2nd`}
              multiple
              disabled={!isQc || numberOfTime === 1 || isEmpty(materials)}
              options={qualityPointUser2s || []}
              getOptionValue={(option) => option?.userId}
              getOptionLabel={(option) => option?.userName}
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
      hide: mode !== MODAL_MODE.DETAIL,
      width: 100,
      renderCell: (params) => {
        const { keyBomTree } = params?.row
        const { id } = params?.row?.producingStep
        if (mode === MODAL_MODE.DETAIL) {
          const { qualityPlanBom = [] } = params?.row?.producingStep
          return qualityPlanBom.reduce((acc, curr) => {
            return acc + curr.planQcQuantity
          }, 0)
        } else {
          return (
            <Field.TextField
              name={`formMaterial[${keyBomTree}-${id}].planQcQuantity`}
              disabled={true}
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
  ]

  const materialColumns = [
    {
      field: 'name',
      headerName: t('productionQualityControlPlan.headerMaterialTable.name'),
      width: 150,
      align: 'center',
    },
    {
      field: 'planQuantity',
      headerName: t(
        'productionQualityControlPlan.headerMaterialTable.planQuantity',
      ),
      width: 150,
      align: 'center',
      renderCell: (params) => {
        const { planningQuantity } = params?.row
        return planningQuantity
      },
    },
    {
      field: 'inputPlanDate',
      headerName: t(
        'productionQualityControlPlan.headerMaterialTable.inputPlanDate',
      ),
      width: 150,
      align: 'center',
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
      field: 'productionQcPlanDate',
      headerName: t(
        'productionQualityControlPlan.headerMaterialTable.productionQcPlanDate',
      ),
      width: 150,
      align: 'center',
      renderCell: (params) => {
        const {
          itemMaterialId,
          producingStep,
          keyBomTree,
          itemId,
          workOrders,
          bomId,
        } = params?.row
        const { id: producingStepId } = producingStep
        const { id } = producingStep?.qualityPoint
        if (mode === MODAL_MODE.DETAIL) {
          const { qualityPlanBom } = params?.row?.producingStep
          const findMaterial = qualityPlanBom.find(
            (x) => x.itemMaterialId === itemMaterialId,
          )
          if (!isEmpty(findMaterial)) {
            return (
              formatDateTimeUtc(findMaterial.planFrom, DATE_FORMAT) +
              ' - ' +
              formatDateTimeUtc(findMaterial.planTo, DATE_FORMAT)
            )
          } else return ''
        } else {
          return (
            <Field.DateRangePicker
              name={`formMaterial[${keyBomTree}-${producingStepId}].[${itemMaterialId}].productionQcPlanDate`}
              disabled={!id}
              minDate={new Date(workOrders[0]?.planFrom)}
              validate={(val) => {
                const filterNull = val?.filter((x) => x)
                if (filterNull?.length < 2) {
                  return t('general:form.required')
                }
              }}
              onChange={() => {
                setFieldValue(
                  `formMaterial[${keyBomTree}-${producingStepId}].[${itemMaterialId}].bomId`,
                  bomId,
                )
                setFieldValue(
                  `formMaterial[${keyBomTree}-${producingStepId}].[${itemMaterialId}].itemId`,
                  itemId,
                )
                setFieldValue(
                  `formMaterial[${keyBomTree}-${producingStepId}].[${itemMaterialId}].workOrderId`,
                  workOrders[0]?.id,
                )
                setFieldValue(
                  `formMaterial[${keyBomTree}-${producingStepId}].[${itemMaterialId}].qualityPointId`,
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
        'productionQualityControlPlan.headerMaterialTable.planErrorRate',
      ),
      width: 150,
      align: 'center',
      renderCell: (params) => {
        const {
          itemMaterialId,
          producingStep,
          keyBomTree,
          planningQuantity,
          routingId,
          type,
        } = params?.row
        const { id: producingStepId } = producingStep
        if (mode === MODAL_MODE.DETAIL) {
          const { qualityPlanBom } = params?.row?.producingStep
          const findMaterial = qualityPlanBom.find(
            (x) => x.itemMaterialId === itemMaterialId,
          )
          if (!isEmpty(findMaterial)) {
            return `${+findMaterial?.planErrorRate} %`
          } else return ''
        } else {
          const { id } = producingStep?.qualityPoint
          const objectValue = {
            id: producingStepId,
            keyBomTree: keyBomTree,
            itemMaterialId: itemMaterialId,
            numberOfTime: producingStep?.qualityPoint?.numberOfTime,
            formalityRate: producingStep?.qualityPoint?.formalityRate,
            planQuantity: planningQuantity,
          }
          return (
            <Field.TextField
              name={`formMaterial[${keyBomTree}-${producingStepId}].[${itemMaterialId}].planErrorRate`}
              type="number"
              disabled={!id}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ mr: 1 }}>
                    %
                  </InputAdornment>
                ),
              }}
              validate={(val) => {
                if (isNil(val) && id) return t('general:form.required')
              }}
              onChange={(value) => {
                setFieldValue(
                  `formMaterial[${keyBomTree}-${producingStepId}].[${itemMaterialId}].type`,
                  type,
                )
                setFieldValue(
                  `formMaterial[${keyBomTree}-${producingStepId}].[${itemMaterialId}].routingId`,
                  routingId,
                )
                setFieldValue(
                  `formMaterial[${keyBomTree}-${producingStepId}].[${itemMaterialId}].itemMaterialId`,
                  itemMaterialId,
                )
                setFieldValue(
                  `formMaterial[${keyBomTree}-${producingStepId}].[${itemMaterialId}].producingStepId`,
                  producingStep?.id,
                )
                setFieldValue(
                  `formMaterial[${keyBomTree}-${producingStepId}].[${itemMaterialId}].keyBomTree`,
                  keyBomTree,
                )
                setFieldValue(
                  `formMaterial[${keyBomTree}-${producingStepId}].[${itemMaterialId}].planningQuantity`,
                  planningQuantity,
                )
                return onChangePlanErrorRate(value, objectValue, setFieldValue)
              }}
            />
          )
        }
      },
    },
    {
      field: 'qcNeedQuantity',
      headerName: t(
        'productionQualityControlPlan.headerMaterialTable.qcNeedQuantity',
      ),
      width: 150,
      align: 'center',
    },
    {
      field: 'planQcQuantity',
      headerName: t(
        'productionQualityControlPlan.headerMaterialTable.qcPlanQuantity',
      ),
      width: 150,
      align: 'center',
      renderCell: (params) => {
        const { itemMaterialId, producingStep, keyBomTree, planningQuantity } =
          params?.row
        const { id: producingStepId, qualityPoint } = producingStep
        if (mode === MODAL_MODE.DETAIL) {
          const { qualityPlanBom } = params?.row?.producingStep
          const findMaterial = qualityPlanBom.find(
            (x) => x.itemMaterialId === itemMaterialId,
          )
          if (!isEmpty(findMaterial)) {
            return +findMaterial?.planQcQuantity
          } else return ''
        } else {
          const planErrorRate =
            values?.formMaterial?.[`${keyBomTree}-${producingStepId}`]?.[
              `${itemMaterialId}`
            ]?.planErrorRate
          const defaultValue =
            (1 + +planErrorRate / 100) *
            qualityPoint?.numberOfTime *
            qualityPoint?.formalityRate *
            planningQuantity
          const { id } = producingStep?.qualityPoint
          return (
            <Field.TextField
              name={`formMaterial[${keyBomTree}-${producingStepId}].[${itemMaterialId}].planQcQuantity`}
              type="number"
              disabled={!id}
              validate={(val) => {
                if (isNil(val) && id) return t('general:form.required')
                else {
                  if (val > Math.ceil(+defaultValue))
                    return t('form.compareTwoField', {
                      limit: Math.ceil(+defaultValue),
                    })
                }
              }}
            />
          )
        }
      },
    },
    {
      field: 'qcDoneQuantity',
      headerName: t(
        'productionQualityControlPlan.headerMaterialTable.qcDoneQuantity',
      ),
      width: 150,
      align: 'center',
    },
    {
      field: 'qcPassQuantity',
      headerName: t(
        'productionQualityControlPlan.headerMaterialTable.qcPassQuantity',
      ),
      width: 150,
      align: 'center',
    },
    {
      field: 'errorReport',
      headerName: t(
        'productionQualityControlPlan.headerDetailTable.errorReport',
      ),
      width: 150,
      align: 'center',
      renderCell: (params) => {
        const { errorReportIds } = params?.row
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
        `formMaterial[${objectValue?.keyBomTree}-${objectValue?.id}].[${objectValue?.itemMaterialId}].planQcQuantity`,
        Math.ceil(cal),
      )
    } else {
      setFieldValue(
        `formMaterial[${objectValue?.keyBomTree}-${objectValue?.id}].[${objectValue?.itemMaterialId}].planQcQuantity`,
        undefined,
      )
    }
  }

  useEffect(() => {
    setBomTree(planBomMaterials)
  }, [planBomMaterials])

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
        <TableMaterialsCollapse
          rows={bomTree}
          columns={columns}
          producingStepColumns={producingStepColumns}
          materialColumns={materialColumns}
          isRoot={true}
          isView={true}
          total={planBomMaterials?.length}
          striped={false}
          hideSetting
          hideFooter
        />
      </Grid>
    </>
  )
}

export default MaterialPlanDetailTable
