import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import QRCode from 'qrcode'

export const QRCodeGenerator = ({ value, sx, size }) => {
  const [imgSrc, setImgSrc] = useState('')

  useEffect(() => {
    if (!!value) {
      QRCode.toDataURL(value, (_, url) => {
        setImgSrc(url)
      })
    }
  }, [value])

  if (!imgSrc) return null

  return (
    <Box
      sx={(theme) => ({
        img: {
          width: size,
        },
        display: 'inline-block',
        background: '#FFF',
        border: `1px solid ${theme.palette.grayF4.main}`,
        boxShadow: '0px 8px 8px rgba(102, 102, 102, 0.05)',
        borderRadius: 3,
        ...sx,
      })}
    >
      <img src={imgSrc} alt="" />
    </Box>
  )
}

QRCodeGenerator.defaultProps = {
  value: '',
  sx: {},
  size: 150,
}

QRCodeGenerator.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.shape(),
  size: PropTypes.number,
}

export default QRCodeGenerator
