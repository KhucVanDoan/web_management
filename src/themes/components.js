const components = {
  MuiButton: {
    defaultProps: {
      variant: 'contained',
    },
    styleOverrides: {
      root: {
        boxShadow: 'none',
        fontSize: 14,
        lineHeight: 22 / 14,
        padding: '9px 24px',
        borderRadius: '3px',
        textTransform: 'none',
      },
      outlined: {
        padding: '8px 23px',
      },
      sizeSmall: {
        padding: '6px 12px',
      },
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: {
        color: '#D9D9D9',
        '.MuiSvgIcon-root': {
          width: 22,
          height: 22,
        },
      },
    },
  },
  MuiRadio: {
    styleOverrides: {
      root: {
        color: '#D9D9D9',
        '.MuiSvgIcon-root': {
          width: 22,
          height: 22,
        },
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paperWidthSm: {
        maxWidth: 700,
      },
      paperWidthMd: {
        maxWidth: 1000,
      },
      paperWidthLg: {
        maxWidth: 1300,
      },
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        m: 0,
        padding: '24px 48px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontWeight: 'bold',
        fontSize: 18,
      },
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        padding: '24px 48px',
      },
    },
  },
  MuiDialogActions: {
    styleOverrides: {
      root: {
        padding: '24px 48px',
      },
      spacing: {
        '& >:not(:first-of-type)': {
          marginLeft: 16,
        },
      },
    },
  },
  MuiFormControlLabel: {
    styleOverrides: {
      root: {
        marginRight: 0,
      },
    },
  },
  MuiSwitch: {
    styleOverrides: {
      root: {
        width: 44,
        height: 22,
        padding: 0,
        '& .MuiSwitch-switchBase': {
          padding: 0,
          margin: 2,
          transitionDuration: '300ms',
          '&.Mui-checked': {
            color: '#FFF',
            '& + .MuiSwitch-track': {
              opacity: 1,
              border: 0,
            },
          },
        },
        '& .MuiSwitch-thumb': {
          boxSizing: 'border-box',
          width: 18,
          height: 18,
        },
        '& .MuiSwitch-track': {
          borderRadius: 16,
          opacity: 1,
          backgroundColor: '#D9D9D9',
        },
        '.MuiFormControlLabel-root & ': {
          marginRight: 9,
        },
      },
    },
  },
  MuiPaper: {
    variants: [
      {
        props: { variant: 'caret' },
        style: {
          position: 'relative',
          marginTop: 12,
          overflow: 'visible !important',
          boxShadow:
            '0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 3px 6px -4px rgba(0, 0, 0, 0.12)',

          '&:before': {
            content: '""',
            width: 0,
            height: 0,
            borderBottom: '8px solid #fff',
            borderLeft: '8px solid transparent',
            position: 'absolute',
            top: -4,
            right: 16,
            transform: 'rotate(-135deg)',
          },
        },
      },
      {
        props: { variant: 'caret-left' },
        style: {
          position: 'relative',
          marginTop: 12,
          overflow: 'visible !important',
          boxShadow:
            '0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 3px 6px -4px rgba(0, 0, 0, 0.12)',

          '&:before': {
            content: '""',
            width: 0,
            height: 0,
            borderBottom: '8px solid #fff',
            borderLeft: '8px solid transparent',
            position: 'absolute',
            top: -4,
            left: 16,
            transform: 'rotate(-135deg)',
          },
        },
      },
      {
        props: { variant: 'outline-caret' },
        style: {
          position: 'relative',
          marginTop: 12,
          overflow: 'visible !important',

          '&:before': {
            content: '""',
            width: 0,
            height: 0,
            borderBottom: '8px solid #fff',
            borderLeft: '8px solid transparent',
            position: 'absolute',
            top: -4,
            right: 16,
            transform: 'rotate(-135deg)',
          },
        },
      },
      {
        props: { variant: 'outline-caret-left' },
        style: {
          position: 'relative',
          marginTop: 12,
          overflow: 'visible !important',

          '&:before': {
            content: '""',
            width: 0,
            height: 0,
            borderBottom: '8px solid #fff',
            borderLeft: '8px solid transparent',
            position: 'absolute',
            top: -4,
            left: 16,
            transform: 'rotate(-135deg)',
          },
        },
      },
    ],
  },
}

export default components
