import { flatMap, uniqBy } from 'lodash'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import useProductivityCompare from '~/modules/mesx/redux/hooks/useProductivityCompare'

function OEECompareTable() {
  const { t } = useTranslation(['mesx'])
  const {
    data: { listProductivityCompare },
  } = useProductivityCompare()
  const getColumns = () => {
    const columns = [
      {
        field: 'workCenter',
        headerName: t('productivityCompareReport.workCenterName'),
      },
    ]
    if (listProductivityCompare.length > 0) {
      const colMap = flatMap(
        uniqBy(
          flatMap(
            listProductivityCompare,
            'productivityAssessmentReportSchedules',
          ),
          'executionDay',
        ),
        'executionDay',
      )
      const columnData = colMap.map((i) => ({
        field: i,
        headerName: i,
      }))
      columns.push(...columnData)
    }

    return columns
  }

  const getRows = () => {
    if (listProductivityCompare.length > 0) {
      const rowsData = listProductivityCompare.map((i) => {
        const rowObj = {
          workCenter: i?.workCenterName,
        }
        i?.productivityAssessmentReportSchedules?.forEach((element) => {
          rowObj[element?.executionDay] =
            Math.round(Number(element?.oeeRatio) * 100) / 100
        })
        return rowObj
      })
      return rowsData
    } else {
      return []
    }
  }
  return (
    <>
      <DataTable
        rows={getRows()}
        columns={getColumns()}
        hideSetting
        hideFooter
      />
    </>
  )
}

export default OEECompareTable
