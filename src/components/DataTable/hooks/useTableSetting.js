import { useLocation } from 'react-router-dom'
import storage from 'utils/storage'

const useTableSetting = (keyTableSetting) => {
  const { pathname } = useLocation()
  const storageKey =
    keyTableSetting ||
    `TABLE_SETTING${pathname.replace(/\//g, '_').toUpperCase()}`
  const tableSetting = storage.sessionGet(storageKey)

  const updateTableSetting = (newSetting) => {
    storage.sessionSet(storageKey, newSetting)
  }

  return { tableSetting, updateTableSetting }
}

export default useTableSetting
