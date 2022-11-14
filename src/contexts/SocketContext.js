import React, { useEffect, useState, createContext } from 'react'

import io from 'socket.io-client'

import { SOCKET_EVENTS } from '~/common/constants/socket'
import useUserInfo from '~/modules/configuration/redux/hooks/useUserInfo'
import { useNotification } from '~/modules/shared/redux/hooks/useNotification'

export const SocketContext = createContext({})

const host = process.env.REACT_APP_SOCKET_HOST

export const SocketProvider = ({ children }) => {
  const [itemSocket, setItemSocket] = useState(null)
  const [notiSocket, setNotiSocket] = useState(null)
  const { actions } = useNotification()
  const {
    data: { userInfo },
  } = useUserInfo()

  useEffect(() => {
    const itemSck = io(`${host}/items`, {
      transports: ['websocket'],
    })

    itemSck.connect()
    setItemSocket(itemSck)

    itemSck.on(SOCKET_EVENTS.PRINT_ITEM_QR_CODE, (res) => {
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

    itemSck.on(SOCKET_EVENTS.PRINT_WORK_ORDER_QR_CODE, (res) => {
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
      itemSck?.disconnect()
    }
  }, [])

  useEffect(() => {
    const userId = userInfo?.id
    if (!userId) return

    const notiSck = io(`${host}/notifications`, {
      transports: ['websocket'],
    })

    notiSck.connect()
    setNotiSocket(notiSck)

    const receivingEvent = `${SOCKET_EVENTS.PREFIX_CHANNEL_WEB}-${userId}`
    notiSck.on(receivingEvent, (res) => {
      if (res?.user) {
        actions.addNotification(res?.user)
      }
    })

    return () => {
      notiSck?.disconnect()
    }
  }, [userInfo?.id])

  const value = {
    itemSocket,
    notiSocket,
  }

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  )
}

export default SocketContext
