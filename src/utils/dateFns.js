import AdapterDateFns from '@mui/lab/AdapterDateFns'

export class DateFns extends AdapterDateFns {
  getWeekdays = () =>
    ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day) => ({
      charAt: () => day,
    }))
}
