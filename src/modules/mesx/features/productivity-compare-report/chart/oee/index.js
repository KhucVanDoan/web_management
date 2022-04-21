import { useEffect, useState } from 'react'

import { Column } from '@ant-design/plots'

import useProductivityCompare from '~/modules/mesx/redux/hooks/useProductivityCompare'

function OeeCompare() {
  const [data, setData] = useState([])
  const {
    data: { data: list },
  } = useProductivityCompare()

  useEffect(() => {
    const listData = []
    list.forEach((element) => {
      const name = element?.workCenterName
      const list = element?.productivityAssessmentReportSchedules?.map((i) => ({
        name: name,
        time: i?.executionDay,
        value: Math.round(Number(i?.oeeRatio) * 100) / 100,
      }))
      listData.push(...list)
    })
    setData(listData)
  }, [list])

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

export default OeeCompare
