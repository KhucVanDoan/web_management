import React, { useEffect, useRef, useState } from 'react'

import WarehouseIcon from '@mui/icons-material/Warehouse'
import { Card, Typography } from '@mui/material'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { uuid } from 'uuidv4'

import { NOTIFICATION_TYPE } from '~/common/constants'
import Autocomplete from '~/components/Autocomplete'
import Button from '~/components/Button'
import { DISTANCE_BETWEEN_SECTORS, DRAG_TYPE } from '~/modules/wmsx/constants'
import useCommonManagement from '~/modules/wmsx/redux/hooks/useCommonManagement'
import { useTemplateSector } from '~/modules/wmsx/redux/hooks/useDefineTemplateSector'
import useDefineTemplateShelf from '~/modules/wmsx/redux/hooks/useDefineTemplateShelf'
import useDefineWarehouse from '~/modules/wmsx/redux/hooks/useDefineWarehouse'
import useWarehouseDesign from '~/modules/wmsx/redux/hooks/useWarehouseDesign'
import {
  convertActualDimensiontoCanvasDimension,
  convertToCm,
  convertToUnit,
} from '~/utils/measure'
import addNotification from '~/utils/toast'

import './style.scss'
import Door from '../Door'
import RectangleSector from '../RectangleSector'

const WarehouseCanvas = ({ onChangeWarehouseRatio, setIsLoading }) => {
  const [warehouseId, setWarehouseId] = useState(null)
  const [warehouseDetailCanvas, setWarehouseDetailCanvas] = useState({})
  const [ratio, setRatio] = useState(1)
  const [warehouseSize, setWarehouseSize] = useState({})
  const [designs, setDesigns] = useState([])
  const [doors, setDoors] = useState([])
  const warehouseStage = useRef()

  const { t } = useTranslation(['wmsx'])
  const {
    data: { warehouseDetails },
    actions: defineWarehouseActions,
  } = useDefineWarehouse()
  const { actions } = useWarehouseDesign()
  const { actions: defineTemplateSector } = useTemplateSector()

  const { actions: defineTemplateShelfActions } = useDefineTemplateShelf()

  const {
    data: { warehouseList },
    actions: commonActions,
  } = useCommonManagement()

  useEffect(() => {
    commonActions.getWarehouses({ isGetAll: 1 }, () => {
      if (new URLSearchParams(window.location?.search)?.get('id')) {
        onChangeWarehouse(
          new URLSearchParams(window.location?.search)?.get('id'),
        )
      }
    })
    return () => defineWarehouseActions.restStateWarehouseCanvas()
  }, [])

  useEffect(() => {
    if (warehouseId) {
      displayWarehouseDesign()
    }
  }, [warehouseId])
  useEffect(() => {
    setDesigns(
      warehouseDetailCanvas?.warehouseSectors?.map((sector) => ({
        ...sector,
        design: {
          x:
            sector?.design?.x <= 1
              ? sector?.design?.x * warehouseSize.stageWidth
              : sector?.design?.x,
          y:
            sector.design.y <= 1
              ? sector?.design?.y * warehouseSize.stageLong
              : sector?.design?.y,
        },
      })),
    )
    setDoors(
      warehouseDetailCanvas?.doors?.map((door) => ({
        ...door,
        design: {
          x:
            door?.design?.x <= 1
              ? door?.design?.x * warehouseSize?.stageWidth
              : door?.design?.x,
          y:
            door?.design?.y <= 1
              ? door?.design?.y * warehouseSize?.stageLong
              : door?.design?.y,
        },
      })) || [],
    )
  }, [warehouseSize, warehouseDetailCanvas])

  const onChangeWarehouse = (value) => {
    setWarehouseId(Number(value))
  }

  const displayWarehouseDesign = () => {
    setIsLoading(true)
    defineWarehouseActions.getWarehouseDetailsCanvasById(
      warehouseId,
      (data) => {
        calculateWarehouseSize(data)
        setWarehouseDetailCanvas(data)
        setIsLoading(false)
      },
    )
  }

  const calculateWarehouseSize = (data) => {
    const canvasWidth = warehouseStage.current?.clientWidth
    const warehouseActualWidth = data?.width || {}
    const warehouseActualLong = data?.long || {}
    const actualWarehouseWidthInPixel = convertActualDimensiontoCanvasDimension(
      warehouseActualWidth?.unit,
      warehouseActualWidth?.value,
      1,
    )
    const ratio = canvasWidth / actualWarehouseWidthInPixel
    const warehouseSize = {
      stageWidth: canvasWidth,
      stageLong: convertActualDimensiontoCanvasDimension(
        warehouseActualLong?.unit,
        warehouseActualLong?.value,
        ratio,
      ),
    }
    setRatio(ratio)
    setWarehouseSize(warehouseSize)
    onChangeWarehouseRatio(ratio)
  }

  const findEmptySpaceToPlaceSector = (sector) => {
    let isEmptyOnLeft = true
    let isEmptyOnRight = true
    let isEmptyOnTop = true
    let isEmptyUnderBottom = true
    const sectorWidth = convertActualDimensiontoCanvasDimension(
      sector?.width?.unit,
      sector?.width?.value,
      ratio,
    )
    const sectorLong = convertActualDimensiontoCanvasDimension(
      sector?.long?.unit,
      sector?.long?.value,
      ratio,
    )
    const rightSide = {
      x: sector?.design?.x + sectorWidth + DISTANCE_BETWEEN_SECTORS,
      y: sector?.design?.y,
    }
    const leftSide = {
      x: sector?.design?.x - sectorWidth - DISTANCE_BETWEEN_SECTORS,
      y: sector?.design?.y,
    }
    const top = {
      x: sector?.design?.x,
      y: sector?.design?.y - sectorLong - DISTANCE_BETWEEN_SECTORS,
    }
    const bottom = {
      x: sector?.design?.x,
      y: sector?.design?.y + sectorLong + DISTANCE_BETWEEN_SECTORS,
    }

    for (let i = 0; i < designs?.length; i++) {
      const isOverlapOnRightSide = isOverlap(
        { ...sector, design: { ...rightSide } },
        designs[i],
      )
      const isOverlapOnLeftSide = isOverlap(
        { ...sector, design: { ...leftSide } },
        designs[i],
      )
      const isOverlapOnTop = isOverlap(
        { ...sector, design: { ...top } },
        designs[i],
      )
      const isOverlapUnderBottom = isOverlap(
        { ...sector, design: { ...bottom } },
        designs[i],
      )
      if (
        isOverlapOnRightSide ||
        rightSide?.x + sectorWidth > warehouseSize?.stageWidth
      ) {
        isEmptyOnRight = false
      }
      if (isOverlapOnLeftSide || leftSide?.x < 0) {
        isEmptyOnLeft = false
      }
      if (isOverlapOnTop || top?.y < 0) {
        isEmptyOnTop = false
      }
      if (
        isOverlapUnderBottom ||
        bottom?.y + sectorLong > warehouseSize?.stageLong
      ) {
        isEmptyUnderBottom = false
      }
    }

    if (isEmptyOnRight) {
      return rightSide
    } else if (isEmptyOnLeft) {
      return leftSide
    } else if (isEmptyOnTop) {
      return top
    } else if (isEmptyUnderBottom) {
      return bottom
    }
  }

  const isOverlap = (r1, r2) => {
    return !(
      r2?.design?.x >
        r1?.design?.x +
          convertActualDimensiontoCanvasDimension(
            r1?.width?.unit,
            r1?.width?.value,
            ratio,
          ) ||
      r2?.design?.x +
        convertActualDimensiontoCanvasDimension(
          r2?.width?.unit,
          r2?.width?.value,
          ratio,
        ) <
        r1?.design?.x ||
      r2?.design?.y >
        r1?.design?.y +
          convertActualDimensiontoCanvasDimension(
            r1?.long?.unit,
            r1?.long?.value,
            ratio,
          ) ||
      r2?.design?.y +
        convertActualDimensiontoCanvasDimension(
          r2?.long?.unit,
          r2?.long?.value,
          ratio,
        ) <
        r1?.design?.y
    )
  }

  const getSectorData = (templateSectorId, position) => {
    defineTemplateSector.getTemplateSectorDetailById(
      templateSectorId,
      (templateSector) => {
        const templateShelfId = templateSector?.templateShelfs[0]?.id
        defineTemplateShelfActions.getTemplateShelfDetailById(
          templateShelfId,
          (templateShelf) => {
            setDesigns(
              [].concat(designs, [
                {
                  ...templateSector,
                  id: uuid(),
                  warehouseShelfs: templateSector?.templateShelfs?.map(
                    (item) => ({
                      ...templateShelf,
                      ...item,
                      warehouseShelfFloors: templateShelf?.templateShelfFloors,
                    }),
                  ),
                  design: {
                    x: position?.x,
                    y: position?.y,
                  },
                },
              ]),
            )
          },
        )
      },
    )
  }

  const validateSectorBeforeInsert = (templateSector, position) => {
    const sectorWidth = convertActualDimensiontoCanvasDimension(
      templateSector?.width?.unit,
      templateSector?.width?.value,
      ratio,
    )
    const sectorLong = convertActualDimensiontoCanvasDimension(
      templateSector?.long?.unit,
      templateSector?.long?.value,
      ratio,
    )

    if (
      sectorWidth + position?.x > warehouseSize?.stageWidth ||
      sectorLong + position?.y > warehouseSize?.stageLong ||
      convertToCm(templateSector?.height?.unit, templateSector?.height?.value) >
        convertToCm(
          warehouseDetailCanvas?.height?.unit,
          warehouseDetailCanvas?.height?.value,
        )
    ) {
      throw new Error(t('warehouseDesign.areaCannotOutsideOfWarehouse'))
    }

    const isSectorOverlap = designs?.some((design) =>
      isOverlap(
        {
          ...templateSector,
          design: { ...position },
        },
        design,
      ),
    )
    if (isSectorOverlap) {
      throw new Error(t('warehouseDesign.areasCannotOverlap'))
    }
  }

  const convertToSaveObject = (object, warehouseDetailCanvas) => {
    return {
      name: object?.name,
      width: {
        unit: warehouseDetailCanvas?.width?.unit,
        value: convertToUnit(
          object?.width?.unit,
          warehouseDetailCanvas?.width?.unit,
          object?.width?.value,
        ),
      },
      height: {
        unit: warehouseDetailCanvas?.height?.unit,
        value: convertToUnit(
          object?.height?.unit,
          warehouseDetailCanvas?.height?.unit,
          object?.height?.value,
        ),
      },
      long: {
        unit: warehouseDetailCanvas.long?.unit,
        value: convertToUnit(
          object.long?.unit,
          warehouseDetailCanvas.long?.unit,
          object.long?.value,
        ),
      },
    }
  }

  const cancelDesign = () => {
    setDesigns(
      warehouseDetails?.warehouseSectors?.map((sector) => ({
        ...sector,
        design: {
          x: sector?.design?.x * warehouseSize?.stageWidth,
          y: sector?.design?.y * warehouseSize?.stageLong,
        },
      })),
    )
    setDoors(
      warehouseDetails?.doors?.map((door) => ({
        ...door,
        design: {
          x:
            door?.design?.x <= 1
              ? door?.design?.x * warehouseSize?.stageWidth
              : door?.design?.x,
          y:
            door?.design?.y <= 1
              ? door?.design?.y * warehouseSize?.stageLong
              : door?.design?.y,
        },
      })) || [],
    )
  }

  const saveDesign = () => {
    try {
      setIsLoading(true)
      // Check sector duplicate name
      const sectorNames = designs?.map((item) => item.name)
      const sectorsDuplicateName = sectorNames?.filter(
        (item, idx) => sectorNames?.indexOf(item) !== idx,
      )
      if (sectorsDuplicateName?.length) {
        throw new Error(
          t('warehouseDesign.sectorNameDuplicate', {
            name: sectorsDuplicateName?.join(', '),
          }),
        )
      }
      const params = {
        id: warehouseId,
        warehouseSectors: designs?.map((sector) => ({
          ...convertToSaveObject(sector, warehouseDetailCanvas),
          design: {
            x: sector?.design?.x / warehouseSize?.stageWidth,
            y: sector?.design?.y / warehouseSize?.stageLong,
          },
          warehouseShelfs: sector?.warehouseShelfs?.map(
            (shelf, shelfIndex) => ({
              ...convertToSaveObject(shelf, warehouseDetailCanvas),
              weightLoad: !isEmpty(shelf?.weightLoad)
                ? shelf?.weightLoad
                : undefined,
              design: {
                x: 0,
                y:
                  shelfIndex *
                  convertActualDimensiontoCanvasDimension(
                    shelf?.long?.unit,
                    shelf?.long?.value,
                    ratio,
                  ),
              },
              warehouseShelfFloors: shelf?.warehouseShelfFloors?.map(
                (shelfFloor, shelfFloorIndex) => ({
                  ...convertToSaveObject(shelfFloor, warehouseDetailCanvas),
                  weightLoad: !isEmpty(shelfFloor?.weightLoad)
                    ? shelfFloor?.weightLoad
                    : undefined,
                  design: {
                    x:
                      shelfFloorIndex *
                      convertActualDimensiontoCanvasDimension(
                        shelfFloor?.width?.unit,
                        shelfFloor?.width?.value,
                        ratio,
                      ),
                    y:
                      shelfIndex *
                      convertActualDimensiontoCanvasDimension(
                        shelf?.long?.unit,
                        shelf?.long?.value,
                        ratio,
                      ),
                  },
                }),
              ),
            }),
          ),
        })),
        doors: doors?.map((door) => ({
          design: {
            x:
              door?.design?.x > 0
                ? door?.design?.x / warehouseSize?.stageWidth
                : 0,
            y:
              door?.design?.y > 0
                ? door?.design?.y / warehouseSize?.stageLong
                : 0,
          },
        })),
      }
      actions.updateWarehouseDesign(params, () => {
        setIsLoading(false)
        defineWarehouseActions.getWarehouseDetailsCanvasById(warehouseId)
      })
    } catch (error) {
      setIsLoading(false)
      addNotification(error.message, NOTIFICATION_TYPE.ERROR)
    }
  }

  const onRemoveDoor = (doorId) => {
    setDoors(doors?.filter((door) => door?.id !== doorId))
  }

  const onStopDragDoor = (doorId, position) => {
    setDoors(
      doors?.map((door) => {
        if (door?.id === doorId) {
          return {
            ...door,
            design: { ...position },
          }
        }
        return door
      }),
    )
  }

  const onUpdateSector = (sectorId, name) => {
    const isCheck = designs?.some((sector) => {
      return sector?.name === name && sector?.id !== sectorId
    })
    if (isCheck) {
      addNotification(t('warehouseDesign.hasArea'), NOTIFICATION_TYPE.ERROR)
    } else {
      setDesigns(
        designs?.map((sector) =>
          sector?.id === sectorId
            ? {
                ...sector,
                name,
              }
            : sector,
        ),
      )
      addNotification(
        t('warehouseDesign.updateSuccess'),
        NOTIFICATION_TYPE.SUCCESS,
      )
    }
  }

  const onStopDragSector = (sectorId, position) => {
    const sectorById = designs?.find((sector) => sector?.id === sectorId)
    const currentSectorChangePosition = {
      ...sectorById,
      design: {
        ...position,
      },
    }
    const isSectorOverlap = designs?.some((sector) => {
      return (
        isOverlap(currentSectorChangePosition, sector) &&
        sector?.id !== sectorId
      )
    })
    if (isSectorOverlap) {
      addNotification(
        t('warehouseDesign.areasCannotOverlap'),
        NOTIFICATION_TYPE.ERROR,
      )
    } else {
      setDesigns(
        designs.map((sector) => {
          if (sector?.id === sectorId) {
            return currentSectorChangePosition
          }
          return sector
        }),
      )
    }
  }

  const onCloneSector = (warehouseSector) => {
    const clonedPosition = findEmptySpaceToPlaceSector(warehouseSector)
    if (isEmpty(clonedPosition)) {
      addNotification(
        t('warehouseDesign.spaceAroundSectorIsNotEnough'),
        NOTIFICATION_TYPE.ERROR,
      )
      return
    }
    setDesigns(
      [].concat(designs, [
        {
          ...warehouseSector,
          id: uuid(),
          design: { ...clonedPosition },
        },
      ]),
    )
  }

  const handleDropDoor = (e) => {
    e.preventDefault()
    const { offsetY } = e.nativeEvent
    setDoors(
      [].concat(doors, [
        {
          id: uuid(),
          design: {
            x: 0,
            y: offsetY,
          },
        },
      ]),
    )
  }

  const onRemoveSector = (sectorId) => {
    setDesigns(designs?.filter((sector) => sector?.id !== sectorId))
  }

  const handleDragOver = (ev) => {
    ev.preventDefault()
  }

  const handleDrop = (e) => {
    const type = e?.dataTransfer?.getData('type')
    if (type === DRAG_TYPE.SECTOR) {
      handleDropSector(e)
    }
    if (type === DRAG_TYPE.DOOR) {
      handleDropDoor(e)
    }
  }

  const handleDropSector = (e) => {
    e.preventDefault()
    try {
      const position = {
        x: e?.nativeEvent?.offsetX,
        y: e?.nativeEvent?.offsetY,
      }
      const templateSector = JSON.parse(
        e?.dataTransfer?.getData('templateSector'),
      )
      validateSectorBeforeInsert(templateSector, position)
      getSectorData(templateSector.id, position)
    } catch (error) {
      addNotification(error.message, NOTIFICATION_TYPE.ERROR)
    }
  }
  return (
    <div className="warehouse-canvas">
      <Card
        className="warehouse-canvas-header"
        sx={{ px: 2, py: 1, mb: 1, minHeight: 64, boxSizing: 'border-box' }}
      >
        <Autocomplete
          options={warehouseList}
          label={t('defineWarehouse.name')}
          labelWidth="auto"
          sx={{ width: 300 }}
          getOptionLabel={(opt) => opt?.name}
          getOptionValue={(opt) => opt?.id}
          onChange={(ev) => onChangeWarehouse(ev)}
          value={warehouseId}
        />
        <div className="sector-block">{t('warehouseDesign.sector')}</div>
        <div className="shelf-block">{t('warehouseDesign.shelf')}</div>

        {warehouseId ? (
          <div className="action">
            <Button onClick={cancelDesign} color="grayF4">
              {t('warehouseDesign.cancel')}
            </Button>
            <Button icon="save" onClick={saveDesign} sx={{ ml: 1 }}>
              {t('warehouseDesign.save')}
            </Button>
          </div>
        ) : (
          ''
        )}
      </Card>
      <Card ref={warehouseStage} sx={{ flex: 1 }}>
        {warehouseId ? (
          <div
            sx={{ height: `${warehouseSize.stageLong}px` }}
            className="warehouse-stage"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {doors?.map((door) => (
              <Door
                key={door.id}
                door={door}
                warehouseSize={warehouseSize}
                onRemoveDoor={onRemoveDoor}
                onStopDrag={(position) => onStopDragDoor(door.id, position)}
              />
            ))}
            {designs?.map((warehouseSector) => (
              <RectangleSector
                key={warehouseSector.id}
                ratio={ratio}
                warehouseSector={warehouseSector}
                onRemoveSector={onRemoveSector}
                onCloneSector={onCloneSector}
                onStopDrag={(position) =>
                  onStopDragSector(warehouseSector.id, position)
                }
                onUpdateSector={(sectorId, name) =>
                  onUpdateSector(sectorId, name)
                }
              />
            ))}
          </div>
        ) : (
          <div className="warehouse-empty">
            <WarehouseIcon sx={{ fontSize: '90px', opacity: '0.1' }} />
            <Typography variant="body2" mt={0}>
              {t('warehouseDesign.selectWarehouse')}{' '}
            </Typography>
          </div>
        )}
      </Card>
    </div>
  )
}

export default WarehouseCanvas
