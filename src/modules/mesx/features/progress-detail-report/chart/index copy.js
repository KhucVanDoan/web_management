// import { Typography } from '@mui/material'
// import { Box } from '@mui/system'
// import clsx from 'clsx'

// import { sortBy } from 'lodash'
// import { useTranslation } from 'react-i18next'

// import useProgressDetailReport from '~/modules/mesx/redux/hooks/useProgressDetailReport'
// import { useClasses } from '~/themes'
// import { convertUtcDateToLocalTz } from '~/utils'

// import style from './style'
// function ProgressDetailReportChart() {
//   const classes = useClasses(style)
//   const {
//     data: { progressDetailReports },
//   } = useProgressDetailReport()
//   const { t } = useTranslation(['mesx'])

//   return (
//     <>
//       <Box className={classes.root}>
//         <Box className={classes.header}>
//           <Box className={classes.name}>
//             {t('defineMasterPlan.autoModeration.saleOrder')}
//           </Box>
//           {sortBy(progressDetailReports?.[0]?.calendar, 'executionDate')?.map(
//             (day) => (
//               <Box className={classes.day}>
//                 {convertUtcDateToLocalTz(day?.executionDate)}
//               </Box>
//             ),
//           )}
//         </Box>
//         {progressDetailReports?.map((item) => (
//           <Box className={classes.row}>
//             <Box className={classes.name}>{item?.item?.name}</Box>
//             {sortBy(item?.calendar, 'executionDate')?.map((day) => (
//               <Box className={classes.day}>
//                 <Box
//                   className={clsx(classes.progress, {
//                     [classes.onSchedule]:
//                       day?.actualQuantity / day?.planQuantity >= 0.5,
//                   })}
//                 >
//                   <Typography variant="body2">
//                     {` Tien do ${day?.actualQuantity}/${day?.planQuantity}(${(
//                       (day?.actualQuantity * 100) /
//                       day?.planQuantity
//                     ).toFixed(2)}%)`}
//                   </Typography>
//                 </Box>
//               </Box>
//             ))}
//           </Box>
//         ))}
//       </Box>

//       {/* {tasks?.length > 0 && (
//         <GanttChart
//           config={{
//             columns: [
//               {
//                 name: 'text',
//                 label: t('defineMasterPlan.autoModeration.saleOrder'),
//                 tree: true,
//                 width: '*',
//                 min_width: 200,
//               },
//             ],
//             grid_resize: true,
//             drag_progress: false,
//             readonly: true,
//           }}
//           tasks={{
//             data: tasks,
//           }}
//         />
//       )} */}
//     </>
//   )
// }

// export default ProgressDetailReportChart
