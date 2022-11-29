import React from 'react'

import { Grid } from '@mui/material'
import { isEmpty } from 'lodash'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import { Field } from '~/components/Formik'
import { ACTIVE_STATUS, DATA_TYPE } from '~/modules/wmsx/constants'
import { searchConstructionItemsApi } from '~/modules/wmsx/redux/sagas/construction-items-management/search-construction-items'
import { searchConstructionsApi } from '~/modules/wmsx/redux/sagas/construction-management/search-constructions'
import { searchExpenditureOrgApi } from '~/modules/wmsx/redux/sagas/define-expenditure-org/search-expenditure-org'
import { searchExpenditureTypeApi } from '~/modules/wmsx/redux/sagas/define-expenditure-type/search-expenditure-type'
import { searchVendorsApi } from '~/modules/wmsx/redux/sagas/define-vendor/search-vendors'
import { searchReceiptDepartmentApi } from '~/modules/wmsx/redux/sagas/receipt-department-management/search-receipt-department'
import { convertFilterParams } from '~/utils'

const DisplayFollowBusinessTypeManagement = (
  type,
  t,
  values,
  setFieldValue,
) => {
  const constructions = type?.find(
    (item) => item?.tableName === 'constructions',
  )?.id
  const categoryConstructions = type?.find(
    (item) => item?.tableName === 'category_constructions',
  )?.id
  const display = []
  type?.forEach((item) => {
    switch (item?.type) {
      case DATA_TYPE.TEXT:
        return display.push(
          <Grid item lg={6} xs={12}>
            <Field.TextField
              name={`${item.id}`}
              label={item?.fieldName}
              required={Boolean(item?.required)}
              validate={(val) => {
                if (item?.required) {
                  if (!val) return t('general:form.required')
                }
              }}
            />
          </Grid>,
        )
      case DATA_TYPE.NUMBER:
        return display.push(
          <Grid item lg={6} xs={12}>
            <Field.TextField
              name={`${item.id}`}
              label={item?.fieldName}
              type="number"
              required={Boolean(item?.required)}
              validate={(val) => {
                if (item?.required) {
                  if (!val) return t('general:form.required')
                }
              }}
            />
          </Grid>,
        )
      case DATA_TYPE.DATE:
        return display.push(
          <Grid item lg={6} xs={12}>
            <Field.DatePicker
              name={`${item.id}`}
              label={item?.fieldName}
              required={Boolean(item?.required)}
              validate={(val) => {
                if (item?.required) {
                  if (!val) return t('general:form.required')
                }
              }}
            />
          </Grid>,
        )
      case DATA_TYPE.LIST:
        switch (item?.tableName) {
          case 'constructions':
            return display.push(
              <Grid item lg={6} xs={12}>
                <Field.Autocomplete
                  name={`${item.id}`}
                  label={t('warehouseImportReceipt.project')}
                  placeholder={t('warehouseImportReceipt.project')}
                  asyncRequest={(s) =>
                    searchConstructionsApi({
                      keyword: s,
                      limit: ASYNC_SEARCH_LIMIT,
                      filter: convertFilterParams({
                        status: ACTIVE_STATUS.ACTIVE,
                      }),
                    })
                  }
                  asyncRequestHelper={(res) => res?.data?.items}
                  asyncRequestDeps={values?.businessTypeId}
                  getOptionLabel={(opt) => opt?.code}
                  getOptionSubLabel={(opt) => opt?.name}
                  isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                  onChange={() => setFieldValue(`${categoryConstructions}`, '')}
                  validate={(val) => {
                    if (item?.required) {
                      if (isEmpty(val)) {
                        return t('general:form.required')
                      }
                    }
                  }}
                  required={Boolean(item?.required)}
                />
              </Grid>,
            )
          case 'category_constructions':
            return display.push(
              <Grid item lg={6} xs={12}>
                <Field.Autocomplete
                  name={`${item.id}`}
                  label={t('warehouseImportReceipt.task')}
                  placeholder={t('warehouseImportReceipt.task')}
                  asyncRequest={(s) =>
                    searchConstructionItemsApi({
                      keyword: s,
                      limit: ASYNC_SEARCH_LIMIT,
                      filter: convertFilterParams({
                        status: ACTIVE_STATUS.ACTIVE,
                        constructionId: values[constructions]?.id,
                      }),
                    })
                  }
                  asyncRequestHelper={(res) => res?.data?.items}
                  asyncRequestDeps={values[constructions]}
                  disabled={!values[constructions]}
                  getOptionLabel={(opt) => opt?.code}
                  getOptionSubLabel={(opt) => opt?.name}
                  required={Boolean(item?.required)}
                  isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                  validate={(val) => {
                    if (item?.required) {
                      if (isEmpty(val)) {
                        return t('general:form.required')
                      }
                    }
                  }}
                />
              </Grid>,
            )
          case 'department_receipts':
            return display.push(
              <Grid item lg={6} xs={12}>
                <Field.Autocomplete
                  name={`${item.id}`}
                  label={item?.fieldName}
                  asyncRequest={(s) => {
                    return searchReceiptDepartmentApi({
                      keyword: s,
                      limit: ASYNC_SEARCH_LIMIT,
                      filter: convertFilterParams({
                        status: ACTIVE_STATUS.ACTIVE,
                      }),
                    })
                  }}
                  asyncRequestHelper={(res) => res?.data?.items}
                  asyncRequestDeps={values?.businessTypeId}
                  getOptionLabel={(opt) => opt?.code}
                  getOptionSubLabel={(opt) => opt?.name}
                  isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                  validate={(val) => {
                    if (item?.required) {
                      if (isEmpty(val)) {
                        return t('general:form.required')
                      }
                    }
                  }}
                  required={Boolean(item?.required)}
                />
              </Grid>,
            )
          case 'vendors':
            return display.push(
              <Grid item lg={6} xs={12}>
                <Field.Autocomplete
                  name={`${item.id}`}
                  label={item?.fieldName}
                  asyncRequest={(s) => {
                    return searchVendorsApi({
                      keyword: s,
                      limit: ASYNC_SEARCH_LIMIT,
                      filter: convertFilterParams({
                        status: ACTIVE_STATUS.ACTIVE,
                      }),
                    })
                  }}
                  asyncRequestHelper={(res) => res?.data?.items}
                  asyncRequestDeps={values?.businessTypeId}
                  getOptionLabel={(opt) => opt?.code}
                  getOptionSubLabel={(opt) => opt?.name}
                  isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                  required={Boolean(item?.required)}
                  validate={(val) => {
                    if (item?.required) {
                      if (isEmpty(val)) {
                        return t('general:form.required')
                      }
                    }
                  }}
                />
              </Grid>,
            )
          case 'cost_types':
            return display.push(
              <Grid item lg={6} xs={12}>
                <Field.Autocomplete
                  name={`${item.id}`}
                  label={item?.fieldName}
                  asyncRequest={(s) => {
                    return searchExpenditureTypeApi({
                      keyword: s,
                      limit: ASYNC_SEARCH_LIMIT,
                      filter: convertFilterParams({
                        status: 1,
                      }),
                    })
                  }}
                  asyncRequestHelper={(res) => res?.data?.items}
                  asyncRequestDeps={values?.businessTypeId}
                  getOptionLabel={(opt) => opt?.code}
                  getOptionSubLabel={(opt) => opt?.name}
                  isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                  validate={(val) => {
                    if (item?.required) {
                      if (isEmpty(val)) {
                        return t('general:form.required')
                      }
                    }
                  }}
                  required={Boolean(item?.required)}
                />
              </Grid>,
            )
          case 'organization_payments':
            return display.push(
              <Grid item lg={6} xs={12}>
                <Field.Autocomplete
                  name={`${item.id}`}
                  label={item?.fieldName}
                  asyncRequest={(s) => {
                    return searchExpenditureOrgApi({
                      keyword: s,
                      limit: ASYNC_SEARCH_LIMIT,
                      filter: convertFilterParams({
                        status: 1,
                      }),
                    })
                  }}
                  asyncRequestHelper={(res) => res?.data?.items}
                  asyncRequestDeps={values?.businessTypeId}
                  getOptionLabel={(opt) => opt?.code}
                  getOptionSubLabel={(opt) => opt?.name}
                  isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                  validate={(val) => {
                    if (item?.required) {
                      if (isEmpty(val)) {
                        return t('general:form.required')
                      }
                    }
                  }}
                  required={Boolean(item?.required)}
                />
              </Grid>,
            )
          default:
            break
        }
        break
      default:
        break
    }
  })

  return display
}
export default DisplayFollowBusinessTypeManagement
