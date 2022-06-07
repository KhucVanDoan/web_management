import React, { useEffect, useState, useRef } from 'react'

import { Button } from '@mui/material'
import Draggable from 'react-draggable'

import Icon from '~/components/Icon'
import { WAREHOUSE_DOOR } from '~/modules/wmsx/constants'

import './style.scss'
import doorImage from '../../../../../assets/images/door.png'
const Door = ({ door, onStopDrag, warehouseSize, onRemoveDoor }) => {
  const [activeDrags, setActiveDrags] = useState(0)
  const [isClickOnDoor, setIsClickOnDoor] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  let doorRef = useRef()
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    setPosition(door?.design)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleClickOutside = (event) => {
    if (doorRef && !doorRef.contains(event.target)) {
      setIsClickOnDoor(false)
    }
  }

  const onStart = () => {
    setActiveDrags(activeDrags + 1)
  }

  const onStop = () => {
    setActiveDrags(activeDrags - 1)
    onStopDrag(position)
  }

  const handleDrag = (e, ui) => {
    const { x, y } = ui
    if (
      x === 0 ||
      warehouseSize.stageWidth - (x + WAREHOUSE_DOOR.WIDTH) === 0 ||
      y === 0 ||
      warehouseSize.stageLong - (y + WAREHOUSE_DOOR.HEIGHT) === 0
    ) {
      setPosition({ x: x, y: y })
    }
  }

  const clickOnDoor = () => {
    setIsClickOnDoor(true)
  }

  const setDoorRef = (node) => {
    doorRef = node
  }

  const imageClassName = () => {
    return door.design.x === 0
      ? 'rotate-90'
      : door.design.y === 0
      ? 'rotate-180'
      : warehouseSize.stageWidth - (door.design.x + WAREHOUSE_DOOR.WIDTH) === 0
      ? 'rotate-270'
      : ''
  }

  const setAxis = () => {
    return door.design.x === 0 ||
      warehouseSize.stageWidth - (door.design.x + WAREHOUSE_DOOR.WIDTH) === 0
      ? 'y'
      : 'x'
  }
  const dragHandlers = {
    onStart: onStart,
    onStop: onStop,
    onDrag: handleDrag,
  }
  return (
    <Draggable
      axis={setAxis()}
      bounds="parent"
      position={{ x: door.design.x, y: door.design.y }}
      {...dragHandlers}
    >
      <div ref={setDoorRef} className="door-canvas" onClick={clickOnDoor}>
        {isClickOnDoor && (
          <div className="door-toolbar">
            <Button
              className="toolbar-button"
              size="small"
              shape="circle"
              icon={<Icon name="delete" />}
              onClick={() => onRemoveDoor(door.id)}
            ></Button>
          </div>
        )}
        <img
          className={imageClassName()}
          draggable={false}
          src={doorImage}
          alt="doorImage"
        />
      </div>
    </Draggable>
  )
}

export default Door
