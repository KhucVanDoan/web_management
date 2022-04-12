import React, { useMemo } from 'react'

import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import { Typography, InputAdornment } from '@mui/material'
import Box from '@mui/material/Box'
import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import { INPUT_QC_PLAN_STATUS_OPTIONS } from '~/modules/qmsx/constants'
import { ROUTE } from '~/modules/qmsx/routes/config'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

const PlanDetailTable = (props) => {
  const { values } = useFormikContext()
  const { qualityPlanIOqcs, mode, setFieldValue } = props
  const { t } = useTranslation(['qmsx'])
  const canUpdateQuantity =
    mode === MODAL_MODE.UPDATE &&
    (values?.status === INPUT_QC_PLAN_STATUS_OPTIONS.CONFIRMED ||
      values?.status === INPUT_QC_PLAN_STATUS_OPTIONS.INPROGRESS)

  const getColumns = useMemo(
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
        field: 'itemName',
        headerName: t('inputQualityControlPlan.headerDetailTable.productName'),
        width: 150,
        align: 'center',
        renderCell: (params) => {
          const { item } = params?.row
          return item?.name
        },
      },
      {
        field: 'itemUnit',
        headerName: t('inputQualityControlPlan.headerDetailTable.itemUnit'),
        width: 100,
        align: 'center',
        renderCell: (params) => {
          const { item } = params?.row
          return item?.unit
        },
      },
      {
        field: 'warehouseName',
        headerName: t(
          'inputQualityControlPlan.headerDetailTable.warehouseName',
        ),
        width: 150,
        align: 'center',
        renderCell: (params) => {
          const { warehouse } = params?.row
          return warehouse?.name
        },
      },
      {
        field: 'qcCheck',
        headerName: t('inputQualityControlPlan.headerDetailTable.qcCheck'),
        width: 50,
        align: 'center',
        renderCell: (params) => {
          const { qcCheck } = params?.row
          return qcCheck ? checkedIcon : icon
        },
      },
      {
        field: 'qualityControlPoint',
        headerName: t(
          'inputQualityControlPlan.headerDetailTable.qualityControlPoint',
        ),
        width: 100,
        align: 'center',
        renderCell: (params) => {
          const { qualityPoint } = params?.row
          return qualityPoint?.name
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
          const { qualityPoint } = params?.row
          return qualityPoint?.numberOfTime
        },
      },
      {
        field: 'userQc1st',
        headerName: t('inputQualityControlPlan.headerDetailTable.userQc1st'),
        width: 250,
        align: 'center',
        renderCell: (params, index) => {
          const { qualityPoint } = params?.row
          return (
            <Field.Autocomplete
              name={`qualityPlanIOqcs[${index}].userQc1st`}
              required
              multiple
              disabled={canUpdateQuantity}
              options={qualityPoint?.user1s || []}
              getOptionValue={(option) => option?.userId}
              getOptionLabel={(option) => option?.userName}
            />
          )
        },
      },
      {
        field: 'userQc2nd',
        headerName: t('inputQualityControlPlan.headerDetailTable.userQc2nd'),
        width: 250,
        align: 'center',
        renderCell: (params, index) => {
          const { qualityPoint } = params?.row
          return (
            <Field.Autocomplete
              name={`qualityPlanIOqcs[${index}].userQc2nd`}
              multiple
              disabled={canUpdateQuantity || qualityPoint?.numberOfTime === 1}
              options={qualityPoint?.user2s || []}
              getOptionValue={(option) => option?.userId}
              getOptionLabel={(option) => option?.userName}
            />
          )
        },
      },
      {
        field: 'qcPlanDate',
        headerName: t('inputQualityControlPlan.headerDetailTable.qcPlanDate'),
        width: 350,
        align: 'center',
        renderCell: (_, index) => {
          return (
            <Field.DateRangePicker
              disabled={canUpdateQuantity}
              name={`qualityPlanIOqcs[${index}].qcPlanDate`}
            />
          )
        },
      },
      {
        field: 'planErrorRate',
        headerName: t(
          'inputQualityControlPlan.headerDetailTable.planErrorRate',
        ),
        width: 180,
        align: 'center',
        renderCell: (params, index) => {
          const objectValue = {
            numberOfTime: params?.row?.qualityPoint?.numberOfTime,
            formalityRate: params?.row?.qualityPoint?.formalityRate,
            planQuantity: params?.row?.planQuantity,
          }
          return (
            <Field.TextField
              name={`qualityPlanIOqcs[${index}].planErrorRate`}
              type="number"
              disabled={canUpdateQuantity}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ mr: 1 }}>
                    %
                  </InputAdornment>
                ),
              }}
              onChange={(value) =>
                onChangeErrorPlan(value, index, objectValue, setFieldValue)
              }
            />
          )
        },
      },
      {
        field: 'inputPlanQuantity',
        headerName: t(
          'inputQualityControlPlan.headerDetailTable.inputPlanQuantity',
        ),
        width: 150,
        align: 'center',
        renderCell: (params) => {
          const { planQuantity } = params?.row
          return +planQuantity
        },
      },
      {
        field: 'actualInputQuantity',
        headerName: t(
          'inputQualityControlPlan.headerDetailTable.actualInputQuantity',
        ),
        width: 150,
        align: 'center',
        renderCell: (params) => {
          const { actualQuantity } = params?.row
          return +actualQuantity
        },
      },
      {
        field: 'needQcQuantity',
        headerName: t(
          'inputQualityControlPlan.headerDetailTable.needQcQuantity',
        ),
        width: 100,
        align: 'center',
        renderCell: (params) => {
          const { needQCQuantity } = params?.row
          return needQCQuantity
        },
      },
      {
        field: 'qcPlanQuantity',
        headerName: t(
          'inputQualityControlPlan.headerDetailTable.qcPlanQuantity',
        ),
        width: 200,
        align: 'center',
        renderCell: (_, index) => {
          return (
            <Field.TextField
              name={`qualityPlanIOqcs[${index}].qcPlanQuantity`}
              disabled={canUpdateQuantity}
              type="number"
            />
          )
        },
      },
      {
        field: 'qcDoneQuantity',
        headerName: t(
          'inputQualityControlPlan.headerDetailTable.qcDoneQuantity',
        ),
        width: 100,
        align: 'center',
        renderCell: (params, index) => {
          const { qualityPlanIOqcDetails } = params?.row
          if (canUpdateQuantity) {
            return (
              <Field.TextField
                name={`qualityPlanIOqcs[${index}].qcDoneQuantity`}
                type="number"
              />
            )
          } else {
            return qualityPlanIOqcDetails
              ? qualityPlanIOqcDetails[0]?.qcDoneQuantity
              : 0
          }
        },
      },
      {
        field: 'qcPassQuantity',
        headerName: t(
          'inputQualityControlPlan.headerDetailTable.qcPassQuantity',
        ),
        width: 100,
        align: 'center',
        renderCell: (params, index) => {
          const { qualityPlanIOqcDetails } = params?.row
          if (canUpdateQuantity) {
            return (
              <Field.TextField
                name={`qualityPlanIOqcs[${index}].qcPassQuantity`}
                type="number"
              />
            )
          } else {
            return qualityPlanIOqcDetails
              ? qualityPlanIOqcDetails[0]?.qcPassQuantity
              : 0
          }
        },
      },
      {
        field: 'errorReport',
        headerName: t('inputQualityControlPlan.headerDetailTable.errorReport'),
        width: 100,
        align: 'center',
        renderCell: (params) => {
          const { errorReportId } = params?.row
          return errorReportId?.length > 0 ? (
            <Button
              variant="text"
              size="small"
              bold={false}
              component={Link}
              to={
                ROUTE.DEFINE_ERROR_REPORT.LIST.PATH +
                '?errorReportId=' +
                errorReportId
              }
            >
              {t('inputQualityControlPlan.headerDetailTable.errorReport')}
            </Button>
          ) : (
            ''
          )
        },
      },
    ],
    [qualityPlanIOqcs],
  )

  const onChangeErrorPlan = (value, index, objectValue, setFieldValue) => {
    if (value !== '') {
      const cal =
        (objectValue?.numberOfTime + +value / 100) *
        objectValue?.formalityRate *
        objectValue?.planQuantity
      setFieldValue(`qualityPlanIOqcs[${index}].qcPlanQuantity`, Math.ceil(cal))
    } else {
      setFieldValue(`qualityPlanIOqcs[${index}].qcPlanQuantity`, undefined)
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
          {t('inputQualityControlPlan.planDetailTableTitle')}
          <Typography color="error" component="span" ml="3px">
            *
          </Typography>
        </Typography>
      </Box>
      <DataTable
        rows={qualityPlanIOqcs}
        columns={getColumns}
        total={qualityPlanIOqcs?.length}
        striped={false}
        hideSetting
        hideFooter
      />
    </>
  )
}

export default PlanDetailTable
