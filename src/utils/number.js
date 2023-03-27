import BigNumber from 'bignumber.js'

export const convertNumberWithSISymbol = (num, digits = 2) => {
  if (!num) return 0

  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  let i
  for (i = si.length - 1; i > 0; i -= 1) {
    if (num >= si[i].value) {
      break
    }
  }

  return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol
}

export const convertNumberWithThousandSeparator = (num, digits = 2) => {
  if (num === 0) return 0
  if (!num) return ''

  return BigNumber(num)
    .toFixed(digits)
    .toString()
    .replace(/\d(?=(\d{3})+(?!\d))/g, '$& ')
    .replace(/\.?0+$/, '')
    .replace('.', ',')
}
