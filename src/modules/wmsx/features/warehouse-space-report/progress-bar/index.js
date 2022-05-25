import { useTheme } from '@mui/material/styles'

const ProgressBar = (props) => {
  const theme = useTheme()
  const { bgcolor, completed, name } = props

  const positionStyles = {
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 8px 8px rgba(102, 102, 102, 0.05)',
    margin: '5px 0px 5px 5px',
    width: 54,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '3px',
    borderTop: `1px solid ${theme.palette.secondary.a4}`,
    borderLeft: `1px solid ${theme.palette.secondary.a4}`,
    borderBottom: `1px solid ${theme.palette.secondary.a4}`,
    height: '38px',
  }
  const positionText = {
    color: '#222222',
  }
  const progressBar = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }

  const containerStyles = {
    height: 40,
    minWidth: 154,
    backgroundColor: `1px solid ${theme.palette.secondary.a4}`,
    margin: '5px 5px 5px 0px',
    borderRadius: '3px',
    display: 'flex',
    alignItems: 'center',
    border: `1px solid ${theme.palette.grayF5.main}`,
  }

  const fillerStyles = {
    height: '36px',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    display: 'flex',
    alignItems: 'center',
  }

  const labelStyles = {
    color: '#FFFFFF',
    marginLeft: '12px',
  }

  const labelStyle2 = {
    color: theme.palette.text.main,
    marginLeft: '12px',
  }
  return (
    <div style={progressBar}>
      <div style={positionStyles}>
        <span style={positionText}>{`${name}`}</span>
      </div>
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span
            style={+completed === 0 ? labelStyle2 : labelStyles}
          >{`${completed}%`}</span>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
