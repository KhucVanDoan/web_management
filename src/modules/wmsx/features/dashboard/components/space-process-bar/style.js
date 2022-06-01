const style = () => ({
  spaceProcessBar: {
    height: 40,
    background: '#f4f5f5',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #f4f5f5',
    boxSizing: 'border-box',
    borderRadius: 3,
  },
  spaceProcessBarName: {
    height: 36,
    width: '35%',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 36,
    backgroundColor: '#fff',
    boxShadow: '0px 8px 8px rgba(102, 102, 102, 0.05)',
    borderRadius: 3,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    paddingLeft: 8,
  },
  spaceProcessBarPersen: {
    height: 36,
    width: '65%',
    position: 'relative',
  },
  spaceProcessBarPersenPrev: {
    position: 'absolute',
    left: 0,
    height: '100%',
    backgroundColor: '#0761ad',
    width: '35%',
    borderRadius: 3,
    fontSize: 14,
    span: {
      marginLeft: 5,
      lineHeight: 36,
    },
  },
})

export default style
