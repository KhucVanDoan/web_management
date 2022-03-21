const style = (theme) => ({
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
