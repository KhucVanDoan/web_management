import FormikAutocomplete from './Autocomplete'
import FormikCheckbox from './Checkbox'
import FormikDatePicker from './DatePicker'
import FormikDateRangePicker from './DateRangePicker'
import FastFieldWrapper from './FastField'
import FieldWrapper from './Field'
import FormikRadioGroup from './RadioGroup'
import FormikSwitch from './Switch'
import FormikTextField from './TextField'

export const Field = {
  TextField: FieldWrapper(FormikTextField),
  Checkbox: FieldWrapper(FormikCheckbox),
  DatePicker: FieldWrapper(FormikDatePicker),
  DateRangePicker: FieldWrapper(FormikDateRangePicker),
  Autocomplete: FieldWrapper(FormikAutocomplete),
  RadioGroup: FieldWrapper(FormikRadioGroup),
  Switch: FieldWrapper(FormikSwitch),
}

export const FastField = {
  TextField: FastFieldWrapper(FormikTextField),
  Checkbox: FastFieldWrapper(FormikCheckbox),
  DatePicker: FastFieldWrapper(FormikDatePicker),
  DateRangePicker: FastFieldWrapper(FormikDateRangePicker),
  Autocomplete: FastFieldWrapper(FormikAutocomplete),
  RadioGroup: FastFieldWrapper(FormikRadioGroup),
  Switch: FastFieldWrapper(FormikSwitch),
}
