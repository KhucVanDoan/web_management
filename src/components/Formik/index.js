import FormikAutocomplete from './Autocomplete'
import FormikCheckbox from './Checkbox'
import FormikDatePicker from './DatePicker'
import FormikDateRangePicker from './DateRangePicker'
import FieldWrapper from './Field'
import FormikTextField from './TextField'

export const Field = {
  TextField: FieldWrapper(FormikTextField),
  Checkbox: FieldWrapper(FormikCheckbox),
  DatePicker: FieldWrapper(FormikDatePicker),
  DateRangePicker: FieldWrapper(FormikDateRangePicker),
  Autocomplete: FieldWrapper(FormikAutocomplete),
}
