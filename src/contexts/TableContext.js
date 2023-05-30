import React, {
  useEffect,
  createContext,
  useCallback,
  useState,
  useRef,
  useMemo,
} from 'react'

import { isEqual } from 'lodash'
import PropTypes from 'prop-types'
import { useRouteMatch } from 'react-router-dom'

import { ROWS_PER_PAGE_OPTIONS } from '~/common/constants'
import useUserInfo from '~/modules/configuration/redux/hooks/useUserInfo'
import storage from '~/utils/storage'

export const DEFAULT_MIN_COLUMN_WIDTH = 80
export const DEFAULT_MAX_COLUMN_WIDTH = 1000
export const DEFAULT_TR_HEIGHT = 41
export const RESIZE_LINE_WIDTH = 3

export const TableContext = createContext({})

export const TableProvider = ({ children, ...props }) => {
  const {
    tableSettingKey,
    hideSetting,
    columns,
    enableResizable,
    onSelectionChange,
    onRowsOrderChange,
    onSettingChange,
  } = props
  const route = useRouteMatch()
  const { data } = useUserInfo()

  const ver = '4.0'
  const userId = data?.userInfo?.id
  const prefix = '___'
  const suffix = tableSettingKey || ''
  const separator = '>'
  const storageKey =
    prefix +
    window.btoa(
      `${userId}${separator}${ver}${separator}${route.path.replace(
        /\/|:|-|_/g,
        '',
      )}${suffix}`,
    )

  const [setting, setSetting] = useState([])
  const containerRef = useRef(null)

  const isVisible = useCallback((col = {}, needToCheckRawData) => {
    if (needToCheckRawData && columns.find((c) => c?.field === col.field)?.hide)
      return false

    if (col.hide) return false

    return (
      col.visible === undefined ||
      col.visible === true ||
      col.visible === 'always'
    )
  }, [])

  const sortColumns = useCallback((cols = []) => {
    return cols.reduce((acc, cur) => {
      if (cur?.sticky === 'left') {
        const lastStickyLeftIndex = acc.findLastIndex(
          (item) => item?.sticky === 'left',
        )
        if (lastStickyLeftIndex === -1) return [cur, ...acc]
        return [
          ...acc.slice(0, lastStickyLeftIndex + 1),
          cur,
          ...acc.slice(lastStickyLeftIndex + 1),
        ]
      }

      if (cur?.sticky === 'right') {
        return [...acc, cur]
      }

      const firstStickyRightIndex = acc.findIndex(
        (item) => item?.sticky === 'right',
      )

      if (firstStickyRightIndex === -1) return [...acc, cur]
      return [
        ...acc.slice(0, firstStickyRightIndex),
        cur,
        ...acc.slice(firstStickyRightIndex),
      ]
    }, [])
  }, [])

  const visibleColumnKeys = useMemo(() => {
    const keys = setting?.reduce((acc, cur) => {
      if (isVisible(cur, true)) return [...acc, cur.field]
      return acc
    }, [])

    return keys
  }, [setting, isVisible])

  const visibleColumns = useMemo(() => {
    let cols = []

    if (hideSetting) {
      cols = columns.filter((col) => isVisible(col))
    } else {
      cols = columns.reduce((acc, cur) => {
        if (isVisible(cur) && visibleColumnKeys.includes(cur.field)) {
          const colSetting = setting?.find((s) => s?.field === cur?.field)

          return [
            ...acc,
            {
              ...cur,
              sticky: colSetting?.sticky,
              width: colSetting?.width,
              minWidth: colSetting?.minWidth,
              aliasName: colSetting?.aliasName,
            },
          ]
        }

        return acc
      }, [])
    }

    return sortColumns(cols)
  }, [hideSetting, columns, visibleColumnKeys, setting, isVisible])

  const isTableResizable = useMemo(
    () =>
      enableResizable &&
      visibleColumns?.some((col) => col?.resizable !== false),
    [enableResizable, visibleColumns],
  )

  const checkboxSelection = typeof onSelectionChange === 'function'
  const reorderable = typeof onRowsOrderChange === 'function'

  const cleanUp = useCallback(
    (reason) => {
      if (!userId) return

      Object.keys(localStorage).forEach((k) => {
        if (k.substring(0, prefix.length) === prefix) {
          let d = ''
          try {
            d = window.atob(k?.substring(prefix.length))
          } catch (error) {
            localStorage.removeItem(k)
          }

          const arr = d.split(separator)

          if (
            (arr?.[0] === 'undefined' ||
              (reason === 'deprecated' && arr?.[0] === `${userId}`) ||
              (reason === 'error' && arr?.[0] !== userId)) &&
            arr?.[1] !== ver
          ) {
            localStorage.removeItem(k)
          }
        }
      })
    },
    [userId, prefix, separator, ver],
  )

  const updateSetting = useCallback(
    (st) => {
      try {
        storage.setLocalItem(storageKey, st)
      } catch (error) {
        cleanUp('error')
      }

      setSetting(st)
    },
    [storageKey, cleanUp],
  )

  const initSetting = useCallback(
    (forceNew) => {
      if (hideSetting && !isTableResizable) return
      if (!userId) return
      if (!columns?.length) return
      if (
        !forceNew &&
        isEqual(
          setting.map((s) => s?.field),
          columns.map((c) => c?.field),
        )
      )
        return

      const storageSetting = storage.getLocalItem(storageKey)

      if (storageSetting && !Array.isArray(storageSetting)) {
        localStorage.clear()
        return
      }

      const st = columns.map((c) => {
        const matched = storageSetting?.find((item) => item?.field === c.field)

        return {
          field: c.field,
          width: c.width || c.minWidth || DEFAULT_MIN_COLUMN_WIDTH,
          minWidth: c.minWidth || DEFAULT_MIN_COLUMN_WIDTH,
          visible: c.visible,
          sticky: c.sticky,
          resizable: c.resizable,
          ...(forceNew ? {} : matched || {}),
        }
      })

      updateSetting(st)
    },
    [columns, userId, setting, hideSetting, isTableResizable],
  )

  useEffect(() => {
    cleanUp('deprecated')
  }, [cleanUp])

  useEffect(() => {
    initSetting()
  }, [initSetting])

  useEffect(() => {
    onSettingChange(visibleColumnKeys)
  }, [visibleColumnKeys])

  const value = {
    ...props,
    visibleColumns,
    containerRef,
    initSetting,
    updateSetting,
    setting,
    visibleColumnKeys,
    isTableResizable,
    checkboxSelection,
    reorderable,
    isVisible,
  }

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>
}

TableProvider.defaultProps = {
  uniqKey: 'id',
  hideSetting: false,
  page: 1,
  pageSize: ROWS_PER_PAGE_OPTIONS[0],
  sort: {},
  selected: [],
  onSortChange: () => {},
  onPageChange: () => {},
  onPageSizeChange: () => {},
  onSettingChange: () => {},
  enableResizable: true,
  columns: [],
  rows: [],

  // DataTableCollapse
  isRoot: true,
  subDataKey: 'details',
  expandable: false,
}

TableProvider.propsTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape()),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
        .isRequired,
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      sortable: PropTypes.bool,
      hide: PropTypes.bool,
      align: PropTypes.oneOf(['left', 'center', 'right']),
      headerAlign: PropTypes.oneOf(['left', 'center', 'right']),
      renderCell: PropTypes.func,
      sticky: PropTypes.oneOf(['left', 'right']),
      visible: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(['always', 'never']),
      ]),
    }),
  ),
  uniqKey: PropTypes.string,
  height: PropTypes.number,
  onSelectionChange: PropTypes.func,
  onRowsOrderChange: PropTypes.func,
  selected: PropTypes.array,
  enableResizable: PropTypes.bool,

  // TopBar
  title: PropTypes.string,
  tableSettingKey: PropTypes.string,
  onSettingChange: PropTypes.func,
  hideSetting: PropTypes.bool,
  filters: PropTypes.shape({
    form: PropTypes.node,
    values: PropTypes.shape(),
    onApply: PropTypes.func,
    defaultValue: PropTypes.shape(),
    validationSchema: PropTypes.shape(),
  }),
  beforeTopbar: PropTypes.node,
  afterTopbar: PropTypes.node,
  bulkActions: PropTypes.shape(),

  // TableHead
  sort: PropTypes.shape({
    order: PropTypes.oneOf(['asc', 'desc']),
    orderBy: PropTypes.string,
  }),
  onSortChange: PropTypes.func,

  // Pagination
  total: PropTypes.number,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  hideFooter: PropTypes.bool,

  // DataTableCollapse
  subColumns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
        .isRequired,
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      sortable: PropTypes.bool,
      hide: PropTypes.bool,
      align: PropTypes.oneOf(['left', 'center', 'right']),
      headerAlign: PropTypes.oneOf(['left', 'center', 'right']),
      renderCell: PropTypes.func,
      fixed: PropTypes.bool,
    }),
  ),
  subDataKey: PropTypes.string,
  isRoot: PropTypes.bool,
  expandable: PropTypes.bool,
}

export default TableContext
