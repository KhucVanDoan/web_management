import { startOfDay, endOfDay } from 'date-fns'
import { isEmpty, isNil, isDate } from 'lodash'

/**
 * Check table rendering page
 */
export const checkPage = (total, pageSize, page, onChangePageOrPageSize) => {
  if (Math.ceil(total / pageSize) < page && page > 1) {
    onChangePageOrPageSize(1, pageSize)
  }
}

export const convertFilterParams = (filters = {}, columns = []) => {
  const filterData = Object.keys(filters).reduce((acc, cur) => {
    if (
      isNil(filters[cur]) ||
      (isEmpty(filters[cur]) && !isDate(filters[cur]))
    ) {
      return acc
    }

    if (
      columns.find(
        (col) =>
          col.field === cur &&
          (col.filterFormat === 'date' || col.type === 'date'), // type is deprecated
      )
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
        text: filters[cur],
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
