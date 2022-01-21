import queryString from 'query-string'

export const qsParse = (str, opts) =>
  queryString.parse(str, {
    arrayFormat: 'comma',
    parseNumbers: true,
    parseBooleans: true,
    ...opts,
  })

export const qsStringify = (obj, opts) =>
  queryString.stringify(obj, {
    arrayFormat: 'comma',
    ...opts,
  })

export const qsAdd = (str, obj, stringifyOptions, parseOptions) =>
  qsStringify(
    {
      ...qsParse(str, parseOptions),
      ...obj,
    },
    stringifyOptions,
  )

export const qsRemove = (str, key) => {
  const parsed = qsParse(str)

  if (typeof key === 'string') {
    delete parsed[key]
  } else if (Array.isArray(key)) {
    key.forEach((k) => {
      delete parsed[k]
    })
  }

  return qsStringify(parsed)
}
