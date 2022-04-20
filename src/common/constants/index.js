const VTI_DOMAIN = process.env.REACT_APP_VTI_DOMAIN || 'vti.com.vn'

export const LANG_OPTIONS = {
  VI: 'vi',
  EN: 'en',
  JP: 'jp',
}

export const DEFAULT_LANG = 'vi'

export const NOTIFICATION_TYPE = {
  SUCCESS: 'success',
  ERROR: 'danger',
  INFO: 'info',
  WARNING: 'warning',
}

export const MODAL_MODE = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DETAIL: 'DETAIL',
}

export const TEXTFIELD_REQUIRED_LENGTH = {
  COMMON: {
    MAX: 255,
  },
  NAME: {
    MAX: 50,
  },
  PASSWORD: {
    MIN: 6,
    MAX: 50,
  },
  EMAIL: {
    MIN: 6,
    MAX: 50,
  },
  FAX: {
    MAX: 50,
  },
  TAX: {
    MAX: 13,
  },
  PHONE: {
    MIN: 10,
    MAX: 20,
  },
  CODE: {
    MIN: 1,
    MAX: 20,
  },
  CODE_2: {
    MAX: 2,
  },
  CODE_3: {
    MAX: 3,
  },
  CODE_4: {
    MAX: 4,
  },
  CODE_6: {
    MIN: 6,
    MAX: 6,
  },
  CODE_7: {
    MAX: 7,
  },
  CODE_8: {
    MAX: 8,
  },
  CODE_10: {
    MAX: 10,
  },
  CODE_12: {
    MAX: 12,
  },
  CODE_20: {
    MAX: 20,
  },
  CODE_50: {
    MAX: 50,
  },
  TARGET: {
    MAX: 5,
  },
}

export const NUMBER_FIELD_REQUIRED_SIZE = {
  AMOUNT_INTEGER: {
    MIN: 1,
    MAX: 99999999999,
  },
  INTEGER_100K: {
    MIN: 0,
    MAX: 99999,
  },
  AMOUNT_DECIMAL: {
    MIN: 0.0000001,
    MAX: 99999999999,
  },
  PERCENT: {
    MIN: 0,
    MAX: 100,
  },
  QUANTITY: {
    MIN: 0,
    MAX: 999999999,
  },
  WATTAGE: {
    MIN: 0,
    MAX: 9999999,
  },
  PRICE: {
    MIN: 0,
    MAX: 100000000000,
  },
}

export const TEXTFIELD_ALLOW = {
  NUMERIC: /[^0-9]/g,
  ALPHABET: /[^a-zA-Z]/g,
  ALPHANUMERIC: /[^0-9a-zA-Z]/g,
  ALPHANUMERIC_SPECIALS:
    // eslint-disable-next-line no-useless-escape
    /[^0-9a-zA-Z-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]/g,
}

export const TEXTFIELD_PREVENT = {
  [TEXTFIELD_ALLOW.NUMERIC]: [',', '.', '-', '+', 'e', 'E'],
}

export const ROWS_PER_PAGE_OPTIONS = [20, 50, 100]
export const ASYNC_SEARCH_LIMIT = 100
export const DEFAULT_DATE_TIME_FORMAT = 'dd/MM/yyyy HH:mm:ss'

export const DATE_FORMAT = 'dd/MM/yyyy'

export const DEFAULT_DATE_TIME_FORMAT_VN = 'dd-MM-yyyy hh:mm a'

export const DATE_FORMAT_3 = 'yyyy-MM-dd'

export const DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm'
export const DEFAULT_TIME = '00:00'

export const IMPORT_EXPORT_DATE_FORMAT = 'dd-MM-yyyy_HH_mm_SS'

export const QR_CODE_TYPE = {
  ITEM: '02',
  BLOCK: '03',
  PACKAGE: '04',
}

export const CODE_SETTINGS = {
  ITEM: {
    DOMAIN: 'ITEM',
    PREFIX: '02',
    MAX_LENGTH: 7,
    FILLED_CHARACTER: '0',
  },
  BLOCK: {
    DOMAIN: 'BLOCK',
    PREFIX: '03',
    MAX_LENGTH: 12,
    FILLED_CHARACTER: '0',
  },
  PACKAGE: {
    DOMAIN: 'PACKAGE',
    PREFIX: '04',
    MAX_LENGTH: 12,
    FILLED_CHARACTER: '0',
  },
}

export const FILE_TYPE = {
  XLSX: {
    NAME: 'XLSX',
    EXT: '.xlsx',
    MIME_TYPE:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
}

export const IMPORT_SETTING = {
  FILE_SIZE_LIMIT: 5242880,
  NUMBER_OF_FILE: 1,
  FILE_NAME: '{0}_{1}{2}' + FILE_TYPE.XLSX.EXT,
}

export const IMPORT_EXPORT_MODE = {
  IMPORT_ONLY: 'IMPORT',
  EXPORT_ONLY: 'EXPORT',
  BOTH: 'IMPORT/EXPORT',
}

export const IMPORT_EXPORT_MODE_OPTIONS = [
  {
    value: IMPORT_EXPORT_MODE.IMPORT_ONLY,
    text: 'importExportMenu.import',
  },
  {
    value: IMPORT_EXPORT_MODE.EXPORT_ONLY,
    text: 'importExportMenu.export',
  },
]

export const CONFIG_COOKIES = {
  path: '/',
  domain: VTI_DOMAIN,
}
