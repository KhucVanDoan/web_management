import { isEmpty, isNull, isUndefined, isNumber, isBoolean } from 'lodash'

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
      isNull(filters[cur]) ||
      isUndefined(filters[cur]) ||
      (isEmpty(filters[cur]) &&
        !isNumber(filters[cur]) &&
        !isBoolean(filters[cur]))
    ) {
      return acc
    }

    if (columns.find((col) => col.field === cur && col.type === 'date')) {
      const dates = filters[cur]
      dates[0] = new Date(dates[0].setHours(0, 0, 0, 0))
      dates[1] = new Date(dates[1].setHours(23, 59, 59, 999))
      return [
        ...acc,
        {
          column: cur,
          text: `${dates[0].toISOString()}|${dates[1].toISOString()}`,
        },
      ]
    }
    if (
      columns.find((col) => col.field === cur && col.type === 'categorical')
    ) {
      return [
        ...acc,
        {
          column: cur,
          text: filters[cur]?.value || '',
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
