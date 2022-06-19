import React from 'react'

import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import SvgIcon from '@mui/material/SvgIcon'
import { styled } from '@mui/material/styles'

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  )
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  )
}

export const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  wordBreak: 'break-word',

  '&:before': {
    display: 'none',
  },
}))

export const AccordionSummary = styled(({ expanded, ...props }) => (
  <MuiAccordionSummary
    expandIcon={expanded ? <MinusSquare /> : <PlusSquare />}
    {...props}
  />
))(({ theme }) => ({
  padding: '4px 0',
  minHeight: theme.spacing(2),
  flexDirection: 'row-reverse',
  alignItems: 'flex-start',

  '& .MuiAccordionSummary-content': {
    margin: 0,

    '& .MuiTypography-root': {
      maxWidth: '100%',
    },

    '& .MuiTypography-root[draggable="true"]': {
      cursor: 'grab',

      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
  },

  '& .MuiAccordionSummary-expandIconWrapper': {
    transform: 'none !important',
    marginRight: 4,
    position: 'relative',
    top: 4,
  },
}))

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  marginLeft: 7,
  padding: '0 0 0 13px',
  borderLeft: `1px solid ${theme.palette.grayF4.main}`,
}))
