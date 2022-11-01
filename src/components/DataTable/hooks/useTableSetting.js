import { useLocation } from 'react-router-dom'

import storage from '~/utils/storage'

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

  return { getTableSetting, updateTableSetting }
}

export default useTableSetting
