const style = (theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
  },
  stage: {
    maxHeight: 230,
    overflowY: 'auto',
    '.stage-header': {
      marginTop: 24,
      height: 40,
      width: '100%',
      background: 'rgba(7, 97, 173, 0.3)',
      borderRadius: '0px 0px 3px 3px',
      display: 'flex',
      justifyItems: 'center',
      '& .text': {
        color: '#222222',
        fontWeight: 600,
        fontSize: 14,
        lineHeight: 22,
        padding: '9px 16px',
      },
    },
  },
  devicePanel: {
    height: 40,
    width: '50%',
    marginTop: 10,
    background: '#f4f5f5',
    border: '1px solid #f4f5f5',
    boxSizing: 'border-box',
    borderRadius: 3,
    padding: 2,
    display: 'flex',
    '.title': {
      justifyContent: 'center',
      alignItems: 'center',
      background: '#ffffff',
      boxShadow: '0px 8px 8px rgba(102, 102, 102, 0.05)',
      borderRadius: 3,
      width: '50%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '.data': {
      borderRadius: 3,
      width: '50%',
      color: '#fff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    '.stop': {
      background: '#ff9054',
    },
    '.activation': {
      background: '#0fa44a',
    },
    '.error': {
      background: '#ff0909',
    },
    '.off-maintain': {
      border: '1px solid #0761ad',
      color: '#222222 !important',
    },
    '.off-shutdown': {
      background: '#666666',
    },
    '.using': {
      background: '#0761ad',
    },
  },
  boxContainer: {
    marginBottom: 12,
    '.overall-background': {
      height: 113,
      background:
        'linear-gradient(0deg,rgba(15, 164, 74, 0.1),rgba(15, 164, 74, 0.1))',
      borderRadius: '3px 3px 0px 0px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    '.overall-text': {
      display: 'grid',
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 700,
    },
    '.device-text': {
      color: '#222222',
    },
    '.oee-text': {
      color: '#0fa44a',
    },
    '.stt-box': {
      height: 40,
      width: 42,
      borderRadius: 3,
      fontWeight: 600,
      fontSize: 14,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#ffffff',
    },
    '.item': {
      display: 'flex',
      alignItems: 'center',
    },
    '.status-text': {
      paddingLeft: 10,
      color: '#222222',
      fontSize: 14,
    },
    '.stop': {
      background: '#ff9054',
    },
    '.activation': {
      background: '#0fa44a',
    },
    '.error': {
      background: '#ff0909',
    },
    '.off-maintain': {
      border: '1px solid #0761ad',
      color: '#222222 !important',
    },
    '.off-shutdown': {
      background: '#666666',
    },
    '.using': {
      background: '#0761ad',
    },
  },
})

export default style
