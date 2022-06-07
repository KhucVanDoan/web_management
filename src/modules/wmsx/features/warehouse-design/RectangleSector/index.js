import React, { useEffect, useRef, useState } from 'react'

import { ContentCopy, Edit, Delete, Info } from '@mui/icons-material'
import {
  IconButton,
  Popover,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import { Formik, Form } from 'formik'
import Draggable from 'react-draggable'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { SPACE_UNITS, WEIGHT_UNITS } from '~/modules/wmsx/constants'
import { convertActualDimensiontoCanvasDimension } from '~/utils/measure'
import './style.scss'
const RectangleSector = ({
  warehouseSector,
  onStopDrag,
  onUpdateSector,
  ratio,
  onRemoveSector,
  onCloneSector,
}) => {
  const [id, setId] = useState(null)
  const [activeDrags, setActiveDrags] = useState(0)
  const [isClickOnSector, setIsClickOnSector] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [popoverContent, setPopoverContent] = useState({})
  const { t } = useTranslation(['wmsx'])
  const sectorRef = useRef()
  const formRef = useRef()

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    setPosition(warehouseSector.design)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleClickOutside = (event) => {
    if (sectorRef?.current && !sectorRef?.current?.contains(event.target)) {
      setIsClickOnSector(false)
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
    setPosition({ x: x, y: y })
  }

  const clickOnSector = () => {
    setIsClickOnSector(true)
  }

  const onEditSector = (id) => {
    setId(id)
    setIsOpenModal(true)
  }

  const handleCancel = () => {
    setIsOpenModal(false)
  }

  const handleFinish = (values) => {
    onUpdateSector(id, values.name)
    setIsOpenModal(false)
    setId(null)
  }

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit()
    }
  }

  const tooltipContent = (item) => {
    return (
      <div className="tooltip-container">
        <p className="title">{item.name}</p>
        <p className="size">
          {t('warehouseDesign.size')} D*R*C (
          {t(SPACE_UNITS.find((unit) => unit.id === item.width?.unit)?.name)}):
          {item.long?.value}*{item.width?.value}*{item.height?.value}
        </p>
        {item.weightLoad?.value && (
          <p className="weight-load">
            {t('warehouseDesign.weightLoad')} (
            {t(
              WEIGHT_UNITS.find((unit) => unit.id === item.weightLoad?.unit)
                ?.name,
            )}
            ):
            {item.weightLoad?.value}
          </p>
        )}
      </div>
    )
  }

  const handleOpenPopover = (event, content) => {
    setAnchorEl(event.currentTarget)
    setPopoverContent(content)
  }

  const handleClosePopover = () => {
    setAnchorEl(null)
    setPopoverContent({})
  }

  const dragHandlers = {
    onStart: onStart,
    onStop: onStop,
    onDrag: handleDrag,
  }
  const open = Boolean(anchorEl)

  return (
    <>
      <Draggable
        bounds="parent"
        position={{
          x: warehouseSector.design.x,
          y: warehouseSector.design.y,
        }}
        {...dragHandlers}
      >
        <div
          ref={sectorRef}
          className={`sector-canvas ${isClickOnSector ? 'active' : ''}`}
          style={{
            width: `${convertActualDimensiontoCanvasDimension(
              warehouseSector?.width?.unit,
              warehouseSector?.width?.value,
              ratio,
            )}px`,
            height: `${convertActualDimensiontoCanvasDimension(
              warehouseSector?.long?.unit,
              warehouseSector?.long?.value,
              ratio,
            )}px`,
          }}
          onClick={clickOnSector}
        >
          {isClickOnSector && (
            <div className="sector-toolbar">
              <IconButton
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                className="toolbar-button info"
                size="small"
                shape="circle"
                onMouseEnter={(event) =>
                  handleOpenPopover(event, warehouseSector)
                }
                onMouseLeave={handleClosePopover}
              >
                <Info fontSize="small" />
              </IconButton>
              <IconButton
                className="toolbar-button copy"
                size="small"
                shape="circle"
                onClick={() => onCloneSector(warehouseSector)}
              >
                <ContentCopy fontSize="small" />
              </IconButton>
              <IconButton
                className="toolbar-button edit"
                size="small"
                shape="circle"
                onClick={() => onEditSector(warehouseSector.id)}
              >
                <Edit fontSize="small" />
              </IconButton>
              <IconButton
                className="toolbar-button delete"
                size="small"
                shape="circle"
                onClick={() => onRemoveSector(warehouseSector.id)}
              >
                <Delete fontSize="small" />
              </IconButton>
            </div>
          )}
          {warehouseSector.warehouseShelfs.map((warehouseShelf) => (
            <div
              className="shelf-canvas"
              style={{
                height: `${convertActualDimensiontoCanvasDimension(
                  warehouseShelf.long?.unit,
                  warehouseShelf.long?.value,
                  ratio,
                )}px`,
              }}
            >
              <div
                className="shelf-icon"
                onMouseEnter={(event) =>
                  !isClickOnSector
                    ? handleOpenPopover(event, warehouseShelf)
                    : null
                }
                onMouseLeave={handleClosePopover}
              ></div>
              {warehouseShelf.warehouseShelfFloors?.map(
                (warehouseShelfFloor, index) => (
                  <div
                    className="shelf-floor-icon"
                    key={index}
                    onMouseEnter={(event) =>
                      !isClickOnSector
                        ? handleOpenPopover(event, warehouseShelfFloor)
                        : null
                    }
                    onMouseLeave={handleClosePopover}
                  >
                    {index + 1}
                  </div>
                ),
              )}
            </div>
          ))}
        </div>
      </Draggable>
      <Popover
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={handleClosePopover}
        disableRestoreFocus
      >
        {tooltipContent(popoverContent)}
      </Popover>
      {isOpenModal && (
        <Dialog open={isOpenModal} onClose={handleCancel}>
          <DialogTitle>{t('warehouseDesign.updateArea')}</DialogTitle>
          <DialogContent>
            <Formik
              innerRef={formRef}
              initialValues={{
                name: warehouseSector.name,
                id: warehouseSector.id,
              }}
              enableReinitialize
              onSubmit={handleFinish}
            >
              {() => (
                <Form>
                  <Field.TextField
                    name="name"
                    label={t('warehouseDesign.area')}
                  />
                </Form>
              )}
            </Formik>
          </DialogContent>
          <DialogActions>
            <Button key="back" onClick={handleCancel}>
              {t('defineVoucher.cancelCreateModalLabel')}
            </Button>
            <Button onClick={handleSubmit}>
              {t('defineVoucher.submitUpdateModalLabel')}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

export default RectangleSector
