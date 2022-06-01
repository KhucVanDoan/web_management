import { Column } from '@ant-design/plots'

const BarChartReport = ({ data, xField, yField, seriesField, color }) => {
  var config = {
    data: data,
    isGroup: true,
    xField: xField,
    yField: yField,
    seriesField: seriesField,
    label: {
      position: 'middle',
      layout: [],
    },
    color: color,
    legend: {
      layout: 'horizontal',
      position: 'bottom',
    },
  }
  return <Column {...config} />
}

export default BarChartReport
