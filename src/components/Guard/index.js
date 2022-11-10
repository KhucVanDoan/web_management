import { PropTypes } from 'prop-types'

import { getLocalItem } from '~/utils'

const Guard = ({ code, fallback, children }) => {
  const userPermissions = getLocalItem('userInfo')?.userPermissions || []

  if (!code) return children

  if (userPermissions.some((item) => item?.code === code)) return children

  if (typeof fallback === 'function') return fallback()

  return fallback
}

Guard.defaultProps = {
  code: '',
  fallback: null,
}

Guard.propTypes = {
  code: PropTypes.string,
  fallback: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.shape(),
    PropTypes.string,
  ]),
}

export default Guard
