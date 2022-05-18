import React, { useEffect, useState, createContext } from 'react'

import io from 'socket.io-client'

import { ROWS_PER_PAGE_OPTIONS } from '~/common/constants'
import { SOCKET_EVENTS } from '~/common/constants/socket'
import { useNotification } from '~/modules/shared/redux/hooks/useNotification'
import { isAuth } from '~/utils'
// import { getLocalItem } from '~/utils/storage'

export const SocketContext = createContext({})

const host = process.env.REACT_APP_SOCKET_HOST
const notiHost = process.env.REACT_APP_SOCKET_NOTIFICATION_HOST

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [notiSocket, setNotiSocket] = useState(null)
  const { actions } = useNotification()
  const isAuthenticated = isAuth()

  useEffect(() => {
    const socketInit = io(host, {
      transports: ['websocket'],
    })

    socketInit.connect()
    setSocket(socketInit)

    socketInit.on(SOCKET_EVENTS.PRINT_ITEM_QR_CODE, (res) => {
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

    socketInit.on(SOCKET_EVENTS.PRINT_WORK_ORDER_QR_CODE, (res) => {
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

    return () => {
      socketInit?.disconnect()
    }
  }, [])

  useEffect(() => {
    // const userId = getLocalItem('userInfo')?.id
    // @TODO: get userInfo from api
    const userId = ''
    if (!isAuthenticated || !userId) return

    const socketInit = io(notiHost, {
      transports: ['websocket'],
    })

    socketInit.connect()
    setNotiSocket(socketInit)

    const receivingEvent = `${SOCKET_EVENTS.PREFIX_CHANNEL_WEB}-${userId}`
    socketInit.on(receivingEvent, (res) => {
      actions.addNotification(res)
    })

    return () => {
      socketInit?.disconnect()
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      actions.getNotifications({ last_id: '', limit: ROWS_PER_PAGE_OPTIONS[0] })
    }
  }, [isAuthenticated])

  const value = {
    socket,
    notiSocket,
  }

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  )
}

export default SocketContext
