// Month Year Picker Component

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MONTH_OPTIONS, YEAR_OPTIONS } from "@/constants/profile-constants";

interface MonthYearPickerProps {
  month: number;
  year: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  disabled?: boolean;
}

export function MonthYearPicker({
  month,
  year,
  onMonthChange,
  onYearChange,
  disabled = false,
}: MonthYearPickerProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Select
        value={month.toString()}
        onValueChange={(value) => onMonthChange(parseInt(value))}
        disabled={disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          {MONTH_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value.toString()}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select
        value={year.toString()}
        onValueChange={(value) => onYearChange(parseInt(value))}
        disabled={disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          {YEAR_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value.toString()}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
