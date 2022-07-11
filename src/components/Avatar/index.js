import React from 'react'

import MuiAvatar from '@mui/material/Avatar'
import { PropTypes } from 'prop-types'

const COLOR_OPTIONS = [
  '#9C8AB6',
  '#F6888D',
  '#F28636',
  '#F6B029',
  '#A7B22E',
  '#5A886F',
  '#6FAAAC',
  '#0089BA',
]

function stringToColor(s) {
  if (!s) return COLOR_OPTIONS[0]

  let code = s.length
  let i

  for (i = 0; i < s.length; i += 1) {
    code += s.charCodeAt(i)
  }

  const color = COLOR_OPTIONS[code % COLOR_OPTIONS.length]

  return color
}

function stringToAvatar(s) {
  const arr = s.trim().split(' ')

  if (arr.length === 1) {
    return {
      children: `${s.split(' ')[0][0]}`,
    }
  }

  return {
    children: `${s.split(' ')[0][0]}${s.split(' ')[1][0]}`,
  }
}

export const Avatar = ({ name, src, sx, ...rest }) => {
  return (
    <MuiAvatar
      sx={sx}
      {...(!src && name?.trim()
        ? {
            ...stringToAvatar(name),
            sx: {
              fontSize: 18,
              ...sx,
              backgroundColor: stringToColor(name),
              textTransform: 'uppercase',
            },
          }
        : { src })}
      {...rest}
    />
  )
}

Avatar.defaultProps = {
  sx: {},
  name: '',
  src: '',
}

Avatar.propTypes = {
  sx: PropTypes.shape(),
  name: PropTypes.string,
  src: PropTypes.string,
}

export default Avatar
