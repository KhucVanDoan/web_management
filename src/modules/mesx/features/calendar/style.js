const style = (theme) => ({
  fullCalendar: {
    '.fc-toolbar-title': {
      fontSize: '18px',
      '::first-letter': {
        textTransform: 'capitalize',
      },
    },
    '.fc-button-group': {
      button: {
        display: 'inline-flex',
        border: `1px solid ${theme.palette.primary.a5}`,
        color: theme.palette.primary.main,
        backgroundColor: '#fff',
        transition: 'all .3s ease',
        ':hover, :active': {
          backgroundColor: `${theme.palette.primary.main} !important`,
        },
        ':focus': {
          boxShadow: 'none !important',
        },
      },
    },
    'button.fc-today-button': {
      backgroundColor: '#fff',
      padding: '9px 24px',
      border: `1px solid ${theme.palette.primary.a5}`,
      color: theme.palette.primary.main,
      fontWeight: 600,
      transition: 'all .3s ease',

      ':hover:not(:disabled)': {
        backgroundColor: `${theme.palette.primary.main} !important`,
        color: '#fff !important',
      },
      ':focus': {
        boxShadow: 'none !important',
      },
      ':disabled': {
        opacity: 0.3,
      },
    },
    '.fc-today-button:hover, .fc-today-button:disabled, .fc-today-button:active':
      {
        backgroundColor: '#fff !important',
        color: `${theme.palette.primary.main} !important`,
        border: `1px solid ${theme.palette.primary.a5} !important`,
      },

    '.fc-day-sun': {
      backgroundColor: theme.palette.grayF4.main,
    },

    '.fc-col-header-cell': {
      backgroundColor: theme.palette.bgPrimaryOpacity,
      padding: 8,
    },
  },
  eventHoliday: {
    background: theme.palette.error.a5,
    border: 'none',
    fontSize: '1rem',
    paddingLeft: '5px',
  },
  eventWorkingDay: {
    background: theme.palette.primary.a5,
    border: 'none',
    fontSize: '1rem',
    paddingLeft: '5px',
  },
  holiday: {
    background: `${theme.palette.grayF4.main} !important`,
  },
})
export default style
