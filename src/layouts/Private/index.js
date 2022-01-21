/* eslint-disable */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { isAuth } from 'utils'
import { socket } from 'services/socket/socket-client'
import Box from '@mui/material/Box'
import Sidebar from 'components/Sidebar'
import { useAppStore } from 'modules/auth/redux/hooks/useAppStore'

const PrivateLayout = ({ children }) => {
  const { actions } = useAppStore()

  useEffect(() => {
    if (isAuth()) {
      actions.getAppStore()
    }

    // @TODO: <yen.nguyenhai> create new socket provider
    socket.on('print_item_qr_code', (event) => {
      console.log(event)
      try {
        window.checkPrinterStatus(function (text) {
          if (text === 'Ready to Print') {
            window.selected_printer.send(
              event.data,
              () => console.log('PRINTED'),
              () => console.log('PRINT ERROR'),
            )
          } else {
            window.printerError(text)
          }
        })
      } catch (e) {
        console.log(e)
      }
    })
    socket.on('print_work_order_qr_code', (event) => {
      console.log(event)
      try {
        window.checkPrinterStatus(function (text) {
          if (text === 'Ready to Print') {
            window.selected_printer.send(
              event.data,
              () => console.log('PRINTED'),
              () => console.log('PRINT ERROR'),
            )
          } else {
            window.printerError(text)
          }
        })
      } catch (e) {
        console.log(e)
      }
    })
  }, [])

  if (!isAuth()) {
    return <Redirect to="/login" />
  }

  return (
    <Box
      sx={{
        display: 'flex',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      <Sidebar />
      <Box sx={{ flex: 1, overflow: 'hidden' }}>{children}</Box>
    </Box>
  )
}

PrivateLayout.defaultProps = {
  children: null,
}

PrivateLayout.propTypes = {
  children: PropTypes.node,
}

export default PrivateLayout
