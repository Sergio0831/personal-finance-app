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
import { Category, useCreateBudgetMutation } from '@/graphql/generated/output';
import { useUsedBudgetThemes } from '../hooks/useUsedBudgetThemes';
import { CreateBudgetSchema, type CreateBudgetSchemaType } from '../schemas';

const AddNewBudgetForm = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [createBudgetMutation, { loading }] = useCreateBudgetMutation();

  const categories: Category[] = Object.values(Category);

  const usedTheme = useUsedBudgetThemes();

  const form = useForm<CreateBudgetSchemaType>({
    resolver: zodResolver(CreateBudgetSchema),
    defaultValues: {
      input: {
        category: Category.Entertainment,
        maximum: '' as unknown as number,
        theme: '',
      },
    },
  });

  const onSubmit = async (formValues: CreateBudgetSchemaType) => {
    try {
      await createBudgetMutation({
        variables: {
          input: {
            ...formValues.input,
            category: formValues.input.category as Category,
          },
        },
        onCompleted: () => {
          form.reset();
          setIsOpen(false);
          toast.success(
            `Budget '${formValues.input.category}' created successfully!`
          );
        },
        refetchQueries: ['GetAllBudgets'],
      });
    } catch (error) {
      const errorMessage =
        error instanceof ApolloError
          ? error.message
          : 'An unexpected error occurred';
      toast.error(`Error creating budget: ${errorMessage}`);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SelectWithLabel<CreateBudgetSchemaType>
          error={form.formState.errors.input?.category}
          label="Category"
          nameInSchema="input.category"
          options={categories}
          placeholder="Budget Category"
        />
        <AmountInputWithLabel<CreateBudgetSchemaType>
          disabled={loading}
          error={form.formState.errors.input?.maximum}
          label="Maximum Spend"
          nameInSchema="input.maximum"
          placeholder="e.g. 2000"
          type="text"
        />
        <ThemeSelectWithLabel<CreateBudgetSchemaType>
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
          {loading ? <Loader2 className="size-4 animate-spin" /> : 'Add Pot'}
        </Button>
      </form>
    </Form>
  );
};

export default AddNewBudgetForm;
