import React, { useEffect, useState, createContext } from 'react'

import io from 'socket.io-client'

import { ROWS_PER_PAGE_OPTIONS } from '~/common/constants'
import { SOCKET_EVENTS } from '~/common/constants/socket'
import { useNotification } from '~/modules/shared/redux/hooks/useNotification'
import { isAuth } from '~/utils'
import { getLocalItem } from '~/utils/storage'

export const SocketContext = createContext({
  socket: null,
})

const host = process.env.REACT_APP_SOCKET_HOST

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const { actions } = useNotification()
  const isAuthenticated = isAuth()

  useEffect(() => {
    const socketInit = io(host, {
      transports: ['websocket'],
    })

    socketInit.connect()
    setSocket(socketInit)

    return () => {
      socketInit?.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!socket) return

    socket.on(SOCKET_EVENTS.PRINT_ITEM_QR_CODE, (res) => {
      try {
        window.checkPrinterStatus(function (text) {
          if (text === 'Ready to Print') {
            window.selected_printer.send(
              res?.data,
              // () => console.log('PRINTED'),
              // () => console.log('PRINT ERROR'),
            )
          } else {
            window.printerError(text)
          }
        })
      } catch (e) {
        throw e
      }
    })

    socket.on(SOCKET_EVENTS.PRINT_WORK_ORDER_QR_CODE, (res) => {
      try {
        window.checkPrinterStatus(function (text) {
          if (text === 'Ready to Print') {
            window.selected_printer.send(
              res?.data,
              // () => console.log('PRINTED'),
              // () => console.log('PRINT ERROR'),
            )
          } else {
            window.printerError(text)
          }
        })
      } catch (e) {
        throw e
      }
    })
  }, [socket])

  useEffect(() => {
    const userId = getLocalItem('userInfo')?.id

    if (!socket || !isAuthenticated || !userId) return

    const receivingEvent = `${SOCKET_EVENTS.PREFIX_CHANNEL_WEB}-${userId}`

    socket.on(receivingEvent, (res) => {
      actions.addNotification(res)
    })
  }, [socket, isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      actions.getNotifications({ last_id: '', limit: ROWS_PER_PAGE_OPTIONS[0] })
    }
  }, [isAuthenticated])

  const value = {
    socket,
  }

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  )
}

export default SocketContext
