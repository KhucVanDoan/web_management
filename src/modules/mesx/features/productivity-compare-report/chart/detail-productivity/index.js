import { useEffect, useState } from 'react'

import { Column } from '@ant-design/plots'

import useProductivityCompare from '~/modules/mesx/redux/hooks/useProductivityCompare'

function ProductivityCompareChart(props) {
  const { isSubmit } = props
  const [data, setData] = useState([])
  const {
    data: { listProductivityCompare },
  } = useProductivityCompare()
  useEffect(() => {
    const listData = []
    listProductivityCompare.forEach((element) => {
      const name = element?.workCenterName
      const list = element?.productivityAssessmentReportSchedules?.map((i) => ({
        name: name,
        time: i?.executionDay,
        value: Math.round(Number(i?.productivityRatio) * 100) / 100,
      }))
      listData.push(...list)
    })
    setData(listData)
  }, [isSubmit === true])

  const config = {
    data,
    isGroup: true,
    xField: 'time',
    yField: 'value',
    seriesField: 'name',
    label: {
      position: 'middle',
      layout: [
        {
          type: 'interval-adjust-position',
        },
        {
          type: 'interval-hide-overlap',
        },
        {
          type: 'adjust-color',
        },
      ],
    },
  }
  return (
    <>
      <Column {...config} />
    </>
  )
}

export default ProductivityCompareChart
