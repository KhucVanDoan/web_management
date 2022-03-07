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
    MIN: 5,
    MAX: 50,
  },
  FAX: {
    MAX: 50,
  },
  TAX: {
    MAX: 13,
  },
  PHONE: {
    MAX: 12,
  },
  CODE: {
    MAX: 9,
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
}

export const NUMBER_FIELD_REQUIRED_SIZE = {
  AMOUNT_INTEGER: {
    MIN: 1,
    MAX: 99999999999,
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
    MAX: 99999999999,
  },
}

export const ROWS_PER_PAGE_OPTIONS = [20, 50, 100]

export const DEFAULT_DATE_TIME_FORMAT = 'yyy-MM-dd hh:mm a'

export const DATE_FORMAT = 'yyyy/MM/dd'

export const DATETIME_FORMAT = 'yyyy-MM-dd hh:mm:ss'

export const DATE_TIME_12_HOURS_FORMAT = "yyy-MM-dd hh:mm aaaaa'm'"

export const DATE_FORMAT_2 = 'MM/dd/yyyy'

export const DATE_FORMAT_3 = 'yyyy-MM-dd'

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
