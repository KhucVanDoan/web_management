import { useLocation } from 'react-router-dom'

import storage from '~/utils/storage'

const useTableSetting = (tableSettingKey) => {
  const { pathname } = useLocation()
  const suffix = tableSettingKey ? `_${tableSettingKey}` : ''
  const storageKey = `TABLE_SETTING${pathname
    .replace(/\//g, '_')
    .toUpperCase()}${suffix}`
  const tableSetting = storage.sessionGet(storageKey)

  const updateTableSetting = (newSetting) => {
    storage.sessionSet(storageKey, newSetting)
  }

  return { tableSetting, updateTableSetting }
}

export default useTableSetting
