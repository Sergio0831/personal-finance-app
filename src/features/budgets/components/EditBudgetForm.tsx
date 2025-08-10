'use client';

import { ApolloError } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  AmountInputWithLabel,
  SelectWithLabel,
  ThemeSelectWithLabel,
} from '@/components/custom';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { themeOptions } from '@/constants/theme';
import { Category, useUpdateBudgetMutation } from '@/graphql/generated/output';
import { useUsedBudgetThemes } from '../hooks/useUsedBudgetThemes';
import { UpdateBudgetSchema, type UpdateBudgetSchemaType } from '../schemas';

const EditBudgetForm = ({
  setIsOpen,
  id,
  category,
  maximum,
  theme,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
  category: string;
  maximum: number;
  theme: string;
}) => {
  const [updateBudgetMutation, { loading }] = useUpdateBudgetMutation();

  const usedTheme = useUsedBudgetThemes().filter((t) => t !== theme);

  const categories: Category[] = Object.values(Category);

  const form = useForm<UpdateBudgetSchemaType>({
    resolver: zodResolver(UpdateBudgetSchema),
    defaultValues: {
      id,
      input: {
        category: category as Category,
        maximum,
        theme,
      },
    },
  });

  const onSubmit = async (formValues: UpdateBudgetSchemaType) => {
    try {
      await updateBudgetMutation({
        variables: {
          id,
          input: {
            ...formValues.input,
            category: formValues.input.category as Category,
          },
        },
        onCompleted: () => {
          setIsOpen(false);
          toast.success(
            `Budget '${formValues.input.category}' updated successfully!`
          );
        },
        refetchQueries: ['GetAllBudgets'],
      });
    } catch (error) {
      const errorMessage =
        error instanceof ApolloError
          ? error.message
          : 'An unexpected error occurred';
      toast.error(`Error updating pot: ${errorMessage}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SelectWithLabel<UpdateBudgetSchemaType>
          error={form.formState.errors.input?.category}
          label="Category"
          nameInSchema="input.category"
          options={categories}
          placeholder="Budget Category"
        />
        <AmountInputWithLabel<UpdateBudgetSchemaType>
          disabled={loading}
          error={form.formState.errors.input?.maximum}
          label="Target"
          nameInSchema="input.maximum"
          placeholder="e.g. 2000"
          type="text"
        />
        <ThemeSelectWithLabel<UpdateBudgetSchemaType>
          className="mb-5"
          disabled={loading}
          error={form.formState.errors.input?.theme}
          label="Theme"
          nameInSchema="input.theme"
          options={themeOptions}
          placeholder="Select theme"
          usedThemeValues={usedTheme}
        />
        <Button className="w-full" disabled={loading} type="submit">
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Save Changes'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EditBudgetForm;
