const palette = {
  primary: {
    main: '#0761AD',
    a1: 'rgba(7, 97, 173, 0.1)',
    a2: 'rgba(7, 97, 173, 0.2)',
    a3: 'rgba(7, 97, 173, 0.3)',
    a4: 'rgba(7, 97, 173, 0.4)',
    a5: 'rgba(7, 97, 173, 0.5)',
    a6: 'rgba(7, 97, 173, 0.6)',
    a7: 'rgba(7, 97, 173, 0.7)',
    a8: 'rgba(7, 97, 173, 0.8)',
    a9: 'rgba(7, 97, 173, 0.9)',
    contrastText: '#FFF',
  },
  secondary: {
    main: '#FF9054',
    a1: 'rgba(255, 144, 84, 0.1)',
    a2: 'rgba(255, 144, 84, 0.2)',
    a3: 'rgba(255, 144, 84, 0.3)',
    a4: 'rgba(255, 144, 84, 0.4)',
    a5: 'rgba(255, 144, 84, 0.5)',
    a6: 'rgba(255, 144, 84, 0.6)',
    a7: 'rgba(255, 144, 84, 0.7)',
    a8: 'rgba(255, 144, 84, 0.8)',
    a9: 'rgba(255, 144, 84, 0.9)',
    contrastText: '#FFF',
  },
  error: {
    main: '#FF0909',
    a1: 'rgba(255, 9, 9, 0.1)',
    a2: 'rgba(255, 9, 9, 0.2)',
    a3: 'rgba(255, 9, 9, 0.3)',
    a4: 'rgba(255, 9, 9, 0.4)',
    a5: 'rgba(255, 9, 9, 0.5)',
    a6: 'rgba(255, 9, 9, 0.6)',
    a7: 'rgba(255, 9, 9, 0.7)',
    a8: 'rgba(255, 9, 9, 0.8)',
    a9: 'rgba(255, 9, 9, 0.9)',
    contrastText: '#FFF',
  },
  success: {
    main: '#0FA44A',
    contrastText: '#FFF',
  },
  text: {
    main: '#222',
    primary: '#222',
    a1: 'rgba(34, 34, 34, 0.1)',
    a2: 'rgba(34, 34, 34, 0.2)',
    a3: 'rgba(34, 34, 34, 0.3)',
    a4: 'rgba(34, 34, 34, 0.4)',
    a5: 'rgba(34, 34, 34, 0.5)',
    a6: 'rgba(34, 34, 34, 0.6)',
    a7: 'rgba(34, 34, 34, 0.7)',
    a8: 'rgba(34, 34, 34, 0.8)',
    a9: 'rgba(34, 34, 34, 0.9)',
  },
  subText: {
    main: '#666',
    a1: 'rgba(102, 102, 102, 0.1)',
    a2: 'rgba(102, 102, 102, 0.2)',
    a3: 'rgba(102, 102, 102, 0.3)',
    a4: 'rgba(102, 102, 102, 0.4)',
    a5: 'rgba(102, 102, 102, 0.5)',
    a6: 'rgba(102, 102, 102, 0.6)',
    a7: 'rgba(102, 102, 102, 0.7)',
    a8: 'rgba(102, 102, 102, 0.8)',
    a9: 'rgba(102, 102, 102, 0.9)',
  },
  grayF4: {
    main: '#EDF0F4',
    a1: 'rgba(237, 240, 244, 0.1)',
    a2: 'rgba(237, 240, 244, 0.2)',
    a3: 'rgba(237, 240, 244, 0.3)',
    a4: 'rgba(237, 240, 244, 0.4)',
    a5: 'rgba(237, 240, 244, 0.5)',
    a6: 'rgba(237, 240, 244, 0.6)',
    a7: 'rgba(237, 240, 244, 0.7)',
    a8: 'rgba(237, 240, 244, 0.8)',
    a9: 'rgba(237, 240, 244, 0.9)',
    contrastText: '#666',
  },
  grayF5: {
    main: '#F4F5F5',
    a1: 'rgba(244, 245, 245, 0.1)',
    a2: 'rgba(244, 245, 245, 0.2)',
    a3: 'rgba(244, 245, 245, 0.3)',
    a4: 'rgba(244, 245, 245, 0.4)',
    a5: 'rgba(244, 245, 245, 0.5)',
    a6: 'rgba(244, 245, 245, 0.6)',
    a7: 'rgba(244, 245, 245, 0.7)',
    a8: 'rgba(244, 245, 245, 0.8)',
    a9: 'rgba(244, 245, 245, 0.9)',
    contrastText: '#666',
  },
  grayEE: {
    main: '#E7EAEE',
    a1: 'rgba(231, 234, 238, 0.1)',
    a2: 'rgba(231, 234, 238, 0.2)',
    a3: 'rgba(231, 234, 238, 0.3)',
    a4: 'rgba(231, 234, 238, 0.4)',
    a5: 'rgba(231, 234, 238, 0.5)',
    a6: 'rgba(231, 234, 238, 0.6)',
    a7: 'rgba(231, 234, 238, 0.7)',
    a8: 'rgba(231, 234, 238, 0.8)',
    a9: 'rgba(231, 234, 238, 0.9)',
    contrastText: '#666',
  },
  divider: '#EDF0F4',
  background: {
    main: '#F4F5F5',
  },
  status: {
    created: {
      text: '#555',
      background: '#999',
      contrastText: '#FFF',
    },
    pending: {
      text: '#222',
      background: '#666',
      contrastText: '#FFF',
    },
    inProgress: {
      text: '#FF9054',
      background: '#FF9054',
      contrastText: '#FFF',
    },
    confirmed: {
      text: '#0FA44A',
      background: '#0FA44A',
      contrastText: '#FFF',
    },
    approved: {
      text: '#0761AD',
      background: '#0761AD',
      contrastText: '#FFF',
    },
    completed: {
      text: '#0B4D8A',
      background: '#0B4D8A',
      contrastText: '#FFF',
    },
    rejected: {
      text: '#FF0909',
      background: '#FF0909',
      contrastText: '#FFF',
    },
  },
  borderField: '#0761AD',
  bgPrimaryOpacity: '#DAE7F3',
  bgSecondaryOpacity: '#F7D7C5',
}

export default palette
