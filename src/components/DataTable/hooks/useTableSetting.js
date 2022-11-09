import { useLocation } from 'react-router-dom'

import storage from '~/utils/storage'
const DEFAULT_MIN_COLUMN_WIDTH = 80

const useTableSetting = (tableSettingKey) => {
  const { pathname } = useLocation()
  const suffix = tableSettingKey ? `_${tableSettingKey}` : ''
  const storageKey = `TABLE_SETTING_V2${pathname
    .replace(/\//g, '_')
    .toUpperCase()}${suffix}`

  const getTableSetting = () => storage.getSessionItem(storageKey)
  const updateTableSetting = (newSetting = []) => {
    storage.setSessionItem(storageKey, newSetting)
  }

  const initTableSetting = (rawColumns) => {
    let setting = getTableSetting() || []

    if (!setting.length) {
      setting = rawColumns.reduce((acc, cur) => {
        if (!cur.hide)
          return [
            ...acc,
            {
              field: cur.field,
              width: cur.width || cur.minWidth || DEFAULT_MIN_COLUMN_WIDTH,
              visible: true,
              resizable: cur.resizable,
            },
          ]
        return acc
      }, [])

      updateTableSetting(setting)
    }

    return setting
  }

  return { getTableSetting, updateTableSetting, initTableSetting }
}

export default useTableSetting
