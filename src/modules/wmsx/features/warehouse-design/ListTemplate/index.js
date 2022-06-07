import React, { useEffect, useState } from 'react'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

import { DRAG_TYPE } from '~/modules/wmsx/constants'
import { useTemplateSector } from '~/modules/wmsx/redux/hooks/useDefineTemplateSector'
import useDefineTemplateShelf from '~/modules/wmsx/redux/hooks/useDefineTemplateShelf'
import { convertActualDimensiontoCanvasDimension } from '~/utils/measure'

import door from '../../../../../assets/images/door.png'

import './style.scss'

const ListTemplate = ({ warehouseRaio }) => {
  const { t } = useTranslation(['wmsx'])
  const [treeData, setTreeData] = useState([])
  const [searchStr, setSearchStr] = useState(null)
  const { actions: temPlateSectorActions } = useTemplateSector()
  const { actions: temPlateShelfActions } = useDefineTemplateShelf()
  const [expanded, setExpanded] = React.useState(false)
  const [expandedShelf, setExpandedShelf] = React.useState(false)
  useEffect(() => {
    temPlateSectorActions.searchTemplateSectors({ isGetAll: 1 }, (payload) => {
      const treeDatas = payload?.list?.map((item) => ({
        items: item,
        key: `sector-${item.id}`,
        name: item.name,
        id: item.id,
      }))
      setTreeData(treeDatas)
    })
  }, [])
  const hanldeDragSector = (e, templateSector) => {
    const sectorWidth = convertActualDimensiontoCanvasDimension(
      templateSector?.width?.unit,
      templateSector?.width?.value,
      warehouseRaio,
    )
    const sectorLong = convertActualDimensiontoCanvasDimension(
      templateSector.long?.unit,
      templateSector.long?.value,
      warehouseRaio,
    )
    const ghostImage = e.target.cloneNode(true)
    ghostImage.style.backgroundColor = '#cfcfcf'
    ghostImage.style.borderRadius = '6px'
    ghostImage.style.height = `${sectorLong}px`
    ghostImage.style.width = `${sectorWidth}px`
    ghostImage.style.position = 'absolute'
    ghostImage.style.top = `0`
    ghostImage.style.left = `0`
    ghostImage.style.zIndex = '-1'
    document.getElementById(`${templateSector.id}`).appendChild(ghostImage)
    e.dataTransfer.setDragImage(ghostImage, 0, 0)
    e.dataTransfer.setData(
      'templateSector',
      JSON.stringify({
        ...templateSector,
      }),
    )
    e.dataTransfer.setData('type', DRAG_TYPE.SECTOR)
    setTimeout(() => {
      ghostImage.parentNode.removeChild(ghostImage)
    }, 100)
  }

  const handleDragDoor = (e) => {
    const doorImage = new Image(66, 66)
    doorImage.src = door
    doorImage.style.position = 'absolute'
    doorImage.style.top = `0`
    doorImage.style.left = `0`
    doorImage.style.zIndex = '-1'
    document.getElementById('door').appendChild(doorImage)
    e.dataTransfer.setDragImage(doorImage, 0, 0)
    e.dataTransfer.setData('type', DRAG_TYPE.DOOR)
    setTimeout(() => {
      doorImage.parentNode.removeChild(doorImage)
    }, 100)
  }

  const onChangeSearch = (e) => {
    setSearchStr(e.target.value)
  }

  const updateTreeData = (list, key, children) => {
    const treeData = list.map((node) => {
      if (node.key === key) {
        return { ...node, children }
      }
      if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, key, children),
        }
      }

      return node
    })
    return treeData
  }
  const onLoadData = (key, children) => {
    return new Promise(async (resolve) => {
      if (!children) {
        await getDetail(key)
      }
      resolve()
    })
  }
  const getDetail = async (nodeKey) => {
    const [type, id, parentKey] = nodeKey.split('-')
    if (type === 'sector') {
      await temPlateSectorActions.getTemplateSectorDetailById(id, (data) => {
        const listShelfInSector = data?.templateShelfs?.map((item) => ({
          name: `[${t('warehouseDesign.shelf')}] ${item.name}`,
          key: `shelf-${item.id}-${item.templateSectorTemplateShelfId}`,
          id: item.templateSectorTemplateShelfId,
        }))
        setTreeData(updateTreeData(treeData, nodeKey, listShelfInSector))
      })
    }
    if (type === 'shelf') {
      await temPlateShelfActions.getTemplateShelfDetailById(id, (data) => {
        const listShelfFloorInShelf = data?.templateShelfFloors?.map(
          (item) => ({
            name: `[${t('warehouseDesign.shelfFloor')}] ${item.name}`,
            key: `shelfFloor-${item.id}-${parentKey}-${item.templateShelfTemplateShelfFloorId}`,
            id: item.templateShelfTemplateShelfFloorId,
            isLeaf: true,
          }),
        )
        setTreeData(updateTreeData(treeData, nodeKey, listShelfFloorInShelf))
      })
    }
  }
  const treeDataDisplay = searchStr
    ? treeData.filter((data) =>
        data.name.toLowerCase().includes(searchStr.toLowerCase()),
      )
    : treeData

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  const handleChangeShelf = (panel) => (event, isExpanded) => {
    setExpandedShelf(isExpanded ? panel : false)
  }
  return (
    <div className="list-template">
      <div id="door" className="door" draggable onDragStart={handleDragDoor}>
        {t('warehouseDesign.door')}
      </div>
      <TextField
        className="search-input"
        placeholder={t('warehouseDesign.searchSector')}
        onChange={onChangeSearch}
      />
      {treeDataDisplay?.map((item) => (
        <Accordion
          expanded={expanded === item?.id}
          onChange={handleChange(item?.id)}
          onClick={() => onLoadData(item?.key, item?.children)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              sx={{ width: 'auto', flexShrink: 0 }}
              id={item?.id}
              draggable
              onDragStart={(e) => hanldeDragSector(e, item?.items)}
            >
              {`[${t('warehouseDesign.sector')}] ${item?.name}`}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {item?.children?.map((chil) => (
              <Accordion
                expandedShelf={expandedShelf === chil?.id}
                onChange={handleChangeShelf(chil?.id)}
                onClick={() => onLoadData(chil?.key, chil?.children)}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    sx={{ width: 'auto', flexShrink: 0 }}
                    id={chil?.id}
                  >
                    {chil?.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {chil?.children?.map((d) => (
                    <Accordion>
                      <AccordionSummary>
                        <Typography>{d?.name}</Typography>
                      </AccordionSummary>
                    </Accordion>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}

export default ListTemplate
