import queryString from 'query-string'

const parse = (str, opts) =>
  queryString.parse(str, {
    arrayFormat: 'comma',
    parseNumbers: true,
    parseBooleans: true,
    ...opts,
  })

const stringify = (obj, opts) =>
  queryString.stringify(obj, {
    arrayFormat: 'comma',
    ...opts,
  })

const add = (str, obj, stringifyOptions, parseOptions) =>
  stringify(
    {
      ...parse(str, parseOptions),
      ...obj,
    },
    stringifyOptions,
  )

const omit = (str, key) => {
  const parsed = parse(str)

  if (typeof key === 'string') {
    delete parsed[key]
  } else if (Array.isArray(key)) {
    key.forEach((k) => {
      delete parsed[k]
    })
  }

  return stringify(parsed)
}

export default {
  parse,
  stringify,
  add,
  omit,
}
