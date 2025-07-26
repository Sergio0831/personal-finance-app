import type { SelectHTMLAttributes } from 'react';
import { type FieldError, type Path, useFormContext } from 'react-hook-form';
import { cn } from '@/lib/clsx';
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

type ThemeSelectWithLabelProps<T> = {
  label: string;
  nameInSchema: Path<T>;
  error: FieldError | undefined;
  options: Option[];
  placeholder: string;
  usedThemeValues: string[];
} & SelectHTMLAttributes<HTMLSelectElement>;

const ThemeSelectWithLabel = <T,>({
  label,
  nameInSchema,
  disabled,
  options,
  placeholder = 'Select option',
  usedThemeValues = [],
}: ThemeSelectWithLabelProps<T>) => {
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
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="max-h-75">
              {options.map((option) => {
                const isUsed = usedThemeValues.includes(option.value);

                return (
                  <SelectItem
                    disabled={isUsed}
                    key={option.value}
                    value={option.value}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-3">
                        <div
                          className={cn(
                            'size-4 rounded-full',
                            isUsed && 'opacity-20'
                          )}
                          style={{ backgroundColor: `${option.value}` }}
                        />
                        {option.label}
                      </div>
                      {isUsed && <span className="text-xs">Already used</span>}
                    </div>
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

export default ThemeSelectWithLabel;
