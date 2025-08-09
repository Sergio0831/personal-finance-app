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

type SelectWithLabelProps<T> = {
  label: string;
  nameInSchema: Path<T>;
  error: FieldError | undefined;
  options: string[];
  placeholder: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

const SelectWithLabel = <T,>({
  label,
  nameInSchema,
  options,
  placeholder = 'Select option',
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
              <SelectTrigger className="w-full" id={field.name} size="lg">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="max-h-75">
              {options.map((option) => {
                return (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage id={field.name} />
        </FormItem>
      )}
    />
  );
};

export default SelectWithLabel;
