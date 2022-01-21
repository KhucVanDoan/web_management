import FieldWrapper from './Field'
import FormikTextField from './TextField'
import FormikCheckbox from './Checkbox'
import FormikDatePicker from './DatePicker'
import FormikDateRangePicker from './DateRangePicker'
import FormikAutocomplete from './Autocomplete'

export const Field = {
  TextField: FieldWrapper(FormikTextField),
  Checkbox: FieldWrapper(FormikCheckbox),
  DatePicker: FieldWrapper(FormikDatePicker),
  DateRangePicker: FieldWrapper(FormikDateRangePicker),
  Autocomplete: FieldWrapper(FormikAutocomplete),
}
