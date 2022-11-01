import { startOfDay, endOfDay } from 'date-fns'
import { isEqual, isNil } from 'lodash'

export const convertFilterParams = (filters = {}, columns = []) => {
  const filterData = Object.keys(filters).reduce((acc, cur) => {
    if (
      isNil(filters[cur]) ||
      filters[cur] === '' ||
      isEqual(filters[cur], []) ||
      isEqual(filters[cur], {})
    ) {
      return acc
    }

    if (
      columns.find((col) => col.field === cur && col.filterFormat === 'date')
    ) {
      let day1 = filters[cur]?.[0]
      let day2 = filters[cur]?.[1]

      if (!day1 && !day2) {
        return acc
      }

      day1 = day1 || day2
      day2 = day2 || day1

      const startOfDay1 = startOfDay(day1)
      const endOfDay2 = endOfDay(day2)
      return [
        ...acc,
        {
          column: cur,
          text: `${startOfDay1.toISOString()}|${endOfDay2.toISOString()}`,
        },
      ]
    }
    if (
      columns.find(
        (col) => col.field === cur && col.filterFormat === 'multiple',
      )
    ) {
      return [
        ...acc,
        {
          column: cur,
          text: (filters[cur] || []).toString(),
        },
      ]
    }

    return [
      ...acc,
      {
        column: cur,
        text: filters[cur].toString(),
      },
    ]
  }, [])

  return JSON.stringify(filterData)
}

export const convertSortParams = (sort) => {
  const sortData =
    sort && sort?.orderBy && sort?.order
      ? [
          {
            column: sort?.orderBy,
            order: sort?.order?.toUpperCase(),
          },
        ]
      : []

  return JSON.stringify(sortData)
}

export const getColumnsInBottomTree = (cols = []) => {
  const childCols = cols?.reduce((acc, cur) => {
    if (Array.isArray(cur?.columns) && cur?.columns?.some((c) => !c?.hide)) {
      return [...acc, ...cur?.columns?.filter((c) => !c.hide)]
    }
    return [...acc, cur]
  }, [])

  if (childCols?.some((x) => x?.columns)) {
    return getColumnsInBottomTree(childCols)
  }

  return childCols
}
