import type { SelectHTMLAttributes } from 'react';
import { type FieldError, type Path, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type Option = {
  value: string;
  label: string;
};

type SelectWithLabelProps<T> = {
  label: string;
  nameInSchema: Path<T>;
  error: FieldError | undefined;
  options: Option[];
  isThemeSelect?: boolean;
} & SelectHTMLAttributes<HTMLSelectElement>;

const SelectWithLabel = <T,>({
  label,
  nameInSchema,
  disabled,
  options,
  isThemeSelect,
}: SelectWithLabelProps<T>) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className="mb-5">
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <Select defaultValue={field.value} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger
                className="w-full"
                disabled={disabled}
                id={field.name}
                size="lg"
              >
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="max-h-75">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-x-3">
                    {isThemeSelect && (
                      <div
                        className="size-4 rounded-full"
                        style={{ backgroundColor: `${option.value}` }}
                      />
                    )}
                    {option.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage id={field.name} />
        </FormItem>
      )}
    />
  );
};

export default SelectWithLabel;
