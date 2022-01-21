import makeStyles from '@mui/styles/makeStyles';
const useStyles = makeStyles((theme) => ({
  modal: {
    minWidth: 400,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    // marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    // marginTop: theme.spacing(1),
  },
  closeBox: {
    float: 'right',
    cursor: 'pointer',
    '&:hover': {
      color: '#e0e0e0',
    },
  },
  titleBox: {
    background: '#115285',
    color: '#ffffff',
    padding: '10px 20px',
    textAlign: 'center',
  },
  contentBox: {
    padding: '20px 24px',
    minHeight: 100,
  },
  smallModal: { maxWidth: '250px' },
  middleModal: { maxWidth: '500px' },
  largeModal: {
    maxWidth: '1000px',
  },
  centerSpace: {
    flex: '1 0 0',
  },
}));

export default useStyles;
