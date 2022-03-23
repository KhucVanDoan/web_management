import React, { useEffect, useCallback, useRef } from 'react'

import PropTypes from 'prop-types'
import { VariableSizeList as List } from 'react-window'

const PADDING_TOP = 8
const ITEM_HEIGHT = 34
const VISIBLE_COUNT = 8

const Row = ({ data, index, setSize }) => {
  const rowRef = useRef()

  useEffect(() => {
    setSize(index, rowRef.current.getBoundingClientRect().height)
  }, [setSize, index])

  return <div ref={rowRef}>{data[index]}</div>
}

const OuterElementContext = React.createContext({})

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext)
  return <div ref={ref} {...props} {...outerProps} />
})

const VirtualList = React.forwardRef(({ children, ...other }, ref) => {
  const itemData = React.Children.toArray(children)
  const itemCount = itemData.length
  const listRef = useRef()
  const sizeMap = useRef({})
  const setSize = useCallback((index, size) => {
    sizeMap.current = { ...sizeMap.current, [index]: size }
    listRef.current.resetAfterIndex(index)
  }, [])

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <List
          ref={listRef}
          itemData={itemData}
          itemCount={itemCount}
          height={
            (itemCount > VISIBLE_COUNT ? VISIBLE_COUNT : itemCount) *
              ITEM_HEIGHT +
            PADDING_TOP
          }
          width="auto"
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(i) => {
            return sizeMap.current[i] || ITEM_HEIGHT
          }}
          overscanCount={5}
        >
          {({ data, index, style }) => (
            <div
              style={{
                ...style,
                top: style.top + PADDING_TOP,
              }}
            >
              <Row data={data} index={index} setSize={setSize} />
            </div>
          )}
        </List>
      </OuterElementContext.Provider>
    </div>
  )
})

VirtualList.defaultProps = {
  children: null,
}

VirtualList.propTypes = {
  children: PropTypes.node,
}

export default VirtualList
